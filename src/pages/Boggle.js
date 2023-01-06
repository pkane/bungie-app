import React from 'react';
import { Section, Container, Heading } from 'react-bulma-components';
import BoggleGame from '../components/BoggleGame'
import classes from './Boggle.module.css';

export default function BogglePage() {

	return (
		<Section>
			<Container className={classes.header}>
				<Heading renderAs='h2'>
					Bungie Boggle
				</Heading>
			</Container>
			<Container>
				<BoggleGame />
			</Container>
		</Section>
	)
}