// Safi Momen
// 03/17/2023

import {Component, useEffect} from 'react';

import '../styling/Wordle.css';

class WordleRow extends Component {
	constructor(props) {
		super(props);

		this._currentWord = props.children;
	}

	//@Private
	_getLetterBoxes(word) {
		let len = word.length;
		let boxes = [];

		for (let i = 0; i < len; i++) {
			let letter = word.charAt(i);
			let color = this._getColor(letter, i);

			let answered = (letter.trim().length === 0) ? 
				"unansweredLetter" : 
				"answeredLetter";
			
			let element = <li key={i}>
				<div className="wordlePrompt">
					<div className={`wordlePromptBack ${color}`}></div>
					<p className={answered}>{letter}</p>
				</div>
			</li>
			
			boxes.push(element);
		}
	
		return boxes;
	}

	// @Private: returns correct color from word
	_getColor(letter, i = 0) {
		if (letter.trim().length === 0) {return ""}

		let [state, _] = this.props.input;
		if (state.currentRow == this.props.row) {
			// we do not want to reveal before entering
			return ""; 
		}

		let goalChar = this.props.wordleWord.charAt(i);
		if (goalChar === letter) {
			return "answeredGreen";
		}

		if (this.props.wordleWord.indexOf(letter) > -1) {
			return "answeredYellow";
		}

		return "answered";
	}

	//@Private: adds spaces to end of string
	_emptifyString(word, length) {
		let numSpaces = length - word.length;

		if (numSpaces < 1) {
			return word;
		}

		return word + " ".repeat(numSpaces);
	}

	//@Public: main component; returns the UI
	render() {
		let [state, _] = this.props.input;
		
		this._currentWord = state.words[this.props.row];
		
		let spacedWord = this._emptifyString(
			this._currentWord, // the guess
			this.props.wordleWord.length // final word
		);
		let letterBoxes = this._getLetterBoxes(spacedWord);
		
		return (
			<div className="wordleRow">
				<ul>{letterBoxes}</ul>
			</div>
		)
	}
}

export default WordleRow;

