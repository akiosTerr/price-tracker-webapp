import React, { useReducer } from 'react';
import { MdNotifications } from 'react-icons/md';
import AddItem from './addItem';
import { reducer, initialVisbility, init } from './actions/ToggleAddItem';

const Header = () => {
	const [visibilityState, dispatch] = useReducer(
		reducer,
		initialVisbility,
		init
	);

	const toggle = () => {
		dispatch({ type: 'toggle' });
	};

	return (
		<header className='App-header'>
			<h1 className='Title'>Price Tracker</h1>
			<div className='side-header'>
				<div className='notificationbell-container'>
					<p>3</p>
					<MdNotifications id='notification-bell'></MdNotifications>
				</div>
				<button onClick={toggle} className='header-button'>
					<p>ADD ITEM</p>
				</button>
				<AddItem visibility={visibilityState.visibility} />
			</div>
		</header>
	);
};

export default Header;
