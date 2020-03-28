import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

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

	const addColor = () => {
		setAddingColor(true);
		setEditing(false);
	};

	const editColor = color => {
		setEditing(true);
		setAddingColor(false);
		setColorToEdit(color);
	};

	const saveAdded = e => {
		e.preventDefault();
		setAddingColor(false);
		axiosWithAuth()
			.post('colors', colorToAdd)
			.then(res => {
				console.log(res.data);
				updateColors(res.data);
				setUpdate(true);
			})
			.catch(err => {
				console.log(`Error! cannot add!`, err.response);
			});
	};

	const saveEdit = e => {
		e.preventDefault();
		setEditing(false);
		axiosWithAuth()
			.put(`colors/${colorToEdit.id}`, colorToEdit)
			.then(res => {
				console.log(res.data);
				updateColors([
					...colors.filter(item => item.id !== colorToEdit.id),
					colorToEdit,
				]);
			})
			.catch(err => {
				console.log(`Error! cannot edit!`, err.response);
			});
	};

	const deleteColor = color => {
		axiosWithAuth()
			.delete(`colors/${color.id}`)
			.then(res => {
				updateColors(colors.filter(item => item.id !== color.id));
			})
			.catch(err => {
				console.log(`Error! cannot delete!`, err.response);
			});
	};

	return (
		<div className='colors-wrap'>
			<p className='colorsTitle'>
				colors{' '}
				<button className='addColor-button' onClick={addColor}>
					+
				</button>
			</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span className='color-list'>
							<div
								className='color-box'
								style={{ backgroundColor: color.code.hex }}
							/>
							<span
								className='delete-x'
								onClick={e => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>
							<div className='color-text'>{color.color}</div>
						</span>
					</li>
				))}
			</ul>
			{addingColor && (
				<form className='add-color-form' onSubmit={saveAdded}>
					<legend>add</legend>
					<label>
						{/* color name: */}
						<input
							onChange={e =>
								setColorToAdd({ ...colorToAdd, color: e.target.value })
							}
							value={colorToAdd.color}
							placeholder='color'
						/>
					</label>
					<label>
						{/* hex code: */}
						<input
							onChange={e =>
								setColorToAdd({
									...colorToAdd,
									code: { hex: e.target.value },
								})
							}
							value={colorToAdd.code.hex}
							placeholder='#ffffff'
						/>
					</label>
					<div className='button-row'>
						<button type='submit'>save</button>
						<button
							onClick={() => {
								setAddingColor(false);
							}}
						>
							cancel
						</button>
					</div>
				</form>
			)}
			{editing && (
				<form className='edit-color-form' onSubmit={saveEdit}>
					<legend>edit</legend>
					<label>
						{/* color name: */}
						<input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
							placeholder='color'
						/>
					</label>
					<label>
						{/* hex code: */}
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value },
								})
							}
							value={colorToEdit.code.hex}
							placeholder='#ffffff'
						/>
					</label>
					<div className='button-row'>
						<button onClick={() => setEditing(false)}>cancel</button>
						<button type='submit'>save</button>
					</div>
				</form>
			)}
			{/* <div className='spacer' /> */}
			{/* stretch - build another form here to add a color */}
		</div>
	);
};

// export default ColorList;
