import { WebSocket, RawData } from 'ws';
import * as hcaptcha from "hcaptcha";
import * as crypto from "crypto";
import { faucetConfig } from '../common/FaucetConfig';
import { PoWSession, PoWSessionStatus } from './PoWSession';
import { AddressMark, FaucetStore, SessionMark } from '../services/FaucetStore';
import { renderTimespan } from '../utils/DateUtils';
import { isValidGuid } from '../utils/GuidUtils';
import { EthWeb3Manager } from '../services/EthWeb3Manager';
import { ServiceManager } from '../common/ServiceManager';
import { PoWShareVerification } from './PoWShareVerification';
import { PoWStatusLog, PoWStatusLogLevel } from '../common/PoWStatusLog';
import { weiToEth } from '../utils/ConvertHelpers';
import { FaucetStatus, IFaucetStatus } from '../services/FaucetStatus';
import { EnsWeb3Manager } from '../services/EnsWeb3Manager';
import { FaucetStatsLog } from '../services/FaucetStatsLog';
import { PoWRewardLimiter } from '../services/PoWRewardLimiter';

export class PoWClient {
  private static activeClients: PoWClient[] = [];

  public static sendToAll(action: string, data?: any) {
    this.activeClients.forEach((client) => {
      try {
        client.sendMessage(action, data);
      } catch(ex) {}
    });
  }

  public static getAllClients(): PoWClient[] {
    return this.activeClients;
  }

  public static getClientCount(): number {
    return this.activeClients.length;
  }

  private socket: WebSocket;
  private remoteIp: string;
  private session: PoWSession = null;
  private pingTimer: NodeJS.Timer = null;
  private lastPingPong: Date;
  private statusHash: string;
  private clientVersion: string;

  public constructor(socket: WebSocket, remoteIp: string) {
    this.socket = socket;
    this.remoteIp = remoteIp;
    this.lastPingPong = new Date();

    PoWClient.activeClients.push(this);

    this.socket.on("message", (data, isBinary) => this.onClientMessage(data, isBinary));
    this.socket.on("ping", (data) => {
      this.lastPingPong = new Date();
      if(this.socket)
        this.socket.pong(data)
    });
    this.socket.on("pong", (data) => {
      this.lastPingPong = new Date();
    });
    this.socket.on("error", (err) => {
      ServiceManager.GetService(PoWStatusLog).emitLog(PoWStatusLogLevel.WARNING, "WebSocket error: " + err.toString());
      try {
        if(this.socket)
          this.socket.close();
      } catch(ex) {}
      this.dispose();
    });
    this.socket.on("close", () => {
      this.dispose();
    });
    this.pingClientLoop();
  }

  public getSession(): PoWSession {
    return this.session;
  }

  public setSession(session: PoWSession) {
    this.session = session;
    this.refreshFaucetStatus();
  }

  public getRemoteIP(): string {
    return this.remoteIp;
  }

  private dispose() {
    this.socket = null;

    let clientIdx = PoWClient.activeClients.indexOf(this);
    if(clientIdx !== -1)
      PoWClient.activeClients.splice(clientIdx, 1);

    if(this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
    
    if(this.session)
      this.session.setActiveClient(null);
  }

  private killClient(reason?: string) {
    if(!this.socket)
      return;
    try {
      this.sendErrorResponse("CLIENT_KILLED", "Client killed: " + (reason || ""), null, PoWStatusLogLevel.HIDDEN);
      this.socket.close();
    } catch(ex) {}
    this.socket = null;
  }

  private pingClientLoop() {
    this.pingTimer = setInterval(() => {
      if(!this.socket)
        return;
      
      let pingpongTime = Math.floor(((new Date()).getTime() - this.lastPingPong.getTime()) / 1000);
      if(pingpongTime > faucetConfig.powPingTimeout) {
        this.killClient("ping timeout");
        return;
      }
      
      this.socket.ping();
    }, faucetConfig.powPingInterval * 1000);
  }

  public sendMessage(action: string, data?: any, rsp?: any) {
    if(!this.socket)
      return;
    
    let message: any = {
      action: action
    };
    if(data !== undefined)
      message.data = data;
    if(rsp !== undefined)
      message.rsp = rsp;
    
    this.socket.send(JSON.stringify(message));
  }

  private sendErrorResponse(errCode: string, errMessage: string, reqMsg?: any, logLevel?: PoWStatusLogLevel, data?: any) {
    if(!logLevel)
      logLevel = PoWStatusLogLevel.WARNING;
    let logReqMsg = reqMsg && logLevel !== PoWStatusLogLevel.INFO;
    ServiceManager.GetService(PoWStatusLog).emitLog(logLevel, "Returned error to client: [" + errCode + "] " + errMessage + (logReqMsg ? "\n    Message: " + JSON.stringify(reqMsg) : ""));
    
    let resObj: any = {
      code: errCode,
      message: errMessage
    };
    if(data)
      resObj.data = data;
    this.sendMessage("error", resObj, reqMsg ? reqMsg.id : undefined);
  }

  public sendFaucetStatus(status: IFaucetStatus[], hash: string) {
    if(this.statusHash === hash)
      return;
    this.statusHash = hash;
    this.sendMessage("faucetStatus", status);
  }

  public refreshFaucetStatus() {
    let status = ServiceManager.GetService(FaucetStatus).getFaucetStatus(this.session);
    this.sendFaucetStatus(status.status, status.hash);
  }

  private onClientMessage(data: RawData, isBinary: boolean) {
    let message;
    try {
      message = JSON.parse(data.toString());
    } catch(ex) {
      this.killClient("invalid message: " + ex.toString());
      return;
    }
    if(!message || typeof message !== "object")
      return;

    switch(message.action) {
      case "getConfig":
        this.onCliGetConfig(message);
        break;
      case "startSession":
        this.onCliStartSession(message);
        break;
      case "resumeSession":
        this.onCliResumeSession(message);
        break;
      case "recoverSession":
        this.onCliRecoverSession(message);
        break;
      case "foundShare":
        this.onCliFoundShare(message);
        break;
      case "verifyResult":
        this.onCliVerifyResult(message);
        break;
      case "closeSession":
        this.onCliCloseSession(message);
        break;
      case "claimRewards":
        this.onCliClaimRewards(message);
        break;
      case "getFaucetStatus":
        this.onCliGetFaucetStatus(message);
        break;
      default:
        this.sendMessage("error", {
          code: "INVALID_ACTION",
          message: "Unknown action"
        }, message.id);
        break;
    }
  }

  private onCliGetConfig(message: any) {
    let reqId = message.id || undefined;
    if(message.data && message.data.version)
      this.clientVersion = message.data.version;

    let faucetStatus = ServiceManager.GetService(FaucetStatus).getFaucetStatus(this.session);
    this.statusHash = faucetStatus.hash;
    this.sendMessage("config", {
      faucetTitle: faucetConfig.faucetTitle,
      faucetStatus: faucetStatus.status,
      faucetImage: faucetConfig.faucetImage,
      faucetHtml: faucetConfig.faucetHomeHtml,
      faucetCoinSymbol: faucetConfig.faucetCoinSymbol,
      hcapSiteKey: faucetConfig.hcaptcha ? faucetConfig.hcaptcha.siteKey : null,
      hcapSession: faucetConfig.hcaptcha && faucetConfig.hcaptcha.checkSessionStart,
      hcapClaim: faucetConfig.hcaptcha && faucetConfig.hcaptcha.checkBalanceClaim,
      shareReward: faucetConfig.powShareReward,
      minClaim: faucetConfig.claimMinAmount,
      maxClaim: faucetConfig.claimMaxAmount,
      powTimeout: faucetConfig.powSessionTimeout,
      claimTimeout: faucetConfig.claimSessionTimeout,
      powParams: {
        n: faucetConfig.powScryptParams.cpuAndMemory,
        r: faucetConfig.powScryptParams.blockSize,
        p: faucetConfig.powScryptParams.paralellization,
        l: faucetConfig.powScryptParams.keyLength,
        d: faucetConfig.powScryptParams.difficulty,
      },
      powNonceCount: faucetConfig.powNonceCount,
      resolveEnsNames: !!faucetConfig.ensResolver,
      ethTxExplorerLink: faucetConfig.ethTxExplorerLink,
    }, reqId);
  }

  private async onCliStartSession(message: any) {
    let reqId = message.id || undefined;

    if(this.session)
      return this.sendErrorResponse("INVALID_REQUEST", "Duplicate Session", message);
    if(typeof message.data !== "object" || !message.data)
      return this.sendErrorResponse("INVALID_REQUEST", "Invalid request", message);

    if(faucetConfig.hcaptcha && faucetConfig.hcaptcha.checkSessionStart) {
      if(!message.data.token)
        return this.sendErrorResponse("INVALID_HCAPTCHA", "HCaptcha token required to start new session", message, PoWStatusLogLevel.INFO);
      let hcaptchaResponse = await hcaptcha.verify(faucetConfig.hcaptcha.secret, message.data.token, this.remoteIp, faucetConfig.hcaptcha.siteKey);
      if(!hcaptchaResponse.success)
        return this.sendErrorResponse("INVALID_HCAPTCHA", "HCaptcha verification failed", message, PoWStatusLogLevel.INFO);
    }

    if(faucetConfig.concurrentSessions > 0 && PoWSession.getConcurrentSessionCount(this.remoteIp) >= faucetConfig.concurrentSessions)
      return this.sendErrorResponse("CONCURRENCY_LIMIT", "Concurrent session limit reached", message, PoWStatusLogLevel.INFO);

    let targetAddr: string = message.data.addr;
    if(typeof targetAddr === "string" && targetAddr.match(/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.eth$/) && faucetConfig.ensResolver) {
      try {
        targetAddr = await ServiceManager.GetService(EnsWeb3Manager).resolveEnsName(targetAddr);
      } catch(ex) {
        return this.sendErrorResponse("INVALID_ENSNAME", "Could not resolve ENS Name '" + targetAddr + "': " + ex.toString(), message, PoWStatusLogLevel.INFO);
      }
    }

    if(typeof targetAddr !== "string" || !targetAddr.match(/^0x[0-9a-f]{40}$/i) || targetAddr.match(/^0x0{40}$/i))
      return this.sendErrorResponse("INVALID_ADDR", "Invalid target address: " + targetAddr, message, PoWStatusLogLevel.INFO);

    let addressMarks = ServiceManager.GetService(FaucetStore).getAddressMarks(targetAddr);
    if(addressMarks.indexOf(AddressMark.USED) !== -1)
      return this.sendErrorResponse("INVALID_ADDR", "Cannot start session for " + targetAddr + " (please wait " + renderTimespan(faucetConfig.claimAddrCooldown) + " between requests)", message, PoWStatusLogLevel.INFO);
    else if(addressMarks.length > 0)
      return this.sendErrorResponse("INVALID_ADDR", "Cannot start session for " + targetAddr + " (" + addressMarks.join(",") + ")", message, PoWStatusLogLevel.INFO);
    
    if(typeof faucetConfig.claimAddrMaxBalance === "number") {
      let walletBalance: number;
      try {
        walletBalance = await ServiceManager.GetService(EthWeb3Manager).getWalletBalance(targetAddr);
      } catch(ex) {
        return this.sendErrorResponse("BALANCE_ERROR", "Could not get balance of Wallet " + targetAddr + ": " + ex.toString(), message);
      }
      if(walletBalance > faucetConfig.claimAddrMaxBalance)
        return this.sendErrorResponse("BALANCE_LIMIT", "You're already holding " + (Math.round(weiToEth(walletBalance)*1000)/1000) + " " + faucetConfig.faucetCoinSymbol + " in your wallet. Please give others a chance to get some funds too.", message, PoWStatusLogLevel.INFO);
    }

    if(faucetConfig.claimAddrDenyContract) {
      try {
        if(await ServiceManager.GetService(EthWeb3Manager).checkIsContract(targetAddr)) {
          return this.sendErrorResponse("INVALID_ADDR", "Cannot start session for " + targetAddr + " (address is a contract)", message, PoWStatusLogLevel.INFO);
        }
      } catch(ex) {
        return this.sendErrorResponse("BALANCE_ERROR", "Could not check contract status of wallet " + targetAddr + ": " + ex.toString(), message);
      }
    }
    
    ServiceManager.GetService(FaucetStore).setAddressMark(targetAddr, AddressMark.USED);

    // create new session
    let session = new PoWSession(this, targetAddr);

    this.sendMessage("ok", {
      sessionId: session.getSessionId(),
      startTime: Math.floor(session.getStartTime().getTime() / 1000),
      preimage: session.getPreImage(),
      targetAddr: targetAddr,
      recovery: session.getSignedSession(),
    }, reqId);
  }

  private onCliResumeSession(message: any) {
    let reqId = message.id || undefined;

    if(this.session)
      return this.sendErrorResponse("INVALID_REQUEST", "Duplicate Session", message);
    if(typeof message.data !== "object" || !message.data) 
      return this.sendErrorResponse("INVALID_REQUEST", "Invalid request", message);

    let sessionId: string = message.data.sessionId;
    let session: PoWSession;
    if(!isValidGuid(sessionId))
      return this.sendErrorResponse("INVALID_SESSIONID", "Invalid session id: " + sessionId, message);

    if(!(session = PoWSession.getSession(sessionId))) {
      if((session = PoWSession.getClosedSession(sessionId))) {
        let sessClaim: any = null;
        // check if closed session is claimable and return claim token if so
        if(session.isClaimable() && ServiceManager.GetService(FaucetStore).getSessionMarks(session.getSessionId(), []).indexOf(SessionMark.CLAIMED) === -1) {
          sessClaim = {
            balance: session.getBalance(),
            token: session.getSignedSession(),
          };
        }
        return this.sendErrorResponse("SESSION_CLOSED", "Session has been closed.", message, PoWStatusLogLevel.INFO, sessClaim);
      }
      else
        return this.sendErrorResponse("INVALID_SESSIONID", "Unknown session id: " + sessionId, message, PoWStatusLogLevel.INFO);
    }
    

    if(faucetConfig.concurrentSessions > 0 && PoWSession.getConcurrentSessionCount(this.remoteIp, session) >= faucetConfig.concurrentSessions)
      return this.sendErrorResponse("CONCURRENCY_LIMIT", "Concurrent session limit reached", message, PoWStatusLogLevel.INFO);

    let client: PoWClient;
    if((client = session.getActiveClient())) {
      client.setSession(null);
      client.sendMessage("sessionKill", {
        level: "client",
        message: "session resumed from another client",
        token: null
      });
    }

    session.setActiveClient(this);
    this.session = session;
    this.sendMessage("ok", {
      lastNonce: session.getLastNonce(),
    }, reqId);
  }

  private onCliRecoverSession(message: any) {
    let reqId = message.id || undefined;

    if(this.session)
      return this.sendErrorResponse("INVALID_REQUEST", "Duplicate Session", message);
    if(typeof message.data !== "string" || !message.data)
      return this.sendErrorResponse("INVALID_REQUEST", "Invalid request", message);

    let sessionSplit = message.data.split("|", 2);
    let sessionStr = sessionSplit[0];

    let sessionHash = crypto.createHash("sha256");
    sessionHash.update(faucetConfig.faucetSecret + "\r\n");
    sessionHash.update(sessionStr);

    if(!sessionStr || sessionSplit[1] !== sessionHash.digest('base64'))
      return this.sendErrorResponse("INVALID_DATA", "Invalid recovery data", message);

    let sessionInfo = JSON.parse(Buffer.from(sessionStr, 'base64').toString("utf8"));
    if(PoWSession.getSession(sessionInfo.id))
      return this.sendErrorResponse("DUPLICATE_SESSION", "Session does already exist and cannot be recovered", message);

    if(faucetConfig.concurrentSessions > 0 && PoWSession.getConcurrentSessionCount(this.remoteIp) >= faucetConfig.concurrentSessions)
      return this.sendErrorResponse("CONCURRENCY_LIMIT", "Concurrent session limit reached", message, PoWStatusLogLevel.INFO);

    let startTime = new Date(sessionInfo.startTime * 1000);
    if(faucetConfig.powSessionTimeout && ((new Date()).getTime() - startTime.getTime()) / 1000 > faucetConfig.powSessionTimeout)
      return this.sendErrorResponse("SESSION_TIMEOUT", "Session is too old to recover (timeout)", message);
    let sessionMarks = ServiceManager.GetService(FaucetStore).getSessionMarks(sessionInfo.id, []);
    if(sessionMarks.length > 0)
      return this.sendErrorResponse("INVALID_SESSION", "Session cannot be recovered (" + sessionMarks.join(",") + ")", message);

    let session = new PoWSession(this, sessionInfo.targetAddr, {
      id: sessionInfo.id,
      startTime: startTime,
      preimage: sessionInfo.preimage,
      balance: sessionInfo.balance,
      nonce: sessionInfo.nonce,
    });
    this.sendMessage("ok", null, reqId);
  }

  private onCliFoundShare(message: any) {
    let reqId = message.id || undefined;

    if(!this.session)
      return this.sendErrorResponse("SESSION_NOT_FOUND", "No active session found", message);
    if(typeof message.data !== "object" || !message.data)
      return this.sendErrorResponse("INVALID_SHARE", "Invalid share data", message);
    
    let shareData: {
      nonces: number[];
      params: string;
      hashrate: number;
    } = message.data;

    let powParamsStr = faucetConfig.powScryptParams.cpuAndMemory +
      "|" + faucetConfig.powScryptParams.blockSize +
      "|" + faucetConfig.powScryptParams.paralellization +
      "|" + faucetConfig.powScryptParams.keyLength +
      "|" + faucetConfig.powScryptParams.difficulty;

    if(shareData.params !== powParamsStr) 
      return this.sendErrorResponse("INVALID_SHARE", "Invalid share params", message);
    if(shareData.nonces.length !== faucetConfig.powNonceCount)
      return this.sendErrorResponse("INVALID_SHARE", "Invalid nonce count", message);
    
    let lastNonce = this.session.getLastNonce();
    for(let i = 0; i < shareData.nonces.length; i++) {
      if(shareData.nonces[i] <= lastNonce)
        return this.sendErrorResponse("INVALID_SHARE", "Nonce too low", message);
      lastNonce = shareData.nonces[i];
    }
    this.session.setLastNonce(lastNonce);
    if(shareData.hashrate)
      this.session.reportHashRate(shareData.hashrate);
    this.session.resetMissedVerifications();
    
    let shareVerification = new PoWShareVerification(this.session, shareData.nonces);
    let sessionId = this.session.getSessionId();
    shareVerification.startVerification().then((result) => {
      if(!result.isValid)
        this.sendErrorResponse("WRONG_SHARE", "Share verification failed", message);
      else {
        if(reqId)
          this.sendMessage("ok", null, reqId);
        
        let faucetStats = ServiceManager.GetService(FaucetStatsLog);
        faucetStats.statShareCount++;
        faucetStats.statShareRewards += result.reward;
        faucetStats.statVerifyCount += shareVerification.getMinerVerifyCount();
        faucetStats.statVerifyMisses += shareVerification.getMinerVerifyMisses();
      }
    }, () => {
      this.sendErrorResponse("VERIFY_FAILED", "Share verification error", message);
    });
  }
  

  private onCliVerifyResult(message: any) {
    if(!this.session)
      return this.sendErrorResponse("SESSION_NOT_FOUND", "No active session found");
    if(typeof message.data !== "object" || !message.data)
      return this.sendErrorResponse("INVALID_VERIFYRESULT", "Invalid verification result data");

    let verifyRes: {
      shareId: string;
      isValid: boolean;
    } = message.data;

    let verifyValid = PoWShareVerification.processVerificationResult(verifyRes.shareId, this.session.getSessionId(), verifyRes.isValid);
    let verifyReward: number;
    if(verifyValid && this.session && (verifyReward = ServiceManager.GetService(PoWRewardLimiter).getVerificationReward(this.session)) > 0) {
      this.session.addBalance(verifyReward);

      let faucetStats = ServiceManager.GetService(FaucetStatsLog);
      faucetStats.statVerifyReward += verifyReward;

      this.sendMessage("updateBalance", {
        balance: this.session.getBalance(),
        recovery: this.session.getSignedSession(),
        reason: "valid verification"
      });
    }
  }

  private onCliCloseSession(message: any) {
    let reqId = message.id || undefined;

    if(!this.session) 
      return this.sendErrorResponse("SESSION_NOT_FOUND", "No active session found", message);

    let session = this.session;
    this.session.closeSession(true, true);

    let claimToken = session.isClaimable() ? session.getSignedSession() : null;
    this.sendMessage("ok", {
      claimable: session.isClaimable(),
      token: claimToken
    }, reqId);
  }

  private async onCliClaimRewards(message: any) {
    let reqId = message.id || undefined;

    if(typeof message.data !== "object" || !message.data || !message.data.token)
      return this.sendErrorResponse("INVALID_CLAIM", "Invalid claim token (missing)", message);

    if(faucetConfig.hcaptcha && faucetConfig.hcaptcha.checkBalanceClaim) {
      if(!message.data.captcha) 
        return this.sendErrorResponse("INVALID_CAPTCHA", "HCaptcha token required to claim rewards", message, PoWStatusLogLevel.INFO);
      let hcaptchaResponse = await hcaptcha.verify(faucetConfig.hcaptcha.secret, message.data.captcha, this.remoteIp, faucetConfig.hcaptcha.siteKey);
      if(!hcaptchaResponse.success) 
        return this.sendErrorResponse("INVALID_HCAPTCHA", "HCaptcha verification failed", message, PoWStatusLogLevel.INFO);
    }

    let sessionSplit = message.data.token.split("|", 2);
    let sessionStr = sessionSplit[0];

    let sessionHash = crypto.createHash("sha256");
    sessionHash.update(faucetConfig.faucetSecret + "\r\n");
    sessionHash.update(sessionStr);

    if(!sessionStr || sessionSplit[1] !== sessionHash.digest('base64')) 
      return this.sendErrorResponse("INVALID_CLAIM", "Invalid claim token (verification failed)", message);

    let sessionInfo = JSON.parse(Buffer.from(sessionStr, 'base64').toString("utf8"));
    if(!sessionInfo.claimable)
      return this.sendErrorResponse("INVALID_CLAIM", "Invalid claim token (not claimable)", message);

    var startTime = new Date(sessionInfo.startTime * 1000);
    if(faucetConfig.claimSessionTimeout && ((new Date()).getTime() - startTime.getTime()) / 1000 > faucetConfig.claimSessionTimeout)
      return this.sendErrorResponse("INVALID_CLAIM", "Invalid claim token (expired)", message);

    let sessionMarks = ServiceManager.GetService(FaucetStore).getSessionMarks(sessionInfo.id, [SessionMark.CLOSED]);
    if(sessionMarks.length > 0) 
      return this.sendErrorResponse("INVALID_CLAIM", "Session is not allowed to claim (" + sessionMarks.join(",") + ")", message);

    ServiceManager.GetService(FaucetStore).setSessionMark(sessionInfo.id, SessionMark.CLAIMED);

    let closedSession = PoWSession.getClosedSession(sessionInfo.id);
    if(closedSession)
      closedSession.setSessionStatus(PoWSessionStatus.CLAIMED);

    let claimTx = ServiceManager.GetService(EthWeb3Manager).addClaimTransaction(sessionInfo.targetAddr, sessionInfo.balance, sessionInfo.id);
    this.sendMessage("ok", null, reqId);
    ServiceManager.GetService(PoWStatusLog).emitLog(PoWStatusLogLevel.INFO, "Claimed reward for session " + sessionInfo.id + " to " + sessionInfo.targetAddr + " (" + (Math.round(weiToEth(sessionInfo.balance)*1000)/1000) + " ETH)");

    claimTx.once("confirmed", () => {
      let faucetStats = ServiceManager.GetService(FaucetStatsLog);
      faucetStats.statClaimCount++;
      faucetStats.statClaimRewards += sessionInfo.balance;

      this.sendMessage("claimTx", {
        session: sessionInfo.id,
        txHash: claimTx.txhash,
        txBlock: claimTx.txblock
      });
    });
    claimTx.once("failed", () => {
      this.sendMessage("claimTx", {
        session: sessionInfo.id,
        error: claimTx.failReason
      });
    });
  }

  private getHashedIp(remoteAddr: string) {
    let ipMatch: RegExpExecArray;
    let hashParts: string[] = [];
    let hashGlue: string;
    let getHash = (input: string, len?: number) => {
      let hash = crypto.createHash("sha256");
      hash.update(faucetConfig.faucetSecret + "\r\n");
      hash.update("iphash\r\n");
      hash.update(input);
      let hashStr = hash.digest("hex");
      if(len)
        hashStr = hashStr.substring(0, len);
      return hashStr;
    };

    let hashBase = "";
    if((ipMatch = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.exec(remoteAddr))) {
      // IPv4
      hashGlue = ".";

      for(let i = 0; i < 4; i++) {
        hashParts.push(getHash(hashBase + ipMatch[i+1], 3));
        hashBase += (hashBase ? "." : "") + ipMatch[i+1];
      }
    }
    else {
      // IPv6
      hashGlue = ":";

      let ipSplit = remoteAddr.split(":");
      let ipParts: string[] = [];
      for(let i = 0; i < ipSplit.length; i++) {
        if(ipSplit[i] === "") {
          let skipLen = 8 - ipSplit.length + 1;
          for(let j = 0; j < skipLen; j++)
            ipParts.push("0");
          break;
        }
        ipParts.push(ipSplit[i]);
      }
      for(let i = 0; i < 8; i++) {
        hashParts.push(ipParts[i] === "0" ? "0" : getHash(hashBase + ipParts[i], 3));
        hashBase += (hashBase ? "." : "") + ipParts[i];
      }
    }

    return hashParts.join(hashGlue);
  }

  private async onCliGetFaucetStatus(message: any) {
    let reqId = message.id || undefined;
    let statusRsp: any = {};

    ServiceManager.GetService(PoWStatusLog).emitLog(PoWStatusLogLevel.INFO, "Client requested faucet status (IP: " + this.remoteIp + ")");

    let sessions = PoWSession.getAllSessions();
    let rewardLimiter = ServiceManager.GetService(PoWRewardLimiter);
    statusRsp.sessions = sessions.map((session) => {
      let sessionIdHash = crypto.createHash("sha256");
      sessionIdHash.update(faucetConfig.faucetSecret + "\r\n");
      sessionIdHash.update(session.getSessionId());

      let activeClient = session.getActiveClient();
      let clientVersion = null;
      if(activeClient) {
        clientVersion = activeClient.clientVersion;
      }

      return {
        id: sessionIdHash.digest("hex").substring(0, 20),
        start: Math.floor(session.getStartTime().getTime() / 1000),
        idle: session.getIdleTime() ? Math.floor(session.getIdleTime().getTime() / 1000) : null,
        target: session.getTargetAddr(),
        ip: this.getHashedIp(session.getLastRemoteIp()),
        ipInfo: session.getLastIpInfo(),
        balance: session.getBalance(),
        nonce: session.getLastNonce(),
        hashrate: session.getReportedHashRate(),
        status: session.getSessionStatus(),
        claimable: session.isClaimable(),
        limit: rewardLimiter.getSessionRestriction(session),
        cliver: clientVersion,
      }
    });

    let claims = ServiceManager.GetService(EthWeb3Manager).getTransactionQueue();
    statusRsp.claims = claims.map((claimTx) => {
      let sessionIdHash = crypto.createHash("sha256");
      sessionIdHash.update(faucetConfig.faucetSecret + "\r\n");
      sessionIdHash.update(claimTx.session);

      return {
        time: Math.floor(claimTx.time.getTime() / 1000),
        session: sessionIdHash.digest("hex").substring(0, 20),
        target: claimTx.target,
        amount: claimTx.amount,
        status: claimTx.status,
        error: claimTx.failReason,
        nonce: claimTx.nonce || null,
      }
    });

    this.sendMessage("ok", statusRsp, reqId);
  }

}
