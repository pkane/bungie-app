import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/Home';
import BogglePage from './pages/Boggle';
import MarkdownConverterPage from './pages/MarkdownConverter';
import Layout from './components/layout/Layout';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage/>} />
				<Route path='/boggle' element={<BogglePage/>} />
				<Route path='/markdown-converter' element={<MarkdownConverterPage/>} />
			</Routes>
		</Layout>
	  );
}

export default App;
