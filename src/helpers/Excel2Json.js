// import { xlsx } from "xlsx";
// import { fs } from "fs";
const xlsx = require("xlsx")

exports.readSheet = function(fileName, sheetName) {
	let workbook = xlsx.readFile(fileName);
	let sheetNames = workbook.SheetNames
	console.log(sheetNames);
	var worksheet = workbook.Sheets[sheetNames[0]];
	console.log(xlsx.utils.sheet_to_json(worksheet))
}
