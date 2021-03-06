import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';

const initialColor = {
	color: '',
	code: { hex: '' }
};

export const ColorList = ({ colors, updateColors }) => {
	console.log(colors);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
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
			})
			.catch(err => {
				console.log(`Error! Does not delete`, err.response);
			});
	};

	return (
		<div className='colors-wrap'>
			<p>colors</p>
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
									code: { hex: e.target.value }
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
