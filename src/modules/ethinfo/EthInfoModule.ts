import { ServiceManager } from "../../common/ServiceManager";
import { EthWalletManager } from "../../eth/EthWalletManager";
import { FaucetSession } from "../../session/FaucetSession";
import { BaseModule } from "../BaseModule";
import { ModuleHookAction } from "../ModuleManager";
import { IEthInfoConfig } from './EthInfoConfig';
import { FaucetError } from '../../common/FaucetError';

export class EthInfoModule extends BaseModule<IEthInfoConfig> {

  protected override startModule(): void {
    this.moduleManager.addActionHook(this, ModuleHookAction.SessionStart, 6, "ETH Info check", (session: FaucetSession, userInput: any) => this.processSessionStart(session, userInput));
  }

  protected override stopModule(): void {
    // nothing to do
  }

  private async processSessionStart(session: FaucetSession, userInput: any): Promise<void> {
    let targetAddr = session.getTargetAddr();
    let ethWalletManager = ServiceManager.GetService(EthWalletManager);

    if(this.moduleConfig.maxBalance && this.moduleConfig.maxBalance > 0) {
      let walletBalance: bigint;
      try {
        walletBalance = await ServiceManager.GetService(EthWalletManager).getWalletBalance(targetAddr);
      } catch(ex) {
        throw new FaucetError("BALANCE_ERROR", "Could not get balance of Wallet " + targetAddr + ": " + ex.toString());
      }
      if(walletBalance > this.moduleConfig.maxBalance)
        throw new FaucetError("BALANCE_LIMIT", "You're already holding " + ServiceManager.GetService(EthWalletManager).readableAmount(walletBalance) + " in your wallet. Please give others a chance to get some funds too.");
    }

    if(this.moduleConfig.denyContract) {
      try {
        if(await ethWalletManager.checkIsContract(targetAddr)) {
          throw new FaucetError("CONTRACT_ADDR", "Cannot start session for " + targetAddr + " (address is a contract)");
        }
      } catch(ex) {
        if(!(ex instanceof FaucetError))
          ex = new FaucetError("CONTRACT_LIMIT", "Could not check contract status of wallet " + targetAddr + ": " + ex.toString());
        throw ex;
      }
    }
  }

}
