import { InjectedConnector } from "@web3-react/injected-connector";
import { supportedChainIds } from "../constant"

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds,
});
