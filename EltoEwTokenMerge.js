const _ = require("lodash");
let Merger = require("./merger");
const fs = require('fs');
const assert = require('assert');


module.exports = class EthListsToEtherWalletMerge extends Merger {
  /**
   * @param propertyToCompare - {String} Property name on which to preform existence comparison for merge determination
   * @param compareProcessor - {Function} Function to pre-process value comparing if present
   */
  constructor(propertyToCompare, compareProcessor) {
    super(propertyToCompare, compareProcessor);
    this.reset();
  };

  /**
   * resets the instance values
   */
  reset() {
    this.authorityList = [];
    this.otherList = [];
    this.normalizedAuthority = [];
    this.normalizedOther = [];
    this.symbolsOther = [];
    this.symbolsAuth = [];
    this.tokensAddedCount = 0;
  };


  mergeEthereumListsIntoEtherWallet(ethereumLists, etherWallet, showDiffResult) {
    let showDiff = showDiffResult || false;

    let authorityList = this.checkIfPathOrArray(ethereumLists);
    let otherList = this.checkIfPathOrArray(etherWallet);
    // console.log(otherList.length);
    // console.log(authorityList.length);
    if(showDiff) {
      let diff = this.getMergingDiff(authorityList, otherList);
      console.log("Entries Added: ");
      console.log(diff);
    }
    let result = this.doMerge(authorityList, otherList);
    // console.log(result.length);
    console.log(`${authorityList.length - otherList.length} tokens added`);
    console.log(`The Token List Now Contains ${result.length} tokens`);
    this.toFile("ethTokens.json", result);
  }

  /**
   * @param authorityList {Array<Object>} - base array which will be merged from
   * @param otherList {Array<Object>} - merging array which will merged into
   */
  doMerge(authorityList, otherList) {
    this.reset();
    return this.betterProcess(authorityList, otherList, false);
  }

  /**
   * @param authorityList {Array<Object>} - base array which will be merged from
   * @param otherList {Array<Object>} - merging array which will merged into
   */
  getMergingDiff(authorityList, otherList) {
    this.reset();
    return this.betterProcess(authorityList, otherList, true);
  }

  /**
   * @param authorityList {Array<Object>} - base array which will be merged from
   * @param otherList {Array<Object>} - merging array which will merged into
   * @param getDiff {Boolean} - boolean switch to determine whether to merge or return the missing entries
   */
  betterProcess(authorityList, otherList, getDiff) {
    this.authorityList = this.toEtherWalletFormat(authorityList);
    this.otherList = this.toEtherWalletFormat(otherList);
    this.normalizeLists(this.authorityList, this.otherList);

    let mergeList = this.extractUnique(otherList, new Set(this.normalizedAuthority));
    let toMerge = this.extractMergeList(authorityList, mergeList);
    this.tokensAddedCount = toMerge.length;

    if (getDiff) {
      return this.toEtherWalletFormat(toMerge);
    }

    let resultList = otherList.concat(this.toEtherWalletFormat(toMerge));
    return this.sortList(resultList);
  }

  /**
   * @param tokenList {Array<Object>} - base array used to remove entries from the unique set that are not to be merged from the merging array
   * @param unique {Set<String>} - Set of all unique values present from both input sources combined
   * @returns {Set<String>} - Set of identified values to be merged from the merging array
   */
  extractUnique(tokenList, unique) {
    for (let i = 0; i < tokenList.length; i++) {
      if (unique.has(this.compareProcessor(tokenList[i][this.propertyToCompare]))) {
        unique.delete(this.compareProcessor(tokenList[i][this.propertyToCompare]))
      }
    }
    return unique;
  }

  /**
   * @param otherList {Array<Object>} - merging array used to collect entries from the unique set that are not to be merged from the merging array
   * @param unique {Set<String>} - Set of identified values from the merging array to be extracted
   * @returns {Array<Object>} - Array of objects to be merged into the base array
   */
  extractMergeList(otherList, unique) {
    let collected = [];
    for (let i = 0; i < otherList.length; i++) {
      if (unique.has(this.compareProcessor(otherList[i][this.propertyToCompare]))) {
        unique.delete(this.compareProcessor(otherList[i][this.propertyToCompare]));
        collected.push(otherList[i]);
      }
    }
    return collected;
  }

  /**
   * @param authorityList {Array<Object>} - list of tokens from Ethereum-Lists
   * @param otherList {Array<Object>} - list of tokens from kvhnuke/etherwallet
   */
  normalizeLists(authorityList, otherList) {
    for (let i = 0; i < authorityList.length; i++) {
      this.normalizedAuthority.push(this.compareProcessor(authorityList[i][this.propertyToCompare]));
    }

    for (let i = 0; i < otherList.length; i++) {
      this.normalizedOther.push(this.compareProcessor(otherList[i][this.propertyToCompare]));
    }

  }

  /**
   * @param valuesList {Array<Object>} - Array of objects to be coerced into the EtherWallet expected format
   * @returns {Array<Object>} - Array of objects conforming to the EtherWallet format
   */
  toEtherWalletFormat(valuesList) {
    let parsed = [];
    for (let item of valuesList) {
      let decimalValue = this.checkField(item, ["decimals", "decimal"], true);
      assert.ok(
        this.confirmIsNumber(decimalValue),
        "Non-numerical value encountered in decimal field for Address: " + item["address"] + ", Symbol: " + item.symbol
      );
      parsed.push(this.etherWalletFormat(item, decimalValue));
    }
    return this.sortList(parsed);
  }

  /**
   *
   * @param item {Object} - item to be formatted
   * @param decimalValue - decimal or decimals value converted to number if it was a string, or the number otherwise
   */
  etherWalletFormat(item, decimalValue) {
    return {
      "address": item.address,
      "symbol": item.symbol,
      "decimal": decimalValue,
      "type": "default"
    };
  }

  /**
   * @param valuesList {Array|String} - Array of objects or Filename of an array of objects  to be sorted
   * @param property {String} - Property on which to sort the objects
   * @returns {Array<Object>} - The sorted array of objects
   */
  sortList(valuesList, property = "symbol") {
    if (!_.isArray(property)) property = [property];
    if (_.isString(valuesList)) valuesList = require(valuesList);
    return _.sortBy(valuesList, property);
  }

  /**
   * Default comparison pre-processor function
   * @param entry {String} - Value of the property on which merging determination will be made
   * @returns {string} - processed value which will be compared to determine inclusion in merging
   */
  defaultProcessor(entry) {
    return entry.toLowerCase().trim();
    // return entry["address"].toLowerCase().trim();
  };

  checkIfPathOrArray(value) {
    return _.isString(value) ? require(value) : value;
  }


  forManualCheck(authorityList, otherList) {
    for (let i = 0; i < authorityList.length; i++) {
      this.normalizedAuthority.push(this.compareProcessor(authorityList[i][this.propertyToCompare]));
      this.symbolsAuth.push(this.compareProcessor(authorityList[i]["symbol"]));
    }

    for (let i = 0; i < otherList.length; i++) {
      this.normalizedOther.push(this.compareProcessor(otherList[i][this.propertyToCompare]));
      this.symbolsOther.push(this.compareProcessor(otherList[i]["symbol"]));
    }


    console.log(this.symbolsAuth);
    this.toFile("AuthoritySymbols", this.symbolsAuth);
    this.toFile("AuthorityAddresses", this.normalizedAuthority);
    console.log("==================================" + "\n\n\n");
    console.log(this.symbolsOther);
    this.toFile("otherSymbols", this.symbolsOther);
    this.toFile("otherAddresses", this.normalizedOther);
    let combinebSymbols = this.symbolsAuth.concat(this.symbolsOther);
    let combinedAddresses = this.normalizedAuthority.concat(this.normalizedOther);
    this.toFile("combinedSymbols", combinebSymbols);
    this.toFile("combinedAddresses", combinedAddresses);
  }

  /**
   * @param filename {String} - Name of file to write merge result to
   * @param result {Array<Object>} - Array of objects to be written
   */
  toFile(filename, result) {
    let listoutput = JSON.stringify(result);
    fs.writeFile(filename, listoutput, (err) => {
      if (err) throw err;
      console.log(this.tokensAddedCount);
      console.log(`The file has been saved to ${process.cwd() + "/" + filename}`);
    });
  }

  /**
   * @param val {Number|*} - value to check if conversion from string encountered no error
   * @returns {boolean} - true if value is a number or is a String or Number, false otherwise
   */
  confirmIsNumber(val) {
    return !(val === undefined || Number.isNaN(val));
  }

  /**
   * @param obj {Object} - Object to check for the presence of one of the possible property names
   * @param possibleValues {Array<String>} - Array of possible property names
   * @param makeNumeric {Boolean} - Whether the value found should be converted to a number
   * @returns {number}
   */
  checkField(obj, possibleValues, makeNumeric) {
    if (Array.isArray(possibleValues)) {
      for (let val of possibleValues) {
        if (obj[val] !== undefined) {
          return makeNumeric ? parseInt(obj[val], 10) : obj[val];
        }
      }
      for (let props in obj) {
        console.log("None of the listed properties were present in the checked object");
        console.log("checked object:" + props + " : " + obj[props]); // check to inform if none of the possible property names were found
      }
    }
  }

};