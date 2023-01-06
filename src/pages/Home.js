import React from 'react';
import { Section, Container, Heading } from 'react-bulma-components';

export default function HomePage() {
	return (
		<Section>
			<Container>
				<Heading renderAs='h2'>
					Home
				</Heading>
				<p>Welcome to the Bungie exercise.</p>
				<p>Please select one of the exercise options above.</p>
			</Container>
		</Section>
	)
}