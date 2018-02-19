const Helpers = require("./helpers");
const assert = require('assert');

module.exports = class Formatter extends Helpers{

	/**
	 * @param valuesList {Array<Object>} - Array of objects to be coerced into the EtherWallet expected format
	 * @param defaultType {String} - String to use as the type value
	 * @returns {Array<Object>} - Array of objects conforming to the EtherWallet format
	 */
	static toEtherWalletFormat(valuesList, defaultType) {
		let parsed = [];
		for (let item of valuesList) {
			let decimalValue = this.checkField(item, ["decimals", "decimal"], true);
			assert.ok(
				this.confirmIsNumber(decimalValue),
				"Non-numerical value encountered in decimal field for Address: " + item["address"] + ", Symbol: " + item.symbol
			);
			let stripped = {
				"address": item.address,
				"symbol": item.symbol,
				"decimal": decimalValue,
				"type": defaultType
			};
			parsed.push(stripped);
		}
		return this.sortList(parsed);
	}

	/**
	 * @param valuesList {Array<Object>} - Array of objects to be coerced into the Ethereum-List expected format
	 * @returns {Array<Object>} - Array of objects conforming to the Ethereum-List format
	 */
	static toEthereumListFormat(valuesList) {
		let parsed = [];
		for (let item of valuesList) {
			let decimalValue = this.checkField(item, ["decimals", "decimal"], true);
			assert.ok(
				this.confirmIsNumber(decimalValue),
				"Non-numerical value encountered in decimal field for Address: " + item["address"] + ", Symbol: " + item.symbol
			);
			let inflate = {
				"symbol": item.symbol,
				"address": item.address,
				"decimals": decimalValue,
				"name": item.name || "",
				"ens_address": item.ens_address || "",
				"website": item.website || "",
				"logo": {
					"src": item.logo ? item.logo.src || "" : "",
					"width": item.logo ? item.logo.width || ""  : "",
					"height": item.logo ? item.logo.height || "" : "",
					"ipfs_hash": item.logo ? item.logo.ipfs_hash || "" : ""
				},
				"support": {
					"email": item.support ? item.support.email || "" : "",
					"url": item.support ? item.support.url || "" : ""
				},
				"social": {
					"blog": item.social ? item.social.blog || "" : "",
					"chat": item.social ? item.social.chat || "" : "",
					"facebook": item.social ? item.social.facebook || "" : "",
					"forum": item.social ? item.social.forum || "" : "",
					"github": item.social ? item.social.github || "" : "",
					"gitter": item.social ? item.social.gitter || "" : "",
					"instagram": item.social ? item.social.instagram || "" : "",
					"linkedin": item.social ? item.social.linkedin || "" : "",
					"reddit": item.social ? item.social.reddit || "" : "",
					"slack": item.social ? item.social.slack || "" : "",
					"telegram": item.social ? item.social.telegram || "" : "",
					"twitter": item.social ? item.social.twitter || "" : "",
					"youtube": item.social ? item.social.youtube || "" : ""
				}
			};

			parsed.push(inflate);
		}
		return this.sortList(parsed);
	}
};