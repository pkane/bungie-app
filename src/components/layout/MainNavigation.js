import React from 'react'
import { Link } from "react-router-dom";
import { Navbar, Container } from 'react-bulma-components';

import classes from './MainNavigation.module.css';

export default class MainNavigation extends React.Component {
	render() {
		return (
			<Navbar className={classes.header}>
				<Container>
					<Navbar.Brand>
						<Navbar.Item renderAs={Link} to='/'>
							<img className={classes.headerLogo} src="./bungie-logo.png" alt="Bungie logo" width="200" height="58" />
							<h1 className={classes.headerTitle} visuallyhidden="true">Bungie</h1>
						</Navbar.Item>
					</Navbar.Brand>
					<Navbar.Container>
						{/* <Navbar.Item renderAs={Link} to='/'>
							<h3>Home</h3>
						</Navbar.Item> */}
						<Navbar.Item className={classes.navbarLink} renderAs={Link} to='/boggle'>
							<h3>Boggle</h3>
						</Navbar.Item>
						<Navbar.Item className={classes.navbarLink} renderAs={Link} to='/markdown-converter'>
							<h3>Markdown Converter</h3>
						</Navbar.Item>
					</Navbar.Container>
				</Container>
			</Navbar>
		)
	}
}