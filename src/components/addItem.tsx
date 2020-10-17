import React, { useEffect } from 'react';
import { Visibility } from './actions/ToggleAddItem';
import './component-style/addItem.css';

interface VisiProp {
	visibility: Visibility;
}

const AddItem = (props: VisiProp) => {
	const submitItem = () => {
		console.log('submit Item');
	};

	useEffect(() => {
		console.log(props.visibility);
	}, [props.visibility]);

	return (
		<div className={`addItemContainer ${props.visibility}`}>
			<h3>Add Item</h3>
			<form className='addItemForm' onSubmit={submitItem}>
				<label htmlFor='product-name'>product name</label>
				<input name='product-name' type='text' />
				<label htmlFor='xpath'>xpath</label>
				<input name='xpath' type='text' />
				<label htmlFor='imageUrl'>image URL</label>
				<input name='imageUrl' type='text' />
				<input className='submit-item' value='ADD ITEM' type='submit' />
			</form>
		</div>
	);
};

export default AddItem;
