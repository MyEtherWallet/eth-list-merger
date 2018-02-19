
module.exports = class Merger{
	/**
	 * @param propertyToCompare - {String} Property name on which to preform existence comparison for merge determination
	 * @param compareProcessor - {Function} Function to pre-process value comparing if present
	 */
	constructor(propertyToCompare, compareProcessor) {
		if (!propertyToCompare) {
			this.propertyToCompare = "address";
		} else {
			this.propertyToCompare = propertyToCompare;
		}

		if (!compareProcessor) {
			this.compareProcessor = this.defaultProcessor;
		} else {
			this.compareProcessor = compareProcessor;
		}
	};

	/**
	 * @param tokenListBase {Array<Object>} - base array which will be merged into
	 * @param tokenListMerging {Array<Object>} - merging array which will merged from
	 */
	doMerge(tokenListBase, tokenListMerging){
		return this.process(tokenListBase, tokenListMerging, false);
	}

	/**
	 * @param tokenListBase {Array<Object>} - base array which will be merged into
	 * @param tokenListMerging {Array<Object>} - merging array which will merged from
	 */
	getMergingDiff(tokenListBase, tokenListMerging){
		return this.process(tokenListBase, tokenListMerging, true);
	}

	/**
	 * @param tokenListBase {Array<Object>} - base array which will be merged into
	 * @param tokenListMerging {Array<Object>} - merging array which will merged from
	 * @param getDiff {Boolean} - boolean switch to determine whether to merge or return the missing entries
	 */
	process(tokenListBase, tokenListMerging, getDiff){
		let all = this.collectAll(tokenListBase, tokenListMerging);
		let unique = this.collectUnique(all);

		console.log(all.length);
		console.log(unique.size);
		let mergeList = this.extractUnique(tokenListBase, unique);
		let toMerge = this.extractMergeList(tokenListMerging, mergeList);

		if(getDiff){
			return toMerge;
		}
		return tokenListBase.concat(toMerge)
	}

	/**
	 * @param tokenListBase {Array<Object>} - base array which will be merged into
	 * @param tokenListMerging {Array<Object>} - merging array which will merged from
	 */
	collectAll(tokenListBase, tokenListMerging){
		let masterList = [];
		for(let i=0; i<tokenListBase.length; i++){
			masterList.push(this.compareProcessor(tokenListBase[i][this.propertyToCompare]));
		}

		for(let i=0; i<tokenListMerging.length; i++){
			masterList.push(this.compareProcessor(tokenListMerging[i][this.propertyToCompare]));
		}

		return masterList;
	}

	/**
	 * @param masterList {Array<String>} - Array of all values to compare from both input sources combined
	 * @returns {Set<String>} - Set of all unique values present from both input sources combined
	 */
	collectUnique(masterList){
		let collect = [];
		masterList.forEach((val) => {
			collect.push(this.compareProcessor(val));
		});
		return new Set(collect);
	}

	/**
	 * @param tokenList {Array<Object>} - base array used to remove entries from the unique set that are not to be merged from the merging array
	 * @param unique {Set<String>} - Set of all unique values present from both input sources combined
	 * @returns {Set<String>} - Set of identified values to be merged from the merging array
	 */
	extractUnique(tokenList, unique){
		for(let i=0; i<tokenList.length; i++){
			if(unique.has(this.compareProcessor(tokenList[i][this.propertyToCompare]))){
				unique.delete(this.compareProcessor(tokenList[i][this.propertyToCompare]))
			}
		}
		return unique;
	}

	/**
	 * @param tokenListMerging {Array<Object>} - merging array used to collect entries from the unique set that are not to be merged from the merging array
	 * @param unique {Set<String>} - Set of identified values from the merging array to be extracted
	 * @returns {Array<Object>} - Array of objects to be merged into the base array
	 */
	extractMergeList(tokenListMerging, unique){
		let collected = [];
		for(let i=0; i<tokenListMerging.length; i++){
			if(unique.has(this.compareProcessor(tokenListMerging[i][this.propertyToCompare]))){
				unique.delete(this.compareProcessor(tokenListMerging[i][this.propertyToCompare]));
				collected.push(tokenListMerging[i]);
			}
		}
		return collected;
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


};