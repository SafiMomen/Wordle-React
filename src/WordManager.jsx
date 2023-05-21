// Safi Momen
// 03/24/2023

let wordLength = 5;
let wordGeneratorAPI = `https://random-word-api.herokuapp.com/word?length=${wordLength}`;

//@Public: returns true/false if the word exists
function check(word) {
	return true; // placeholder
}

//@Public: makes the state an random word
function randomState(setState) {
	let randomWord = random();
	randomWord.then(word => {
		setState(word);
		console.log(`DEBUG: ${word}`);
	})
	return randomWord;
}

//@Public: returns api
async function random() {
	const response = await fetch(wordGeneratorAPI);
	const json = await response.json();
	return json[0].toUpperCase();
}

export default {
	check: check,
	randomWord: random,
	randomState: randomState,
	length: wordLength
}