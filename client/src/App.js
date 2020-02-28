import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';
import BubblePage from './components/BubblePage';

import Login from './components/Login';
import './styles.scss';

function App() {
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

export default App;
