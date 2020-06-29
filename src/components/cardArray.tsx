import React from 'react';
import Item from './item';
import { Items } from '../App';

const CardArray: Function = (props: any): JSX.Element => {
	const { items }: Items = props;
	const { domain } = props;

	return (
		<div className='product-section'>
			<hr />
			<h2>{domain}</h2>
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
