const fs = require('fs');
const dictFile = "dict.txt";
const textFile = "file.txt";
const numTopOccurrences = 3;

/**
 *	Asynchronous function that reads a file.
 *	The returned promise attempts to read the file.
 *	If the read is successful, it calls the `fulfill' callback and passes an
 *		array of lines.
 *	If the read is unsuccessful, it calls the `reject' callback and passes
 *		the error.
 *
 *	@param fname The file to read
 *	@return A promise that reads the file
 *
 *	See "MDN Javascript Promise" and "Node.js FS module" for more details
 */
 function readFile(fname) {
 	return new Promise(
 		(fulfill, reject) => {
 			fs.readFile(fname, (err, data) => {
 				if (err) {
 					reject(err);
 				} else {
 					fulfill(data.toString().split('\n').filter(line => {
 							return line.trim().length > 0;
 						})
 					);
 				}
 			});
 		}
 	);
 }
/**
 *	This function sorts an array of objects that associate a word and
 *	the number of times it has occurred.
 *		[ { word: '<word>', count: <count> }, ... ]
 *
 *	@param arr The array of objects to sort
 *	@return The array sorted first by count, then alphabetically
 *
 *	See "MDN Javascript Array Sort" for more details
 */
function sortByCount(arr) {
	arr.sort((a, b) => {
		if (b.count > a.count) return 1;
		if (b.count < a.count) return -1;
		if (b.word > a.word) return 1;
		if (b.word < a.word) return -1;
		return 0;
	});

	return arr;
}

/**
 *	This function formats an array of objects in the form:
 *		[ { word: '<word>', count: <count> }, ... ]
 *	into a string that is displayable in the form:
 *		"<word> (<count>), <word> (<count>), ..."
 *
 *	@param occurrences An array of objects in the form above
 *	@return The displayable string
 *
 *	It returns the displayable string.
 * 	See "MDN Javascript Array Join" for more details
 */
function printFormat(occurrences) {
	let strs = [];
	for (let occurrence of occurrences)
		strs.push(occurrence.word + " (" + occurrence.count + ")");
	return strs.join(", ");
}

//TODO: Count the total number of words
function getTotalNumberOfWords(text){
    var wordCount=0;
    for (let line of text)
    wordCount += line.split(" ").length;
	return wordCount;
}


//TODO: create an array to store the words on a descending order of counts
function getTopWordOccurrences(text, num){

//get each words in the document.also using line.split() methods.
  let wordMap = {};
  for (let line of text) {
    for (let word of line.split(" ")) {
      if (!(word in wordMap))
        wordMap[word] = 0;
      wordMap[word]++;
    }
  }
//prepare for sorting
  let sortWordMap = [];
  for (let word in wordMap) {
    sortWordMap.push({
      word: word,
      count: wordMap[word]
    });
  }

//using the sortByCount defiended
	return sortByCount(sortWordMap).slice(0, num);

}


//TODO: find mispells words
/**
 *	This function gets the misspelled words in a file based on a dictionary
 *
 *	@param text An array of lines in the file
 *	@param dict An array of words in the dictionary
 *	@return The misspelled words in the order they were found
 *
 * 	See "MDN Javascript Array indexOf" for more details
 */
function getMisspelledWords(text, dict){

let misspelledWords = [];
//** Javascript array indexOf() method returns the
//** first index at which a given element can be found in the array,
//** or -1 if it is not present.
//loop each line of text, and each words,
//if none of the dict element matches the word, push to the misspelledWords array;
//return

for (let line of text)
  for (let word of line.split(" "))
    if (dict.indexOf(word) === -1)
    misspelledWords.push(word);
return misspelledWords;

}


//TODO: Interface

function processResults(text, dict) {
	let totalWords = getTotalNumberOfWords(text);
	let averageWordsPerLine = totalWords / parseFloat(text.length);
	let topWordOccurrences = getTopWordOccurrences(text, numTopOccurrences);
	let misspelledWords = getMisspelledWords(text, dict);
  console.log ("\n\n\n");
  console.log ("===================================");
  console.log ("\n\nHello! Welcome to Simple Text Checker!\n\n");
  console.log ("\n\nI provide some basic stats about your text file,\nand will catch most of your spelling-errors!\n(This app uses the Unix system dictionary as a reference.)");
  console.log ("===================================");
  console.log ("\n\n\n");
	console.log("Total number of words:", totalWords);
	console.log("Average words per line:", averageWordsPerLine);
	console.log("Top occurrences:", printFormat(topWordOccurrences));
	console.log("Misspelled Words:", misspelledWords.join(", "));
}


Promise.all([readFile(textFile), readFile(dictFile)]).then(files => {
	const text = files[0];
	const dict = files[1];
	processResults(text, dict);
}, error => {
	console.log("There was an error!", error.toString());
});
