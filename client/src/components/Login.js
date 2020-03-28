import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import { useHistory } from 'react-router-dom';

export const Login = () => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const [login, setLogin] = useState({
		username: '',
		password: '',
	});

	const history = useHistory();

	const handleChange = e => {
		e.preventDefault();
		setLogin({ ...login, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.post('login', login)
			.then(res => {
				console.log(res.data);
				window.localStorage.setItem('token', res.data.payload);
				history.push('/bubbles');
			})
			.catch(err => {
				console.log(
					`Unable to login! axiosWithAuth has an error!`,
					err.response
				);
			});
	};

	return (
		<>
			<h1 className='loginTitle'>bubble</h1>
			{/* <p>Build a login page here</p> */}
			<form className='loginForm' onSubmit={handleSubmit}>
				<label htmlFor='username'>
					<input
						className='formInput'
						type='text'
						name='username'
						label='username'
						placeholder='username'
						value={login.username}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor='password'>
					<input
						className='input'
						type='text'
						name='password'
						label='password'
						placeholder='password'
						value={login.password}
						onChange={handleChange}
					/>
				</label>
				<button className='loginBtn'>pop in</button>
			</form>
		</>
	);
};
// export default Login;
