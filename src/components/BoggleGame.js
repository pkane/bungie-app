import React, { useState } from 'react';

import { Box, Form, Heading, Button, Tag } from 'react-bulma-components';
import classes from './BoggleGame.module.css';

// PROBLEM 1

// 1. Ingest data from Boggle word list, convert to array of strings
const wordsJSON = require('../word-list.json');

// 2. Store array of string for each character input (9 total)
const wordsArray = wordsJSON;

export default function BoggleGame() {
	const [charFields, setCharFields] = useState(Array(9).fill(''));
	const [finalWordsList, setFinalWordsList] = useState([]);
	const [buttonEnabled, setButtonEnabled] = useState(false);
	const [easterEggEnabled, setEasterEggEnabled] = useState(false);

	const checkFieldInput = (target, index) => {
		const tempFields = charFields;
		let passToNextInput = true;
		if (tempFields.includes(target.value)) {
			target.value = '';
		}
		if (target.value === '') {
			passToNextInput = false;
		}
		// Test if key is valid letter, then evaluate it
		const isValidKey = /^[a-zA-Z]+$/.test(target.value);
		if (isValidKey || !passToNextInput) {
			tempFields[index] = target.value;
			setCharFields(tempFields);
			console.log(charFields);

			if (passToNextInput) {
				// While we're here, target next input if possible
				const nextFormField = target.parentElement.parentElement.nextElementSibling;

				if (nextFormField !== null) {
					nextFormField.querySelector('input').focus();
					// focusTextInput()
				}						
			}			
		}

		const anyFieldsEmpty = charFields.some(x => x === '');
		setButtonEnabled(!anyFieldsEmpty);
	}

	const checkFieldKey = (event, index) => {
		const key = event.key;
		const target = event.target;

		// If key is same as current input field, do nothing
		if (key === target.value || target.value === '') {
			return;
		}
	}

	/*
		Helper function which will loop through every character of a provided string,
		then check if each exists within our input set
	*/
	function test(chars, substring) {
		const myChars = chars.slice(0);
		let array;

		try {
			array = [...substring];
		}	catch (error) {
			console.log(error, substring);
			return false;
		}

		return [...substring].every(x => {
			if (myChars.includes(x)) {
				// remove from a copy to find only single occurences
				myChars.splice(myChars.indexOf(x), 1);
				return true;
			}
			return false
		});			  
	}

	function checkSpecialString(string) {
		if (string.includes('destiny')) {
			destinyJitterBug();
		}
	}

	const destinyJitterBug = () => {
		setEasterEggEnabled(true)

		setTimeout(() => {
			setEasterEggEnabled(false)
		}, 3000);
	}

	const getWordsFromChars = () => {

		// 3. Filter words array by length of word, and first character in each word, matched to each character (array.filter)
		const filteredWords = wordsArray.filter((item) => {
			if (item.word.length > 0 && item.word.length <= charFields.length) {
				return charFields.indexOf(item.word.charAt(0)) > -1;
			}
		})
		
		/*
			4. Loop through each word, check that all its characters exist in char array (array.every)
			If so, push to new array or object.		
		*/
		const wordsList = filteredWords.filter((item) => {
			const x = test(charFields, item.word);
			return x;
		});

		console.log(wordsList);

		setFinalWordsList(wordsList);

		checkSpecialString(charFields.join(''))
	}

	return (
		<Box>
			<Heading size="4">Let's make some Boggle!</Heading>
			<Heading subtitle size="6"><label for="boggle-characters">Enter 9 unique letters to get started, then click "Boggle!"</label></Heading>
			<div className={classes.boggleGameContainer}>
				<div className={classes.boggleUserInputContainer}>
					<div className={classes.boggleInputFieldContainer}>
						{charFields.map((item, index) => {
							return (
								<Form.Field className={classes.formField} key={index} onKeyDown={(e)=>checkFieldKey(e, index)} onChange={(e)=>checkFieldInput(e.target, index)}>
									<Form.Control>
										<Form.Input
											placeholder=""
											type="text"
											maxLength="1"
											id="boggle-characters"
										/>
									</Form.Control>
								</Form.Field>	
							)
						})}						
					</div>
					<Button onClick={getWordsFromChars} disabled={!buttonEnabled}>Boggle!</Button>
					<ul className={classes.boggleFinalWordsList}>
						{finalWordsList.map((item, index) => {
							// 5. Render word list to page.
							return (
								<li key={index}>
									<Tag size="large">{item.word}</Tag>
								</li>
							)
						})}
					</ul>
				</div>
				<div className={classes.boggleBoardWrapper}>
					<div className={classes.boggleBoardContainer}>
						<div className={classes.boggleBoard}>
							{charFields.map((item, index) => {
								return (
									<div key={index}><span>{item}</span></div>
								)
							})}
						</div>
					</div>
					<div className={classes.easterEgg} style={{opacity: `${easterEggEnabled ? 1 : 0}`, visibility: `${easterEggEnabled ? 'visible' : 'hidden'}`}}>
						<img src="./destiny-loader.gif" alt="Destiny 2 loading animation as easter egg" />
					</div>
				</div>
			</div>
		</Box>		
	)
}