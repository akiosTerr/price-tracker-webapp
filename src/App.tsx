import React, { useState, useEffect } from 'react';
import { getDomains } from './utils/utils';
import api from './services/ptrackr-api';
import ProductsController from './components/ProductsController';
import './App.css';

export interface ItemT {
	id: number;
	title: string;
	current_pricetag: string;
	previous_pricetag?: string;
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
			const serializedItems = getDomains(res.data);

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
