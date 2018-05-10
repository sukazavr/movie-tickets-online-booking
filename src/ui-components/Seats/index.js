import cc from 'classcat'
import React from 'react'
import FlexView from 'react-flexview'
import { Tooltip } from 'react-tippy'

import T from '../../modules/T'
import { definePoj } from '../../modules/redux-poj'
import { createReactions } from '../../modules/reactions'

import $ from './style'


export default definePoj({
	id: 'Seats',
	state: {
		init: {
			seats: null,
		},
		reducer: {
			[T.SEATS_UPDATE]: (state, seats) => ({ seats }),
		},
	},
	asset: createReactions({
		select: (R, seatID) => () => R(seatID),
		unselect: (R, seatID) => () => R(seatID),
	}),
	view: ({ state: { seats }, asset: { select, unselect } }) => {
		if (!seats) return null
		return (
			<div className={$.seats}>
				{seats.map(({ id, x, y, name, isBooked, isSelected }) => {
					const props = {
						className: cc([
							$.seat,
							(isBooked && $.booked),
							(isSelected && $.selected),
						]),
					}
					if (!isBooked) {
						props.onClick = (isSelected ? unselect(id) : select(id))
					}
					return (
						<div key={id} style={{ gridColumn: y, gridRow: x }}>
							<Tooltip title={name}>
								<div {...props}/>
							</Tooltip>
						</div>
					)
				})}
			</div>
		)
	}
})
