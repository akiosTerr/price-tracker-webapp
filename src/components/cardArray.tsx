import React from 'react';
import Item from './item';
import { Items } from '../App';

const CardArray: Function = (props: Items): JSX.Element => {
	return (
		<div className='product-section'>
			<hr />
			<h2>Americanas.com.br</h2>
			<hr />
			<div className='product-list'>
				{props.items.map((item) => (
					<Item data={item} />
				))}
			</div>
		</div>
	);
};

export default CardArray;
