import React, { useState, useEffect } from 'react';
import api from '../services/ptrackr-api';
import { VscLoading } from 'react-icons/vsc';
import { FiExternalLink } from 'react-icons/fi';
import './component-style/Item.css';
import { ItemT } from '../App';
import { Response } from './utils/utils';

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
		createdAt,
	} = props.item;

	const [currentPt, setCurrentPT] = useState<string>();
	const [previousPt, setPreviousPT] = useState<string | undefined>();
	const [updatedAt, setUpdatedAt] = useState<string>(createdAt);
	const [priceChange, SetPriceChange] = useState<string>();
	const [animState, setAnimState] = useState<string>();
	const [updateStatus, setUpdateStatus] = useState<boolean>(false);

	const ptStyle = {
		color: priceChange,
	};

	const endUpdate = () => {
		setAnimState('');
		setUpdateStatus(false);
	};

	const startUpdate = () => {
		if (updateStatus) {
			console.log('negated');
			return;
		} else {
			setAnimState('spinning-anim');
			setUpdateStatus(true);
		}
	};

	const updateData = (response: Response) => {
		if (response.priceChange) {
			setCurrentPT(response.newPrice);
			setPreviousPT(response.lastPrice);
			setUpdatedAt(response.createdAt);
		} else {
			if (response.status === 0) {
				console.log('error found');
				console.log(response.errorData);
			} else {
				console.log('no price changes');
			}
		}
		endUpdate();
	};

	const getItemData = () => {
		startUpdate();
		api
			.get(`/products/${id}/getPrice`)
			.then((res) => {
				const data = res.data;
				updateData(data);
			})
			.catch((err) => {
				console.log(err);
				return false;
			});
	};

	useEffect(() => {
		const calcPriceDifference = () => {
			if (currentPt === previousPt || previousPt == null) {
				SetPriceChange('white');
			} else if (current_pricetag < previousPt) {
				SetPriceChange('#17ee03');
			} else {
				SetPriceChange('red');
			}
		};
		calcPriceDifference();
	}, [currentPt, previousPt]);

	useEffect(() => {
		setCurrentPT(current_pricetag);
		setPreviousPT(previous_pricetag);
	}, []);

	// todo: adjust product-image css to be a fixed size image

	// todo: update date of price update
	return (
		<div className='card'>
			<div className='card-header'>
				<a target='_blank' rel='noopener noreferrer' href={link}>
					<FiExternalLink id='externalLinkIcon' />
				</a>
				<p className='product-title'>{title}</p>
				<button onClick={getItemData}>
					<VscLoading id='loadingIcon' className={`${animState}`} />
				</button>
			</div>

			<img className='product-image' src={imageURL} alt='product' />
			<div className='item-footer'>
				<div className='price-section'>
					{previousPt !== undefined ? <p>R${previousPt}</p> : <></>}
					<h2 style={ptStyle}>R$ {currentPt}</h2>
				</div>
				<p>{updatedAt}</p>
			</div>
		</div>
	);
}

export default Item;
