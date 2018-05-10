import xs from 'xstream'

import checkout from './checkout'


export default (sources) => {
	const sinks = {}
	const $checkout = checkout(sources)

	sinks.REDUX_ACTION = xs.merge(
		$checkout.REDUX_ACTION,
	).debug('action$')

	return sinks
}
