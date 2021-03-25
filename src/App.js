import React from 'react';
import './App.css';
import {ThemeProvider} from 'styled-components';
import {Switch,Route, HashRouter,Redirect} from 'react-router-dom';
import Home from './pages/HomePage';
import Starred from './pages/StarredPage';
import Show from './pages/Show';

const theme = {
	mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
	},
};

function App() {
    return (
		<ThemeProvider theme={theme}>
			<HashRouter>
				<div className="">
				<Switch>
					<Route exact path="/home"  >
						<Home />
					</Route>
					<Route exact path="/starred" component={Starred} />
					<Route exact path="/show/:showId" > <Show />    </Route>
					<Redirect to="/home"/>
				</Switch>
			</div>
			</HashRouter>
		</ThemeProvider>
	);
}

export default App;
