let AbiCheck = require("../abiCheck");


let abiCheck = new AbiCheck();

let result = abiCheck.runCheck("./examples/abiFromEtherscan.json", "./examples/abiSubmitted.json");

console.log(result);