const EthListMerger = require('./ethListMerger');

const etherWalletPath = "./etherwallet/app/scripts/tokens/ethTokens.json";
const ethereum_listPath = "./ethereum-lists/tokens/tokens-eth.json";

// Example Usage of getDifference
let differenceValues = EthListMerger.getDifference(etherWalletPath, ethereum_listPath, "address");
EthListMerger.toFile("./getDifference_Example.json", differenceValues);

// Example Usage of merge. Merging Ethereum-List into EtherWallet
let forEatherWalletValues = EthListMerger.merge(etherWalletPath, ethereum_listPath, "address");
let forEatherWalletResult = EthListMerger.toEtherWalletFormat(forEatherWalletValues);
EthListMerger.toFile("./forEatherWallet_Example.json", forEatherWalletResult);

// Example Usage of merge. Merging EtherWallet into Ethereum-List
let forEathereumListValues = EthListMerger.merge(ethereum_listPath, etherWalletPath, "address");
let forEathereumListResult = EthListMerger.toEthereumListFormat(forEathereumListValues);
EthListMerger.toFile("./forEathereumList_Example.json", forEathereumListResult);

