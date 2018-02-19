const _ = require("lodash");
const Helpers = require("./helpers");
const Formatter = require("./formatter");
const Merger = require("./merger");

module.exports = class EthListMerger {


	/**
	 * @param etherWalletPath {String} - File path for content to merge into (base array)
	 * @param ethereumListPath {String} - File path for content to be merged from (merging array)
	 * @returns {Array} - Merged/Combined, formatted, and sorted array of objects
	 */
	static mergeToEtherWallet(etherWalletPath, ethereumListPath){

		let etherWalletList = etherWalletPath && _.isString(etherWalletPath) ? etherWalletPath : "~./etherwallet/app/scripts/tokens/ethTokens.json";
		let ethereumListList = ethereumListPath && _.isString(ethereumListPath) ? ethereumListPath : "~./ethereum-lists/tokens/tokens-eth.json";

		let mergedList = this.merge(etherWalletList, ethereumListList, "address");
		let formatedResults = this.toEtherWalletFormat(mergedList);

		let seperator = process.platform=="win32" ? "\\" : "/";
		let pathParts = etherWalletPath.split(seperator);

		let mergedFileSuffix = pathParts[pathParts.length - 1];

		this.toFile("merged-" + mergedFileSuffix, formatedResults);

	}

	/**
	 * @param ethereumListPath {String} - File path for content to merge into (base array)
	 * @param etherWalletPath {String} - File path for content to be merged from (merging array)
	 * @returns {Array} - Merged/Combined, formatted, and sorted array of objects
	 */
	static mergeToEthereumLists(ethereumListPath, etherWalletPath){
		let etherWalletList = ethereumListPath ? ethereumListPath : "./etherwallet/app/scripts/tokens/ethTokens.json";
		let ethereumListList = etherWalletPath ? etherWalletPath : "./ethereum-lists/tokens/tokens-eth.json";

		let mergedList = this.merge(ethereumListList, etherWalletList, "address");
		let formatedResults = this.toEthereumListFormat(mergedList);

		let seperator = process.platform=="win32" ? "\\" : "/";
		let pathParts = etherWalletPath.split(seperator);

		let mergedFileSuffix = pathParts[pathParts.length - 1];

		this.toFile("merged-" + mergedFileSuffix, formatedResults);
	}

	/**
	 * @param mergeInto {Array<Object>|String} - File path or array of objects to merge into (base array)
	 * @param mergeFrom {Array<Object>|String} - File path or array of objects to be merged from (merging array)
	 * @param mergeOn {String} - Property name on which to preform existence comparison for merge determination
	 * @param compareProcessor {Function} - function to act on the mergeOn value for comparison
	 * @returns {Array} - Merged/Combined array of objects
	 */
	static merge(mergeInto, mergeFrom, mergeOn, compareProcessor) {
		let tokenListInto = _.isString(mergeInto) ? require(mergeInto) : mergeInto;
		let tokenListFrom = _.isString(mergeFrom) ? require(mergeFrom) : mergeFrom;

		let merger = new Merger(mergeOn, compareProcessor);
		return merger.doMerge(tokenListInto, tokenListFrom);
	}

	/**
	 * @param mergeInto {Array<Object>|String} - FileName or array of objects to merge into (base array)
	 * @param mergeFrom {Array<Object>|String} - FileName or array of objects to be merged from (merging array)
	 * @param mergeOn {String} - Property name on which to preform existence comparison for merge determination
	 * @param compareProcessor {Function} - function to act on the mergeOn value for comparison
	 * @returns {Array} - Array of objects that are present in the merging array and not present in the base array
	 */
	static getDifference(mergeInto, mergeFrom, mergeOn, compareProcessor){
		let tokenListInto = _.isString(mergeInto) ? require(mergeInto) : mergeInto;
		let tokenListFrom = _.isString(mergeFrom) ? require(mergeFrom) : mergeFrom;

		let merger = new Merger(mergeOn, compareProcessor);
		return merger.getMergingDiff(tokenListInto, tokenListFrom);
	}

	/**
	 * @param valArray {Array<Object>} - Array of objects to format
	 * @returns {Array} - Formatted array of objects
	 */
	static toEtherWalletFormat(valArray){
		return Formatter.toEtherWalletFormat(valArray);
	}

	/**
	 * @param valArray {Array<Object>} - Array of objects to format
	 * @returns {Array} - Formatted array of objects
	 */
	static toEthereumListFormat(valArray){
		return Formatter.toEthereumListFormat(valArray);
	}

	/**
	 * @param filename {String}
	 * @param result {Array<Object>} - Array of objects to be written to file
	 */
	static toFile(filename, result) {
		Helpers.toFile(filename, result);
	}



};