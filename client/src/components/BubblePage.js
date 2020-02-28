import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import { Bubbles } from './Bubbles.js';
import { ColorList } from './ColorList.js';

export const BubblePage = () => {
	const [colorList, setColorList] = useState([]);
	const [update, setUpdate] = useState(false);
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property

	useEffect(() => {
		axiosWithAuth()
			.get('/colors')
			.then(res => {
				console.table(res.data);
				console.log(res.data);
				setColorList(res.data);
				setUpdate(false);
			})
			.catch(err => {
				console.log(`You got no colors!`, err.response);
			});
	}, [update]);

	return (
		<>
			<ColorList
				colors={colorList}
				updateColors={setColorList}
				setUpdate={setUpdate}
			/>
			<Bubbles colors={colorList} />
		</>
	);
};
// export default BubblePage;
