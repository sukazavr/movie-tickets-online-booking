import React from 'react'
import FlexView from 'react-flexview'
import { set } from 'unchanged'

import T from '../../modules/T'
import { definePoj } from '../../modules/redux-poj'
import { createReactions } from '../../modules/reactions'
import $ from './style'


export default definePoj({
	id: 'Sidebar',
	state: {
		init: {
			step: 1,
			price: 0,
			basketList: [],
		},
		reducer: {
			[T.CHECKOUT_STEP]: (state, step) => set('step', step, state),
			[T.BASKET_UPDATE]: (state, { price, basketList }) => {
				state = set('basketList', basketList, state)
				state = set('price', price, state)
				return state
			},
		},
	},
	asset: createReactions({
		buy: null,
	}),
	view: ({ state: { step, price, basketList }, asset: { buy } }) => {
		return (step === 3)
			? <Success/>
			: (step === 2)
				? <Selected price={price} basketList={basketList} buy={buy}/>
				: <Invitation/>
	}
})

const Invitation = () => {
	return (
		<FlexView column vAlignContent='center' grow={1}>
			<h1>Select your seats</h1>
			<div className={$.arrow}/>
		</FlexView>
	)
}

const Success = () => {
	return (
		<FlexView column vAlignContent='center' grow={1}>
			<h1>Thank you!</h1>
			<h2>Your payment was processed successfully</h2>
		</FlexView>
	)
}

const Selected = ({ price, basketList, buy }) => {
	const tickets = basketList.map((seat, id) => (<li key={id}>{seat.name}</li>))
	const count = basketList.length
	const plural = (count > 1 ? 's' : '')
	return (
		<FlexView column>
			<FlexView column>
				<h1>{`You have selected ${count} seat${plural}`}</h1>
				<ol>{tickets}</ol>
			</FlexView>
			<FlexView column marginTop={30}>
				<h1>Payment</h1>
				<h2>{price} ₽</h2>
			</FlexView>
			<FlexView marginTop={20}>
				<button onClick={buy} className={$.btn}>
					{`Book ticket${plural}`}
				</button>
			</FlexView>
		</FlexView>
	)
}
