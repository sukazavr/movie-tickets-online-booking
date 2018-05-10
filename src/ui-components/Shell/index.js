import React from 'react'
import FlexView from 'react-flexview'

import 'sanitize.css/sanitize.css'
import 'react-tippy/dist/tippy.css'
import 'react-flexview/lib/flexView.css'

import { createReactions } from '../../modules/reactions'
import { definePoj, entryPoj } from '../../modules/redux-poj'

import Seats from '../Seats'
import Sidebar from '../Sidebar'
import $ from './style'


export const Shell = definePoj({
	id: 'Shell',
	pojes: {
		init: ({ add }) => {
			add('seats', Seats)
			add('sidebar', Sidebar)
		},
	},
	asset: createReactions({
		reset: null,
	}),
	view: ({ pojesIndex: { seats, sidebar }, asset: { reset } }) => {
		return (
			<FlexView className={$.shell}>
				<FlexView column className={$.container}>
					<div className={$.header}>
						<h1>Movie Tickets Online Booking</h1>
						<h2>A Star Wars Story The IMAX 2D Experience</h2>
					</div>
					<FlexView>
						<FlexView column grow={1}>
							<div className={$.screen}>Screen</div>
							<FlexView column>{seats}</FlexView>
							<FlexView column hAlignContent='center' marginTop={20}>
								<span className={$.reset} onClick={reset}>Reset selection</span>
							</FlexView>
						</FlexView>
						<FlexView column width={300} shrink={0} marginLeft={20}>
							{sidebar}
						</FlexView>
					</FlexView>
				</FlexView>
			</FlexView>
		)
	}
})

export default () => entryPoj('shell', Shell)
