import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import { Bubbles } from './Bubbles';
import { ColorList } from './ColorList';

export const BubblePage = () => {
	const [colorList, setColorList] = useState([]);
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property

	useEffect(() => {
		axiosWithAuth()
			.get('/colors')
			.then(res => {
				console.table(res.data);
				console.log(res.data);
				setColorList(res.data);
			})
			.catch(err => {
				console.log(`You got no colors!`, err.response);
			});
	}, []);

	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};
// export default BubblePage;
