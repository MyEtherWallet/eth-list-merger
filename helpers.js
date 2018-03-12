const _ = require("lodash");
const fs = require('fs');

module.exports = class Helpers {


  checkIfPathOrArray(value) {
    return _.isString(value) ? require(value) : value;
  }

	/**
	 * @param valuesList {Array|String} - Array of objects or Filename of an array of objects  to be sorted
	 * @param property {String} - Property on which to sort the objects
	 * @returns {Array<Object>} - The sorted array of objects
	 */
	static sortList(valuesList, property) {
		if (!property) property = "symbol";
		if (!_.isArray(property)) property = [property];
		if (_.isString(valuesList)) valuesList = require(valuesList);
		return _.sortBy(valuesList, property);
	}

	/**
	 * @param obj {Object} - Object to check for the presence of one of the possible property names
	 * @param possibleValues {Array<String>} - Array of possible property names
	 * @param makeNumeric {Boolean} - Whether the value found should be converted to a number
	 * @returns {number}
	 */
	static checkField(obj, possibleValues, makeNumeric){
		if(Array.isArray(possibleValues)){
			for(let val of possibleValues){
				if(obj[val] !== undefined){
					return makeNumeric ? parseInt(obj[val], 10) : obj[val];
				}
			}
			for(let props in obj){
				console.log("None of the listed properties were present in the checked object");
				console.log("checked object:" + props + " : " + obj[props]); // check to inform if none of the possible property names were found
			}
		}
	}

	/**
	 * @param val {Number|*} - value to check if conversion from string encountered no error
	 * @returns {boolean} - true if value is a number or is a String or Number, false otherwise
	 */
	static confirmIsNumber(val){
		return !(val === undefined || Number.isNaN(val));
	}

	/**
	 * @param filename {String} - Name of file to write merge result to
	 * @param result {Array<Object>} - Array of objects to be written
	 */
	static toFile(filename, result){
		let listoutput = JSON.stringify(result);

		// to Ethereum-lists
		fs.writeFile(filename, listoutput, (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	}


	/**
	 * @param filePath {String} - file path to extract file name from
	 * @returns {string} - extracted file name
	 */
	static extractBaseFileName(filePath){
		let seperator = process.platform=="win32" ? "\\" : "/";
		let pathParts = filePath.split(seperator);
		let extractFileSuffex = /.*(?=\.json)/[Symbol.match](pathParts[pathParts.length - 1]);
		let mergedFileSuffix = extractFileSuffex ? extractFileSuffex : "etherWallet";
		return mergedFileSuffix[0]
	}


};

