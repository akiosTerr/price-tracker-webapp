import React from 'react';
import './Item.css';
import { ItemT } from '../App';

interface Item {
	data: ItemT;
}

function Item(props: Item) {
	//check difference between old and current priceyag
	// and
	//change the color of the current pricetag to green or red
	const checkDifference = () => {};
	// format pricetags to include only numbers and comma
	// adjust product-image css to be a fixed size image
	const { title, current_pricetag, previous_pricetag, imageURL } = props.data;
	return (
		<div className='card'>
			<h2>{title}</h2>
			<img className='product-image' src={imageURL} alt='product' />
			<div className='item-footer'>
				<div className='price-section'>
					<p id='prevprice'>R${previous_pricetag}</p>
					<h2>R${current_pricetag}</h2>
				</div>
				<p>updated in: 10/08/2020</p>
			</div>
		</div>
	);
}

export default Item;
