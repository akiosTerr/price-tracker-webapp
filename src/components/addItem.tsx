import React, { useEffect } from 'react';
import { Visibility } from './actions/ToggleAddItem';
import './component-style/addItem.css';

interface VisiProp {
	visibility: Visibility;
}

const AddItem = (props: VisiProp) => {
	useEffect(() => {
		console.log(props.visibility);
	}, [props.visibility]);

	return (
		<div className={`addItemContainer ${props.visibility}`}>
			<h3>Add Item</h3>
			<input type='text' />
		</div>
	);
};

export default AddItem;
