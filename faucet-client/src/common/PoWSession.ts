import { TypedEmitter } from 'tiny-typed-emitter';
import { PoWClient } from "./PoWClient";
import { IPoWMinerShare, IPoWMinerVerification, PoWMiner } from "./PoWMiner";

export interface IPoWSessionOptions {
  client: PoWClient;
  getInputs: () => object;
}

export interface IPoWSessionInfo {
  sessionId: string;
  targetAddr: string;
  startTime: number;
  preimage: string;
  balance: number;
  recovery: string;
  noncePos: number;
}

export interface IPoWSessionBalanceUpdate {
  balance: number;
  recovery: string;
  reason: string;
}

export interface IPoWClaimInfo {
  session: string;
  startTime: number;
  target: string;
  balance: number;
  token: string;
  claiming?: boolean;
  error?: string;
}

interface PoWSessionEvents {
  'update': () => void;
  'killed': (killInfo: any) => void;
  'error': (message: string) => void;
  'claimable': (claimInfo: IPoWClaimInfo) => void;
}

export class PoWSession extends TypedEmitter<PoWSessionEvents> {
  private options: IPoWSessionOptions;
  private sessionInfo: IPoWSessionInfo;
  private shareQueue: IPoWMinerShare[];
  private verifyResultQueue: any[];
  private miner: PoWMiner;

  public constructor(options: IPoWSessionOptions) {
    super();
    this.options = options;
    this.shareQueue = [];
    this.verifyResultQueue = [];
  }

  public getMiner(): PoWMiner {
    return this.miner;
  }

  public setMiner(miner: PoWMiner) {
    this.miner = miner;
  }

  public startSession() {
    let sessionInputs = this.options.getInputs();
    return this.options.client.sendRequest("startSession", sessionInputs).then((session) => {
      this.options.client.setCurrentSession(this);
      this.sessionInfo = Object.assign({
        balance: 0,
        noncePos: 1,
      }, session);
      this.shareQueue = [];
      this.verifyResultQueue = [];
      return session.sessionId;
    });
  }

  public resumeSession(sessionInfo?: IPoWSessionInfo): Promise<void> {
    if(!sessionInfo) {
      if(!this.sessionInfo)
        return Promise.resolve();
      sessionInfo = this.sessionInfo;
    }
    if(this.miner) {
      let faucetConfig = this.options.client.getFaucetConfig();
      this.miner.setPoWParams(faucetConfig.powParams, faucetConfig.powNonceCount);
    }
    this.options.client.setCurrentSession(this);
    return this.options.client.sendRequest("resumeSession", {
      sessionId: sessionInfo.sessionId
    }).then((res) => {
      if(res.lastNonce > sessionInfo.noncePos)
        sessionInfo.noncePos = res.lastNonce + 1;
    }, (err) => {
      if(err && err.code) {
        switch(err.code) {
          case "INVALID_SESSIONID":
            // server doesn't know about this session id anymore - try recover
            return this.options.client.sendRequest("recoverSession", sessionInfo.recovery);
          case "SESSION_CLOSED":
            if(!err.data || !err.data.token)
              break;
            // session was closed, but we've got a claim token
            let claimInfo = this.getClaimInfo(err.data.token, sessionInfo);
            this.storeClaimInfo(claimInfo);
            this.emit("claimable", claimInfo);
            this.closedSession();
            sessionInfo = null;
            return;
        }
      }
      throw err;
    }).then(() => {
      if(!sessionInfo)
        return;
      this.sessionInfo = sessionInfo;

      // resumed session
      if(this.shareQueue.length) {
        this.shareQueue.forEach((share) => {
          this.options.client.sendRequest("foundShare", share);
        });
        this.shareQueue = [];
      }
      if(this.verifyResultQueue.length) {
        this.verifyResultQueue.forEach((verifyResult) => {
          this.options.client.sendRequest("verifyResult", verifyResult);
        });
        this.verifyResultQueue = [];
      }
      this.emit("update");
    });
  }

  public getSessionInfo(): IPoWSessionInfo {
    return this.sessionInfo;
  }

  public submitShare(share: IPoWMinerShare) {
    if(this.options.client.isReady() && this.shareQueue.length === 0)
      this.options.client.sendRequest("foundShare", share);
    else
      this.shareQueue.push(share);
  }

  public processVerification(verification: IPoWMinerVerification) {
    if(!this.miner)
      return;
    this.miner.processVerification(verification);
  }

  public submitVerifyResult(result) {
    if(this.options.client.isReady() && this.verifyResultQueue.length === 0)
      this.options.client.sendRequest("verifyResult", result);
    else
      this.verifyResultQueue.push(result);
  }

  public updateBalance(balanceUpdate: IPoWSessionBalanceUpdate) {
    this.sessionInfo.balance = balanceUpdate.balance;
    this.sessionInfo.recovery = balanceUpdate.recovery;
    this.storeSessionStatus();
    this.emit("update");
  }

  public getNonceRange(count: number): number {
    if(!this.sessionInfo)
      return null;
    
    let noncePos = this.sessionInfo.noncePos;
    this.sessionInfo.noncePos += count;
    this.storeSessionStatus();

    return noncePos;
  }

  public closeSession(): Promise<void> {
    return this.options.client.sendRequest("closeSession").then((rsp) => {

      if(rsp.claimable) {
        let claimInfo = this.getClaimInfo(rsp.token);
        this.storeClaimInfo(claimInfo);
        this.emit("claimable", claimInfo);
      }

      this.closedSession();
    });
  }

  public closedSession(): void {
    this.sessionInfo = null;
    this.storeSessionStatus();
    this.emit("update");
  }

  public processSessionKill(killInfo: any) {
    this.sessionInfo = null;
    if(killInfo.level === "session")
      this.storeSessionStatus();
    this.emit("killed", killInfo);
    this.emit("update");
  }

  private storeSessionStatus() {
    let sessionStr: string = null;
    if(this.sessionInfo)
      sessionStr = JSON.stringify(this.sessionInfo);
    
    if(sessionStr)
      localStorage.setItem('powSessionStatus', sessionStr);
    else if(localStorage.getItem('powSessionStatus'))
      localStorage.removeItem('powSessionStatus');
  }

  public getStoredSessionInfo(): IPoWSessionInfo {
    let sessionStr = localStorage.getItem('powSessionStatus');
    let session: IPoWSessionInfo = null;
    if(sessionStr) {
      try {
        session = JSON.parse(sessionStr);
      } catch(ex) {}
    }
    if(!session)
      return null;

    let now = Math.floor((new Date()).getTime() / 1000);
    let sessionAge = now - session.startTime;
    let faucetConfig = this.options.client.getFaucetConfig();
    if(sessionAge >= faucetConfig.powTimeout)
      return null;
    
    return session;
  }

  public restoreStoredSession(): Promise<void> {
    if(this.sessionInfo)
      return Promise.resolve();
    
    let sessionInfo = this.getStoredSessionInfo();
    if(!sessionInfo)
      return Promise.reject("no session found that can be restored (did you restore it in another tab already?)");

    return this.resumeSession(sessionInfo);
  }

  public getClaimInfo(claimToken: string, sessionInfo?: IPoWSessionInfo): IPoWClaimInfo {
    if(!sessionInfo)
    sessionInfo = this.sessionInfo;
    return {
      session: sessionInfo.sessionId,
      startTime: sessionInfo.startTime,
      target: sessionInfo.targetAddr,
      balance: sessionInfo.balance,
      token: claimToken
    };
  }

  public getStoredClaimInfo(): IPoWClaimInfo {
    let claimStr = localStorage.getItem('powClaimStatus');
    let claimInfo: IPoWClaimInfo = null;
    if(claimStr) {
      try {
        claimInfo = JSON.parse(claimStr);
      } catch(ex) {}
    }
    if(!claimInfo)
      return null;

    let now = Math.floor((new Date()).getTime() / 1000);
    let claimAge = now - claimInfo.startTime;
    let faucetConfig = this.options.client.getFaucetConfig();
    if(claimAge >= faucetConfig.claimTimeout)
      return null;
    
    return claimInfo;
  }

  public storeClaimInfo(claimInfo: IPoWClaimInfo) {
    let claimStr = claimInfo ? JSON.stringify(claimInfo) : null;
    if(claimStr)
      localStorage.setItem('powClaimStatus', claimStr);
    else if(localStorage.getItem('powClaimStatus'))
      localStorage.removeItem('powClaimStatus');
  }

}
