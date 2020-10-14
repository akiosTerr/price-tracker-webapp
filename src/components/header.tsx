import React from 'react';
import { MdNotifications } from 'react-icons/md';
import AddItem from './addItem';

const Header = () => {
	const toogleAddItem = () => {
		console.log('toogle add item on header');
	};
	return (
		<header className='App-header'>
			<h1 className='Title'>Price Tracker</h1>
			<div className='side-header'>
				<div className='notificationbell-container'>
					<p>3</p>
					<MdNotifications id='notification-bell'></MdNotifications>
				</div>
				<button onClick={toogleAddItem} className='header-button'>
					<p>ADD PRODUCT</p>
				</button>
				<AddItem />
			</div>
		</header>
	);
};

export default Header;
