import React, { useState, useEffect } from 'react';
import api from '../services/ptrackr-api';
import { VscLoading } from 'react-icons/vsc';
import { FiExternalLink } from 'react-icons/fi';
import './component-style/Item.css';
import { ItemT } from '../App';
import { Response } from './constants/interface';
import { dateTimeFormat, ifundefined } from './utils/utils';
import Colors from './constants/colors';

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

	const [currentPt, setCurrentPT] = useState<number | undefined>();
	const [previousPt, setPreviousPT] = useState<number | undefined>();
	const [updatedAt, setUpdatedAt] = useState<string>();
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
			getItemData();
		}
	};

	const updateData = (response: Response) => {
		if (response.priceChange) {
			priceUpdate(response.newPrice, response.lastPrice);
		} else {
			if (response.status === 0) {
				console.log('error found');
				console.log(response.errorData);
			} else {
				console.log('no price changes');
			}
		}
		dateUpdate(response.createdAt);
		endUpdate();
	};

	const getItemData = () => {
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

	const priceUpdate = (current: string, previous: string | undefined) => {
		setCurrentPT(
			ifundefined(
				current,
				() => Number(current),
				() => undefined
			)()
		);
		setPreviousPT(
			ifundefined(
				previous,
				() => Number(previous),
				() => undefined
			)()
		);
	};

	const dateUpdate = (date: string) => {
		const fdate = ifundefined(date, dateTimeFormat(date), () => undefined);
		setUpdatedAt(fdate());
	};

	useEffect(() => {
		const calcPriceDifference = () => {
			const pricetag = Number(currentPt);
			if (pricetag === previousPt || previousPt == null) {
				SetPriceChange(Colors.white);
			} else if (pricetag < previousPt) {
				SetPriceChange(Colors.green);
			} else {
				SetPriceChange(Colors.red);
			}
		};
		calcPriceDifference();
	}, [currentPt, previousPt]);

	useEffect(() => {
		priceUpdate(current_pricetag, previous_pricetag);
		dateUpdate(createdAt);
	}, [createdAt, current_pricetag, previous_pricetag]);

	// todo: adjust product-image css to be a fixed size image

	return (
		<div className='card'>
			<div className='card-header'>
				<p className='product-title'>{title}</p>
			</div>
			<div className='card-body'>
				<a target='_blank' rel='noopener noreferrer' href={link}>
					<FiExternalLink id='externalLinkIcon' />
				</a>
				<img className='product-image' src={imageURL} alt='product' />
				<button onClick={startUpdate}>
					<VscLoading id='loadingIcon' className={`${animState}`} />
				</button>
			</div>
			<div className='item-footer'>
				<div className='price-section'>
					{previousPt !== undefined ? <p>R${previousPt}</p> : <></>}
					{currentPt !== undefined ? (
						<h2 style={ptStyle}>R$ {currentPt}</h2>
					) : (
						<span>price unavailable</span>
					)}
				</div>
				<p>{updatedAt}</p>
			</div>
		</div>
	);
}

export default Item;
