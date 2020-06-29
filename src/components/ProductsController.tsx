import React, { useState, useEffect } from 'react';
import { Items } from '../App';
import CardArray from './cardArray';
import { groupBy } from '../utils/utils';

const ProductsController: Function = ({ items }: Items): JSX.Element[] => {
	const [productSections, setProductSections] = useState<object[]>([]);
	const [domains, setDomains] = useState<string[]>([]);

	useEffect(() => {
		setTitles();
	}, [items]);

	const setTitles = () => {
		if (items.length < 1) {
			return;
		}
		const groups = groupBy(items, 'domain');
		const stringDomains = Object.keys(groups);
		const grpArray = stringDomains.map((domain) => {
			return [...groups[domain]];
		});
		setDomains(stringDomains);
		setProductSections(grpArray);
	};

	return productSections.map((items, i) => (
		<CardArray key={i} domain={domains[i]} items={items} />
	));
};

export default ProductsController;
