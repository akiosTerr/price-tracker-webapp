import React, {
	useState,
	useLayoutEffect,
	useRef,
	useReducer,
	useEffect,
} from 'react';

import './component-style/addItem.css';

enum Visibility {
	visible = 'block',
	invisible = 'none',
}

const initialVisbility: Visibility = Visibility.invisible;

const init = (initialVisbility: Visibility) => {
	return { visibility: initialVisbility };
};

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'turnOn':
			return { visibility: Visibility.visible };

		case 'turnOff':
			return { visibility: Visibility.invisible };

		case 'toggle':
			return {
				visibility:
					state.visibility === Visibility.visible
						? Visibility.invisible
						: Visibility.visible,
			};

		default:
			break;
	}
};

const AddItem = () => {
	const currentVisibility: Visibility = Visibility.invisible;
	const addItemEle = useRef<HTMLDivElement>(null);

	const toogleOn = () => {
		dispatch({ type: 'turnOn' });
	};
	const toogleDown = () => {
		dispatch({ type: 'turnOff' });
	};
	const toggle = () => {
		dispatch({ type: 'toggle' });
	};

	const [state, dispatch] = useReducer(reducer, initialVisbility, init);

	// useLayoutEffect(() => {
	// 	if (addItemEle.current === null) return;
	// 	addItemEle.current.style.display = visibility;
	// }, [visibility]);

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<div ref={addItemEle} className={`additem`}>
			<h3>hello add Item</h3>
			<input type='text' />
			<button onClick={toogleOn}>On</button>
			<button onClick={toogleDown}>Off</button>
			<button onClick={toggle}>toggle</button>
		</div>
	);
};

export default AddItem;
