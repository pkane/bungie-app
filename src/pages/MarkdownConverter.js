import React from 'react';
import { Section, Container, Heading } from 'react-bulma-components';
import MarkdownConverterComponent from '../components/MarkdownConverterComponent';
import classes from './MarkdownConverter.module.css';

export default function MarkdownConverterPage() {
	return (
		<Section>
			<Container className={classes.header}>
				<Heading renderAs='h2'>
					Markdown Converter
				</Heading>
			</Container>
			<Container>
				<MarkdownConverterComponent />
			</Container>
		</Section>
	)
}