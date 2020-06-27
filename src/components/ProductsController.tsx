import React, { useState, useEffect } from 'react';
import { Items } from '../App';
import CardArray from './cardArray';

const ProductsController: Function = ({ items }: Items): JSX.Element[] => {
	const [productSections, setProductSections] = useState<string[]>([]);

	useEffect(() => {
		setTitles();
	}, [items]);

	const setTitles = () => {
		const url_id = items.map((item) => {
			return {
				link: item.link,
				id: item.id,
			};
		});
		console.log(url_id);

		const titles = url_id.map((url) => {
			const title = url.link.match(/(?<=\.)[\w.]+/);
			return String(title);
		});

		setProductSections(titles);
	};

	return productSections.map((urls) => <h1>{urls}</h1>);
};

export default ProductsController;
