const createActionCreator = (type) => (halfAction) => {
	if (typeof halfAction !== 'object') {
		throw new Error('The first argument should be an object')
	}
	halfAction.type = type
	return halfAction
}

export default new Proxy({}, {
	get: (actionCreators, type) => {
		let actionCreator = actionCreators[type]
		if (actionCreator) {
			return actionCreator
		}
		else {
			throw new Error(`Action type "${type}" doesn't exist`)
		}
	},
	set: (actionCreators, type) => {
		let actionCreator = actionCreators[type]
		if (actionCreator) {
			throw new Error(`Action type "${type}" is already defined`)
		}
		else {
			actionCreator = createActionCreator(type)
			actionCreator.toString = () => (type)
			actionCreators[type] = actionCreator
			return true
		}
	},
})
