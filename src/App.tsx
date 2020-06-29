import React, { useState, useEffect } from 'react';
import CardArray from './components/cardArray';
import api from './services/ptrackr-api';
import ProductsController from './components/ProductsController';
import './App.css';

export interface ItemT {
	id: number;
	title: string;
	current_pricetag: number;
	previous_pricetag?: number;
	link: string;
	domain: string;
	imageURL: string;
}

export interface Items {
	items: ItemT[];
}

function App() {
	const [items, setItems] = useState<ItemT[]>([]);
	useEffect(() => {
		api.get('products').then((res) => {
			console.log(res);
			const serializedItems = res.data.map((item: ItemT) => {
				item.domain = String(item.link.match(/(?<=\.)[\w.]+/));
				return item;
			});

			setItems(serializedItems);
		});
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<h1 className='Title'>Price Tracker</h1>
				<button className='header-button'>
					<p>ADD PRODUCT</p>
				</button>
			</header>
			{/* <CardArray items={items} /> */}
			<ProductsController items={items} />
		</div>
	);
}

export default App;
