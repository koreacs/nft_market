import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';

// Web 3 connection
let provider = new HDWalletProvider('개인키', `https://rinkeby.infura.io/v3/af6a5e69a2ad41bfbb35ddab9298c69c`)
const web3_testnet = new Web3(provider);

export default web3_testnet;