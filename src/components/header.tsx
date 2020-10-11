import React from 'react';
import { MdNotifications } from 'react-icons/md';

const Header = () => {
	return (
		<header className='App-header'>
			<h1 className='Title'>Price Tracker</h1>
			<div className='side-header'>
				<div className='notificationbell-container'>
					<p>3</p>
					<MdNotifications id='notification-bell'></MdNotifications>
				</div>
				<button className='header-button'>
					<p>ADD PRODUCT</p>
				</button>
			</div>
		</header>
	);
};

export default Header;
