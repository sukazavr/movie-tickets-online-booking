import xs from 'xstream'


const layout = {
	A: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	B: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	C: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	D: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	E: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	F: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	G: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	H: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	I: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
	J: [ 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N' ],
}

const seats = Object.entries(layout).reduce((allSeats, [ row, seats ], x) => {
	x = x + 1
	allSeats.push.apply(allSeats, seats.map((_, y) => {
		y = y +1
		return {
			x, y,
			name: `Row / Seat ${row + y}`,
		}
	}))
	return allSeats
}, [])

const seatsAmount = seats.length
const randomBookedSeats = []
while (randomBookedSeats.length < 10) {
	const bookedSeatID = Math.floor(Math.random() * seatsAmount)
	if (randomBookedSeats.includes(bookedSeatID)) continue
	randomBookedSeats.push(bookedSeatID)
}

export const seats$ = xs.of(seats)
export const initialBookedSeats$ = xs.of(randomBookedSeats)
