import React, { useState, useEffect } from 'react';
import { Items, ItemT } from '../App';
import CardArray from './cardArray';
import { groupBy } from '../utils/utils';

const ProductsController = (props: Items) => {
	const [productSections, setProductSections] = useState<object[]>([]);
	const [domains, setDomains] = useState<string[]>([]);
	const items = props.items;

	// research useCallback hook & exhaustive-deps
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

	useEffect(() => {
		setTitles();
	}, [items]);

	const productElements = productSections.map((itemdatalist, i) => (
		<CardArray key={i} domain={domains[i]} itemdata={itemdatalist as ItemT[]} />
	));
	return <>{productElements}</>;
};

export default ProductsController;
