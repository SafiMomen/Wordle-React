
import '../styling/App.css'
import restartImage from "../Images/restart.png"

import WordRow from './WordleRow';
import Keyboard from './Keyboard';
import WordManager from './WordManager';
import Input from './Input';

import {useState, useEffect} from 'react';

export default function App() { 
	let [word, setWord] = useState("TESTS");

	useEffect(() => {
		WordManager.randomState(setWord);
	}, []);

	let numGuess = 6;
	let [state, dispatch] = Input(numGuess, [word, setWord]);
	
	return (
		<main>
			<center>
				<h1>WORDLE:<b>REVAMPED</b></h1>

				<div id="wordleContainer">
					{state.words.map((guess, index) => 
						<WordRow
							wordleWord={word} 
							row={index} 
							input={[state, dispatch]}
							key={index}>{""}</WordRow>
					)}
				</div>

				<img 
					src={restartImage} 
					width="340px" 
					onClick={() => dispatch({key: "Control"})}
				/>

				<Keyboard input={[state, dispatch]}/>
			</center>
		</main>
	)
}
