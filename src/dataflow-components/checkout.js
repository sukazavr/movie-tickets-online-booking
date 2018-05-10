import xs from 'xstream'
import { set } from 'unchanged'
import dropRepeats from 'xstream/extra/dropRepeats'
import sampleCombine from 'xstream/extra/sampleCombine'

import T from '../modules/T'
import { scanMerge } from '../modules/utils'
import Seats from '../ui-components/Seats'
import Sidebar from '../ui-components/Sidebar'
import { Shell } from '../ui-components/Shell'
import { seats$, initialBookedSeats$ } from './data-seats'


const ticketPrice$ = xs.of(100)

export default (sources) => {
	const sinks = {}
	const { REDUX_ACTION, REACTIONS } = sources

	const $shell = REACTIONS.poj(Shell)
	const $seats = REACTIONS.poj(Seats)
	const $sidebar = REACTIONS.poj(Sidebar)

	const formatedSeats$ = scanMerge([
		[
			xs.combine(seats$, initialBookedSeats$),
			(_, [ seats, initialBookedSeats ]) => {
				return seats.map((seat, id) => Object.assign({
					id,
					isSelected: false,
					isBooked: initialBookedSeats.includes(id),
				}, seat))
			},
		],
		[
			$seats.select,
			(seats, [ , seatID ]) => {
				const seat = seats[seatID]
				if (seat) seats = set([ seatID, 'isSelected' ], true, seats)
				return seats
			},
		],
		[
			$seats.unselect,
			(seats, [ , seatID ]) => {
				const seat = seats[seatID]
				if (seat) seats = set([ seatID, 'isSelected' ], false, seats)
				return seats
			},
		],
		[
			$shell.reset,
			(seats) => seats.map((seat) => {
				seat.isSelected = false
				return seat
			}),
		],
		[
			$sidebar.buy,
			(seats) => seats.map((seat) => {
				if (seat.isSelected) {
					seat.isBooked = true
					seat.isSelected = false
				}
				return seat
			}),
		]
	], [])

	const basket$ = formatedSeats$
		.map((seats) => seats.filter((seat) => (seat.isSelected)))

	const isPaid$ = xs.merge(
		$sidebar.buy.mapTo(true),
		$seats.select.mapTo(false),
	)
		.startWith(false)

	const step$ = basket$
		.compose(sampleCombine(isPaid$))
		.map(([ basket, isPaid ]) => (isPaid ? 3 : basket.length ? 2 : 1))
		.compose(dropRepeats())


	const seatsToAction$ = formatedSeats$
		.map((seats) => T.SEATS_UPDATE({
			scopePoj: 'shell.seats',
			payload: seats,
		}))

	const basketToAction$ = xs.combine(basket$, ticketPrice$)
		.map(([ basket, ticketPrice ]) => T.BASKET_UPDATE({
			scopePoj: 'shell.sidebar',
			payload: {
				basketList: basket,
				price: (ticketPrice * basket.length),
			},
		}))
		.drop(1)

	const stepToAction$ = step$
		.map((step) => T.CHECKOUT_STEP({
			scopePoj: 'shell.sidebar',
			payload: step,
		}))
		.drop(1)

	sinks.REDUX_ACTION = xs.merge(
		stepToAction$,
		seatsToAction$,
		basketToAction$,
	)

	return sinks
}
