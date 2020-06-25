import React from 'react';
import './Item.css';
import { ItemT } from '../App';

interface Item {
	data: ItemT;
}

function Item(props: Item) {
	const checkDifference = () => {};
	const { title, price, imageUrl } = props.data;
	return (
		<div className='card'>
			<h2>{title}</h2>
			<img className='product-image' src={imageUrl} alt='product' />
			<div className='item-footer'>
				<div className='price-section'>
					<p id='prevprice'>R${price}</p>
					<h2>R${price}</h2>
				</div>
				<p>updated in: 10/08/2020</p>
			</div>
		</div>
	);
}

export default Item;
