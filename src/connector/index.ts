import { InjectedConnector } from "@web3-react/injected-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
    55, // MPANDO
    1001, // Baobab Test Network
    1337, // Localhost
    8217, // Cypress Main Network
  ]
})