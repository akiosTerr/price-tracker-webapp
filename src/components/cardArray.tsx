import React from 'react';
import Item from './item';
import { ItemT } from '../App';

interface ItemProps {
	itemdata: ItemT[];
	domain: string;
}

const CardArray: React.FC<ItemProps> = ({ itemdata, domain }): JSX.Element => {
	return (
		<div className='product-section'>
			<hr />
			<h2 className='product-section-title'>{domain}</h2>
			<hr />
			<div className='product-list'>
				{itemdata.map((item: ItemT) => (
					<Item key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

export default CardArray;
