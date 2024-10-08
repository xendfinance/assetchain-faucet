import { IFaucetDialogProps } from "../components/shared/FaucetDialog";
import { FaucetApi } from "./FaucetApi";
import { IFaucetConfig } from "./FaucetConfig";
import { FaucetSession } from "./FaucetSession";

export interface IFaucetContext {
  faucetApi: FaucetApi;
  activeSession?: FaucetSession;
  

  showStatusAlert(
    level: string,
    prio: number,
    body: React.ReactElement,
  ): number;
  hideStatusAlert(alertId: number): void;

  showNotification(
    type: string,
    message: string,
    time?: number | boolean,
    timeout?: number,
  ): number;
  hideNotification(notificationId: number): void;

  showDialog(dialogProps: IFaucetDialogProps): number;
  hideDialog(dialogId: number): void;
  updateFaucetConfig(newConfig: Partial<IFaucetConfig>): void 
}
