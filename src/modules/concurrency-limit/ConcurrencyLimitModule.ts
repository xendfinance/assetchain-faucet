import { ServiceManager } from "../../common/ServiceManager.js";
import { FaucetSession } from "../../session/FaucetSession.js";
import { BaseModule } from "../BaseModule.js";
import { ModuleHookAction } from "../ModuleManager.js";
import { defaultConfig, IConcurrencyLimitConfig } from './ConcurrencyLimitConfig.js';
import { FaucetError } from '../../common/FaucetError.js';
import { SessionManager } from "../../session/SessionManager.js";
import { FaucetDatabase } from "../../db/FaucetDatabase.js";
import { resolveRelativePath } from "../../config/FaucetConfig.js";
import fs from 'fs/promises';

export class ConcurrencyLimitModule extends BaseModule<IConcurrencyLimitConfig> {
  protected readonly moduleDefaultConfig = defaultConfig;

  protected override startModule(): Promise<void> {
    this.moduleManager.addActionHook(
      this, ModuleHookAction.SessionStart, 6, "Recurring limits check",
      (session: FaucetSession) => this.processSessionStart(session)
    );
    this.moduleManager.addActionHook(
      this, ModuleHookAction.SessionIpChange, 6, "Recurring limits check",
      (session: FaucetSession) => this.processSessionStart(session)
    );
    return Promise.resolve();
  }

  protected override stopModule(): Promise<void> {
    return Promise.resolve();
  }

  private async processSessionStart(session: FaucetSession): Promise<void> {
    if (session.getSessionData<Array<string>>("skip.modules", []).indexOf(this.moduleName) !== -1)
      return;
    this.checkLimit(session);
  }

  private checkLimit(session: FaucetSession): void {
    if (this.moduleConfig.concurrencyLimit === 0)
      return;

    let activeSessions = ServiceManager.GetService(SessionManager).getActiveSessions();
    let concurrentSessionCount = 0;
    let concurrentLimitMessage: string = null;

    if (!this.moduleConfig.byAddrOnly) {
      let sessCount = activeSessions.filter((sess) => sess !== session && sess.getRemoteIP() === session.getRemoteIP()).length;
      if (sessCount > concurrentSessionCount) {
        concurrentSessionCount = sessCount;
        concurrentLimitMessage = this.moduleConfig.messageByIP || ("Only " + this.moduleConfig.concurrencyLimit + " concurrent sessions allowed per IP");
      }
    }
    if (!this.moduleConfig.byIPOnly) {
      let sessCount = activeSessions.filter((sess) => sess !== session && sess.getTargetAddr() === session.getTargetAddr()).length;
      if (sessCount > concurrentSessionCount) {
        concurrentSessionCount = sessCount;
        concurrentLimitMessage = this.moduleConfig.messageByAddr || ("Only " + this.moduleConfig.concurrencyLimit + " concurrent sessions allowed per wallet address");
      }
    }

    if (concurrentSessionCount >= this.moduleConfig.concurrencyLimit) {
      let excessSessions = activeSessions.filter((sess) =>
        (sess.getRemoteIP() === session.getRemoteIP() && this.moduleConfig.byAddrOnly) ||
        (sess.getTargetAddr() === session.getTargetAddr() && this.moduleConfig.byIPOnly)
      );
      const dbPath = resolveRelativePath("new-faucet-store.db");
        //  fs.unlink(dbPath).then(() => {
        //   ServiceManager.GetService(FaucetDatabase).initialize();
        //  });
         


      // Optional: Sort excessSessions if needed to prioritize which sessions to terminate
      console.log(JSON.stringify(excessSessions))
      excessSessions.forEach((sess) => {
        if (sess !== session) {
          // Terminate or remove excess session
          // Example: sess.terminate(); // or any method to handle the session
          // Or use ServiceManager to handle session termination
          ServiceManager.GetService(SessionManager).failSession(sess, concurrentLimitMessage);
        }
      });

      // throw new FaucetError(
      //   "CONCURRENCY_LIMIT",
      //   concurrentLimitMessage,
      // );
    }
  }

}
