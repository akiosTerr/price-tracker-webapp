import React, { useState, useEffect } from 'react';
import { convertToFloat, getDate } from '../utils/utils';
import api from '../services/ptrackr-api';
import { VscLoading } from 'react-icons/vsc';
import { FiExternalLink } from 'react-icons/fi';
import './component-style/Item.css';
import { ItemT } from '../App';
import { validateResponse, ValidatedResponse } from './utils/utils';

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
	const [updatedAt, setUpdatedAt] = useState<string>(getDate());
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

	const updateData = (response: ValidatedResponse) => {
		if (response.update) {
			setCurrentPT(response.newPrice);
			setPreviousPT(response.lastPrice);
		} else {
			if (response.error !== undefined) {
				console.log('error found');
				console.log(response.error);
			} else {
				console.log('no price changes');
			}
		}
		setUpdatedAt(getDate());

		endUpdate();
	};

	const getItemData = () => {
		startUpdate();
		api
			.get(`/products/${id}/getPrice`)
			.then((res) => {
				const data = res.data;
				const response = validateResponse(data);
				updateData(response);
			})
			.catch((err) => {
				console.log(err);
				return false;
			});
	};

	useEffect(() => {
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
		calcPriceDifference();
	}, [current_pricetag, previous_pricetag]);

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
				{/* <p>{`updated in: ${updatedAt}`}</p> */}
			</div>
		</div>
	);
}

export default Item;
