import React, { useState, useEffect } from 'react';
import { Items } from '../App';
import { title } from 'process';

const ProductsController: Function = (props: Items): JSX.Element[] => {
	const [productSections, setProductSections] = useState<string[]>([]);

	const setTitles = () => {
		const urls = props.items.map((item) => {
			return item.link;
		});

		const titles = urls.map((url) => {
			const title = url.match(/(?<=\.)[\w.]+/);
			if (title) {
				return title[0];
			}
			return String(title);
		});

		setProductSections(titles);
	};

	useEffect(() => {
		setTitles();
	}, []);

	return productSections.map((urls) => <h1>{urls}</h1>);
};

export default ProductsController;
