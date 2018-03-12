const _ = require("lodash");
let Merger = require("./merger");
const fs = require('fs');
const assert = require('assert');
const path = require("path");


module.exports = class AbiCheck {
  constructor(){

  }

  checkIfPathOrArray(value) {
    return _.isString(value) ? require(value) : value;
  }

  getAbiContentFromEtherscanFormat(value){
    if(_.isArray(value)) return value;
    return value.abi || value.result;
  }

  runCheck(etherScan, submitted){
    let authValue = this.checkIfPathOrArray(etherScan);
    let subValue = this.checkIfPathOrArray(submitted);

    let authority = this.getAbiContentFromEtherscanFormat(authValue);
    let submision = this.getAbiContentFromEtherscanFormat(subValue);

    let authFunctions = [];
    let subFunctions = [];

    for(let i=0; i<authority.length; i++){
      if(authority[i].type === "function"){
        authFunctions.push(authority[i].name);
      }

    }

    for(let i=0; i<submision.length; i++){
      if(submision[i].type === "function"){
        subFunctions.push(submision[i].name);
      }
    }

    return subFunctions.filter(entry => authFunctions.indexOf(entry) === -1);
    }




}