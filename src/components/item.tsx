import React, { useState, useEffect } from 'react';
import { convertToFloat } from '../utils/utils';
import api from '../services/ptrackr-api';
import { VscLoading } from 'react-icons/vsc';
import { FiExternalLink } from 'react-icons/fi';
import './component-style/Item.css';
import { ItemT } from '../App';

interface Item {
	item: ItemT;
}

function Item(props: Item) {
	const {
		id,
		title,
		current_pricetag,
		previous_pricetag,
		imageURL,
		link,
	} = props.item;
	const [currentPt, setCurrentPT] = useState<string>();
	const [previousPt, setPreviousPT] = useState<string>();
	const [priceChange, SetPriceChange] = useState<string>();
	const [animState, setAnimState] = useState<string>();
	const [updateStatus, setUpdateStatus] = useState<boolean>(false);

	const ptStyle = {
		color: priceChange,
	};

	const UpdateItem = () => {
		if (updateStatus) {
			console.log('negated');
			return;
		} else {
			setAnimState('spinning-anim');
		}
		setUpdateStatus(true);
		api
			.get(`/products/${id}/getPrice`)
			.then((res) => {
				const response = {
					type: 'response',
					data: res.data,
				};
				console.log(response);
				const data = res.data;

				if (data.priceChange === true) {
					console.log('new price received');
					setCurrentPT(data.newPrice);
					if (data.lastPrice) {
						setPreviousPT(data.lastPrice);
					}
				} else {
					console.log('no price changes');
					console.log(data);
				}
				setAnimState('');
				setUpdateStatus(false);
			})
			.catch((err) => {
				console.log(err);
				return false;
			});
	};

	const calcPriceDifference = () => {
		const [current, previous] = convertToFloat([
			current_pricetag,
			previous_pricetag,
		]);
		if (current < previous) {
			SetPriceChange('#17ee03');
		} else if (current === previous || previous == null) {
			SetPriceChange('white');
		} else {
			SetPriceChange('red');
		}
		setCurrentPT(current);
		setPreviousPT(previous);
	};

	useEffect(() => {
		calcPriceDifference();
	}, [props]);

	const goToLink = () => {
		console.log('gotolink');
	};

	// todo: adjust product-image css to be a fixed size image
	return (
		<div className='card'>
			<div className='card-header'>
				<a target='_blank' href={link}>
					<FiExternalLink id='externalLinkIcon' />
				</a>
				<p className='product-title'>{title}</p>
				<button onClick={UpdateItem}>
					<VscLoading id='loadingIcon' className={`${animState}`} />
				</button>
			</div>

			<img className='product-image' src={imageURL} alt='product' />
			<div className='item-footer'>
				<div className='price-section'>
					<p>R$ {previousPt}</p>
					<h2 style={ptStyle}>R$ {currentPt}</h2>
				</div>
				<p>updated in: 10/08/2020</p>
			</div>
		</div>
	);
}

export default Item;
