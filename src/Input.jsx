// Safi Momen
// 03/18/2023

import { useEffect, useReducer } from 'react';
import WordManager from './WordManager';

// Private functions
function inputHandler(state, action) {
	let currRow = state.currentRow;
	let words = [...state.words];
	let word = words[currRow];

	// reset the game
	if (action.key === "Control") {
		for (let n = 0; n < words.length; n++) {
			words[n] = "";
		}

		WordManager.randomState(state.setWord);
		
		return {...state, currentRow: 0, words: words};
	}

	// check if game ended
	if (currRow >= state.words.length) {
		return state;
	}

	// word entered
	if (action.key === "Enter") {
		if (state.words[currRow].length != 5) {
			return state;
		};
		
		return {...state, currentRow: currRow + 1,};
	}

	//  remove a letter
	if (action.key === "Backspace") {
		let length = word.length;
		
		words[currRow] = word.substring(0, length - 1);
		return {...state, words: words};
	}
	
	// cap letter limit
	if (word.length >= 5) {return state}
	
	words[currRow] = word + action.key;
	return {...state, words: words};
}


// Public functions
function Input(numberOfGuesses, [word, setWord]) {
	let guesses = new Array(numberOfGuesses);
	for (let n = 0; n < guesses.length; n++) {
		guesses[n] = "";
	}
	
	let [state, dispatch] = useReducer(inputHandler, {
		words: guesses,
		currentRow: 0,

		setWord: setWord
	});

	let actions = ["Backspace", "Enter", "Control"];
	
	let handleInput = event => {
		if (event.repeat) {return}
		
		for (let action of actions) {
			if (action === event.key) {
				dispatch({key: event.key,});
			}
		}

		// only alphabetical letters
		let keyCode = event.keyCode;
		if (keyCode >= 65 && keyCode <= 90) {
			dispatch({key: event.key.toUpperCase(),});
		}
	}
	
	useEffect(() => {
		window.addEventListener("keydown", handleInput);

		return () => {
			window.removeEventListener("keydown", handleInput);
		};
	});

	return [state, dispatch];
}

export default Input;