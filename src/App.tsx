import React, { useState } from 'react';
import CardArray from './components/cardArray';
import ProductsController from './components/ProductsController';
import './App.css';

export interface ItemT {
	title: string;
	price: number;
	prevPrice?: number;
	link: string;
	imageUrl: string;
}

export interface Items {
	items: ItemT[];
}

function App() {
	const [items, setItems] = useState<ItemT[]>([
		{
			title: 'headphone',
			price: 13.99,
			link:
				'https://www.americanas.com.br/produto/31716174/headset-gamer-hyperx-cloud-stinger-hx-hscs-bk-na',
			imageUrl:
				'https://images-americanas.b2w.io/produtos/01/00/img/31716/1/31716175_1GG.jpg',
		},
		{
			title: 'Smart TV',
			price: 22.99,
			link:
				'https://www.americanas.com.br/produto/134241723/smart-tv-led-50-samsung-50ru7100-ultra-hd-4k-com-conversor-digital-3-hdmi-2-usb-wi-fi-visual-livre-de-cabos-controle-remoto-unico-e-bluetooth',
			imageUrl:
				'https://images-americanas.b2w.io/produtos/01/00/img/134544/9/134544919_1GG.jpg',
		},
		{
			title: 'Monitor para PC',
			price: 100.99,
			link:
				'https://www.magazineluiza.com.br/monitor-para-pc-philips-v-line-193v5lhsb2-185-led-widescreen-hd-hdmi-vga/p/224920100/in/mogm/',
			imageUrl:
				'https://a-static.mlcdn.com.br/618x463/monitor-para-pc-philips-v-line-193v5lhsb2-185-led-widescreen-hd-hdmi-vga/magazineluiza/224920100/86e3334491850636bc6bdfe161029018.jpg',
		},
	]);

	return (
		<div className='App'>
			<header className='App-header'>
				<h1 className='Title'>Price Tracker</h1>
				<button className='header-button'>
					<p>ADD PRODUCT</p>
				</button>
			</header>
			<ProductsController items={items} />
		</div>
	);
}

export default App;
