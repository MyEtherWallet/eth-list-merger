const EthereumListsToEtherWalletMerge = require("../EltoEwTokenMerge");

/*const etherWalletPath = "../etherwallet/app/scripts/tokens/ethTokens.json";
const ethereum_listPath = "../ethereum-lists/tokens/tokens-eth.json";*/

const etherWalletPath = "./examples/etherwallet_tokens.json";
const ethereum_listPath = "./examples/ethereumLists_tokens.json";

// Example usage of explicit Ethereum-Lists to etherwallet merge
let merger = new EthereumListsToEtherWalletMerge();
merger.mergeEthereumListsIntoEtherWallet(ethereum_listPath, etherWalletPath, true);



