// Safi Momen
// 03/20/2023

import '../styling/Keyboard.css';

const keyInputs = [
	["q","w","e","r","t","y","u","i","o","p"], 
	["a","s","d","f","g","h","j","k","l"], 
	["z","x","c","v","b","n","m", "back", "enter"]
]

export default function(props) {
	let [ _, dispatch ] = props.input
	
	let onClick = key => {
		if (key === "back") {
			return () => dispatch({key: "Backspace"});
		}

		if (key === "enter") {
			return () => dispatch({key: "Enter"});
		}
		
		return () => dispatch({key: key.toUpperCase()});	
	}
	
	return (
		<div id="keyboard">
			{keyInputs.map((keyRow, index) => 
				<div className="keyRow" key={index}>
					{keyRow.map((key, index) => 
						<p 
							key={index}
							className="keys"
							onClick={onClick(key)}
						>{key}</p>
					)}
				</div>
			)}
		</div>
	)
}