import React, { useState, useEffect, useRef } from 'react';
import { convertToFloat } from '../utils/utils';
import './Item.css';
import { ItemT } from '../App';

interface Item {
	item: ItemT;
}

function Item(props: Item) {
	const { title, current_pricetag, previous_pricetag, imageURL } = props.item;
	const [currentPt, setCurrentPT] = useState<string>();
	const [previousPt, setPreviousPT] = useState<string>();
	const [priceChange, SetPriceChange] = useState<string>();

	const ptStyle = {
		color: priceChange,
	};

	const calc = () => {
		const [current, previous] = convertToFloat([
			current_pricetag,
			previous_pricetag,
		]);
		if (current < previous) {
			SetPriceChange('green');
		} else if (current === previous || previous == null) {
			SetPriceChange('white');
		} else {
			SetPriceChange('red');
		}
		setCurrentPT(current);
		setPreviousPT(previous);
	};

	useEffect(() => {
		calc();
	}, [props]);
	// adjust product-image css to be a fixed size image
	return (
		<div className='card'>
			<p className='product-title'>{title}</p>
			<img className='product-image' src={imageURL} alt='product' />
			<div className='item-footer'>
				<div className='price-section'>
					<p>R$ {previousPt}</p>
					<h2 style={ptStyle}>R$ {currentPt}</h2>
				</div>
				<p>updated in: 10/08/2020</p>
			</div>
		</div>
	);
}

export default Item;
