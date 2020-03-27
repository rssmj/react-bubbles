import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';

const initialColor = {
	color: '',
	code: { hex: '' },
};

export const ColorList = ({ colors, updateColors, setUpdate }) => {
	console.log(colors);
	const [addingColor, setAddingColor] = useState(false);
	const [colorToAdd, setColorToAdd] = useState(initialColor);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const addColor = color => {
		setAddingColor(true);
		setEditing(false);
	};

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
		setAddingColor(false);
	};

	const saveAdded = e => {
		e.preventDefault();
		setAddingColor(false);
		axiosWithAuth()
			.post('colors', colorToAdd)
			.then(res => updateColors(res.data))
			.catch(err => console.log(err));
		setColorToAdd(initialColor);
	};

	const saveEdit = e => {
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
		e.preventDefault();
		axiosWithAuth()
			.put(`colors/${colorToEdit.id}`, colorToEdit)
			.then(res => {
				console.log(res.data);
				updateColors(colors);
				setUpdate(true);
				setEditing(false);
			})
			.catch(err => {
				console.log(`Error! cannot edit!`, err.response);
			});
	};

	const deleteColor = color => {
		// make a delete request to delete this color
		axiosWithAuth()
			.delete(`colors/${colorToEdit.id}`, colorToEdit)
			.then(res => {
				console.log(res.data);
				updateColors(colors.filter(item => item.id !== color.id));
				setUpdate(false);
			})
			.catch(err => {
				console.log(`Error! Does not delete`, err.response);
			});
	};

	return (
		<div className='colors-wrap'>
			<p className='colorsTitle'>colors	<button className='addColor-button' onClick={addColor}> + </button></p>
		
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className='delete'
								onClick={e => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className='color-box'
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>

			{addingColor && (
				<form onSubmit={saveAdded}>
					<legend>add color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToAdd({ ...colorToAdd, color: e.target.value })
							}
							value={colorToAdd.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToAdd({
									...colorToAdd,
									code: { hex: e.target.value },
								})
							}
							value={colorToAdd.code.hex}
						/>
					</label>
					<div className='button-row'>
						<button type='submit'>save</button>
						<button
							onClick={() => {
								setColorToAdd(false);
								setColorToAdd(initialColor);
							}}
						>
							cancel
						</button>
					</div>
				</form>
			)}

			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className='button-row'>
						<button type='submit'>save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}
			<div className='spacer' />
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

// export default ColorList;
