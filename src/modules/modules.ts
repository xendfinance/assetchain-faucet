import { CaptchaModule } from "./captcha/CaptchaModule";
import { EnsNameModule } from "./ensname/EnsNameModule";
import { EthInfoModule } from "./ethinfo/EthInfoModule";
import { FaucetBalanceModule } from "./faucet-balance/FaucetBalanceModule";
import { FaucetOutflowModule } from "./faucet-outflow/FaucetOutflowModule";
import { IPInfoModule } from "./ipinfo/IPInfoModule";
import { MainnetWalletModule } from "./mainnet-wallet/MainnetWalletModule";
import { PassportModule } from "./passport/PassportModule";
import { PoWModule } from "./pow/PoWModule";
import { RecurringLimitsModule } from "./recurring-limits/RecurringLimitsModule";

export const MODULE_CLASSES = {
  "captcha": CaptchaModule,
  "ensname": EnsNameModule,
  "ethinfo": EthInfoModule,
  "faucet-balance": FaucetBalanceModule,
  "faucet-outflow": FaucetOutflowModule,
  "ipinfo": IPInfoModule,
  "mainnet-wallet": MainnetWalletModule,
  "passport": PassportModule,
  "pow": PoWModule,
  "recurring-limits": RecurringLimitsModule,
}
