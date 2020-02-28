import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login.js';
import { PrivateRoute } from './utils/PrivateRoute.js';
import { BubblePage } from './components/BubblePage.js';
import './styles.scss';

export default function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route exact path='/' component={Login} />
					<PrivateRoute exact path='/bubbles' component={BubblePage} />
				</Switch>
				{/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
			</div>
		</Router>
	);
}

// export default App;
