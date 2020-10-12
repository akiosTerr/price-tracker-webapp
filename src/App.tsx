import React, { useState, useEffect } from 'react';
import { getFormatedDomains } from './utils/utils';
import { BrowserRouter, Route } from 'react-router-dom';
import api from './services/ptrackr-api';
import ProductsController from './components/ProductsController';
import Login from './components/login';
import './App.css';
import Header from './components/header';

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
			const serializedItems = getFormatedDomains(res.data);
			setItems(serializedItems);
		});
	}, []);

	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Route
					exact
					path='/'
					render={() => <ProductsController items={items} />}
				/>
				<Route path='/login' component={Login} />
			</BrowserRouter>
		</div>
	);
}

export default App;
