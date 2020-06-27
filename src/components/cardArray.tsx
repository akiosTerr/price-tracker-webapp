import React from 'react';
import Item from './item';
import { Items } from '../App';

const CardArray: Function = ({ items }: Items): JSX.Element => {
	return (
		<div className='product-section'>
			<hr />
			<h2>americanas.com.br</h2>
			<hr />
			<div className='product-list'>
				{items.map((item) => (
					<Item key={item.id} data={item} />
				))}
			</div>
		</div>
	);
};

export default CardArray;
