import React, { useState } from 'react';

import { Box, Section, Heading, Button } from 'react-bulma-components';
import classes from './MarkdownConverterComponent.module.css';

// PROBLEM 2

const testMarkdown = {
	text: `*This is italicized*, and so is _this_, but this is __bold__ (just like **this is**). And how about *some italic __mixed with some bold__?*
	# Header 1 
	- Use a minus sign for a bullet
	+ Or plus sign
	* Or an asterisk
	
	Here is an ampersand: 'AT&T' and then a less-than 'x < y' 
	
	But let's permit things like &copy; (the copyright symbol) as-is in a primitive way. 
	1. Numbered lists are easy
	1. Markdown keeps track of the numbers for you
	7. So this will be item 3.
	
	### Header 3 ### 
	
	Btw this should be on a single line 
	-  not as an unordered list
	-	and not as an ordered list either`
}

export default function MarkdownConverterComponent() {

	const [convertedText, setConvertedText] = useState('')
	const [markdownText, setMarkdownText] = useState('');

	/*
		2. On click, text content is parsed and tests called with regex matching conditions
	*/
	const convertMarkdownToMarkup = () => {
		// Because our RegEx is imperfect, handle lists separately with String/Array methods
		let convertedText = parseListsFromMarkdown(markdownText);

		// Check for additional matches (with capture group passed as parameter) based on which starting test was passed
		convertedText = parseMarkdown(convertedText);

		// Update html state with new constructed template literal
		setConvertedText(convertedText);
	}

	const getMarkdownFromText = (e) => {
		setMarkdownText(e.target.value)
	}

	function parseListsFromMarkdown(markdownText) {
		let htmlText = markdownText;

		// Unordered lists
		const unorderedMatchesArray = [...htmlText.matchAll(/[\-|\+|\*](?!  ) {1}(.*)/igm)];

		if (unorderedMatchesArray.length > 0) {
			const unorderedMatchesIndices = {
				first: unorderedMatchesArray[0].index,
				last: unorderedMatchesArray[unorderedMatchesArray.length-1].index + unorderedMatchesArray[unorderedMatchesArray.length-1][0].length + ('<ul></ul>'.length * unorderedMatchesArray.length) - '- '.length
			}
	
			if (unorderedMatchesArray.length > 0) {
				htmlText = htmlText.replace(/[\-|\+|\*](?!  ) {1}(.*)/igm, '<li>$1</li>').trim();
	
				htmlText = Array.from(htmlText.split(''));
				htmlText.splice(unorderedMatchesIndices.first, 0, ...'<ul>'.split(''));
				htmlText.splice(unorderedMatchesIndices.last, 0, ...'</ul>'.split(''));
				htmlText = htmlText.join('');
			}
		}	

		// Ordered lists
		const orderedMatchesArray = [...htmlText.matchAll(/\d+\.\s(.*)/igm)];

		if (orderedMatchesArray.length > 0) {
			const orderedMatchesIndices = {
				first: orderedMatchesArray[0].index,
				last: orderedMatchesArray[orderedMatchesArray.length-1].index + orderedMatchesArray[orderedMatchesArray.length-1][0].length + ('<ol></ol>'.length * orderedMatchesArray.length) - '1. '.length
			}
	
			if (orderedMatchesArray.length > 0) {
				htmlText = htmlText.replace(/\d+\.\s(.*)/igm, '<li>$1</li>'.trim())
	
				htmlText = Array.from(htmlText.split(''));
				htmlText.splice(orderedMatchesIndices.first, 0, ...'<ol>'.split(''));
				htmlText.splice(orderedMatchesIndices.last, 0, ...'</ol>'.split(''));
				htmlText = htmlText.join('');
			}
		}

		return htmlText.trim();
	}

	/* 
		1. Set up all RegEx for each markdown syntax type
		- Headers
		- Paragraphs
		- Ordered lists
		- Unordered lists
		- Escape ampersand and less-than
		- Bold and italic 
	*/ 
	function parseMarkdown(markdownText) {
		let htmlText = markdownText
			// Heading Level 3
			.replace(/#{3}\s(.*)/igm, '<h3>$1</h3>')
			// Heading Level 2
			.replace(/#{2}\s(.*)/igm, '<h2>$1</h2>')
			// Heading Level 1
			.replace(/#{1}\s(.*)/igm, '<h1>$1</h1>')
			// Bold text from double underscores
			.replace(/\_{2}(.*?)\_{2}/igm, '<b>$1</b>')
			// Italic text from single underscore
			.replace(/\_{1}(.*?)\_{1}/igm, '<i>$1</i>')
			// Bold text from double asterisks
			.replace(/\*{2}(.*?)\*{2}/igm, '<b>$1</b>')
			// Italic text from single asterisk
			.replace(/\*{1}(.*?)\*{1}/igm, '<i>$1</i>')
			// Match ampersand
			.replace(/((?!&copy;)&)/igm, '&amp;')
			// Match less than symbol
			.replace(/(< )/igm, '&lt; ')
			// Match malformed lists
			.replace(/-([\s]{2,}|[\t]{1,})(.*)/igm, '<p>$2</p>')
			// Match remaining single text lines
			.replace(/(?:\t)(.*)(?:\ \n)/igm, '<p>$1</p>\n')
	
		return htmlText.trim()
	}	

	// 3. Render event fires with updated state
	return (
		<Box>
			<Heading size="4">Here we can convert valid markdown into HTML!</Heading>
			<Heading subtitle size="6">Paste in valid markdown text content into the text area below.</Heading>			
			<Section className={classes.markdownTextContainer}>
				<textarea onChange={(e)=>getMarkdownFromText(e)}></textarea>
				<Button onClick={convertMarkdownToMarkup} size="medium" color="info">Convert</Button>			
			</Section>
			<Section className={classes.HtmlTextContainer}>
				<div className={classes.textContainer} dangerouslySetInnerHTML={{__html: convertedText}}/>
			</Section>
		</Box>
	)
}