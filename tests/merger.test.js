const Merger = require('../merger');

describe("Merger Tests", () => {

	it("collectAll works on addresses as expected (normalizes, and collects)", () => {
		let mockBase = [
			{
				"address": "0xfdbc1adc26f0f8f8606a5d63b7d3a3cd21c22b23",
				"symbol": "1WO",
				"decimal": 8,
				"type": "default"
			}, {
				"address": "0xAf30D2a7E90d7DC361c8C4585e9BB7D2F6f15bc7",
				"symbol": "1ST",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "0xaEc98A708810414878c3BCDF46Aad31dEd4a4557",
				"symbol": "300",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "0xb98d4c97425d9908e66e53a6fdf673acca0be986",
				"symbol": "ABT",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "0x13f1b7fdfbe1fc66676d56483e21b1ecb40b58e2",
				"symbol": "ACC",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "0x8810C63470d38639954c6B41AaC545848C46484a",
				"symbol": "ADI",
				"decimal": 18,
				"type": "default"
			}
		];

		let mockMerge = [
			{
				"symbol": "1ST",
				"address": "0xAf30D2a7E90d7DC361c8C4585e9BB7D2F6f15bc7",
				"decimals": "18",
				"name": "FirstBlood"
			}, {
				"symbol": "1WO",
				"address": "0xfdbc1adc26f0f8f8606a5d63b7d3a3cd21c22b23",
				"decimals": "8",
				"name": "1WO"
			}, {
				"symbol": "300",
				"address": "0xaEc98A708810414878c3BCDF46Aad31dEd4a4557",
				"decimals": "18",
				"name": "300 Token Sparta"
			}
		];
		const expected = ["0xfdbc1adc26f0f8f8606a5d63b7d3a3cd21c22b23", "0xAf30D2a7E90d7DC361c8C4585e9BB7D2F6f15bc7", "0xaEc98A708810414878c3BCDF46Aad31dEd4a4557", "0xb98d4c97425d9908e66e53a6fdf673acca0be986", "0x13f1b7fdfbe1fc66676d56483e21b1ecb40b58e2", "0x8810C63470d38639954c6B41AaC545848C46484a", "0xAf30D2a7E90d7DC361c8C4585e9BB7D2F6f15bc7", "0xfdbc1adc26f0f8f8606a5d63b7d3a3cd21c22b23", "0xaEc98A708810414878c3BCDF46Aad31dEd4a4557"];
		const merger = new Merger();
		expect(merger.collectAll(mockBase, mockMerge)).toEqual(expected)
	});

	it("collectAll to collect all property values", () => {
		let mockBase = [
			{
				"address": "one",
				"symbol": "1WO",
				"decimal": 8,
				"type": "default"
			}, {
				"address": "two",
				"symbol": "1ST",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "three",
				"symbol": "300",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "four",
				"symbol": "ABT",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "five",
				"symbol": "ACC",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "six",
				"symbol": "ADI",
				"decimal": 18,
				"type": "default"
			}
		];

		let mockMerge = [
			{
				"symbol": "1ST",
				"address": "seven",
				"decimals": "18",
				"name": "FirstBlood"
			}, {
				"symbol": "1WO",
				"address": "eight",
				"decimals": "8",
				"name": "1WO"
			}, {
				"symbol": "300",
				"address": "nine",
				"decimals": "18",
				"name": "300 Token Sparta"
			}
		];
		const expected = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
		const merger = new Merger();
		expect(merger.collectAll(mockBase, mockMerge)).toEqual(expected)
	});

	it("collectAll to normalize values to lower case", () => {
		let mockBase = [
			{
				"address": "oNe",
				"symbol": "1WO",
				"decimal": 8,
				"type": "default"
			}, {
				"address": "twO",
				"symbol": "1ST",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "thREe",
				"symbol": "300",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "Four",
				"symbol": "ABT",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "fIve",
				"symbol": "ACC",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "siX",
				"symbol": "ADI",
				"decimal": 18,
				"type": "default"
			}
		];

		let mockMerge = [
			{
				"symbol": "1ST",
				"address": "seVen",
				"decimals": "18",
				"name": "FirstBlood"
			}, {
				"symbol": "1WO",
				"address": "eigHt",
				"decimals": "8",
				"name": "1WO"
			}, {
				"symbol": "300",
				"address": "ninE",
				"decimals": "18",
				"name": "300 Token Sparta"
			}
		];
		const expected = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
		const merger = new Merger();
		expect(merger.collectAll(mockBase, mockMerge)).toEqual(expected)
	});


	it("collectUnique to eliminate duplicates", () => {
		const mockMasterList = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "one", "two", "three", "one", "two", "three"];

		const expected = new Set(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]);
		const merger = new Merger();

		expect(merger.collectUnique(mockMasterList)).toEqual(expected)
	});


	it("extractUnique to identify to add values", () => {

		let mockBase = [
			{
				"address": "one",
				"symbol": "1WO",
				"decimal": 8,
				"type": "default"
			}, {
				"address": "two",
				"symbol": "1ST",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "three",
				"symbol": "300",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "four",
				"symbol": "ABT",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "five",
				"symbol": "ACC",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "six",
				"symbol": "ADI",
				"decimal": 18,
				"type": "default"
			}
		];

		const mockUnique = new Set(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]);

		const expected = new Set(["seven", "eight", "nine"]);
		const merger = new Merger();

		expect(merger.extractUnique(mockBase, mockUnique)).toEqual(expected)
	});

	it("extractUnique to normalize values prior to check", () => {

		let mockBase = [
			{
				"address": "oNe",
				"symbol": "1WO",
				"decimal": 8,
				"type": "default"
			}, {
				"address": "twO",
				"symbol": "1ST",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "thREe",
				"symbol": "300",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "Four",
				"symbol": "ABT",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "fIve",
				"symbol": "ACC",
				"decimal": 18,
				"type": "default"
			}, {
				"address": "siX",
				"symbol": "ADI",
				"decimal": 18,
				"type": "default"
			}
		];

		const mockUnique = new Set(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]);

		const expected = new Set(["seven", "eight", "nine"]);
		const merger = new Merger();

		expect(merger.extractUnique(mockBase, mockUnique)).toEqual(expected)
	});



});