import { AbiItem } from 'web3-utils';
import web3 from "../connection/web3";
import web3_testnet from "../connection/web3_testnet";
import addresses from './addresses';
import NFTCollection from '../abis/NFT.json'
import NFTMarketCollection from '../abis/NAMarket.json'
import TVSTokenAbi from '../abis/TVS_abi.json'
import Nft_TestNet from '../abis/NFT_TESTNET.json'
import Erc20_TESTNET from '../abis/TestERC20_TESTNET.json'
console.log("NFTCollection.abi", NFTCollection.abi)
console.log("AbiItem", AbiItem)



const contracts = {
  tvsContract: new web3.eth.Contract(TVSTokenAbi, addresses.tvs),
  nftContract: new web3.eth.Contract(NFTCollection.abi, addresses.nft),
  nftMarketContract: new web3.eth.Contract(NFTMarketCollection.abi, addresses.nftMarket),
  nft_testnet: new web3_testnet.eth.Contract(Nft_TestNet.abi, addresses.nft_testnet),
  erc20_testnet: new web3_testnet.eth.Contract(Erc20_TESTNET.abi, addresses.erc20_testnet)
    
};

export default contracts