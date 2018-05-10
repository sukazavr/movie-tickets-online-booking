import Poj from './Poj.js'
import PojScope from './PojScope.js'
import { setDefinition, isDefinition } from './Definition.js'
import { keepUpdatedPojState, attachStore, prevState as defaultState } from './store.js'


let entryReducers
const entryComponents = {}

export const definePoj = setDefinition
export const attachPojStore = attachStore

export const entryPoj = (key, definition, args) => {
	if (entryComponents[key]) {
		return entryComponents[key]
	}
	else {
		if (isDefinition(definition)) {
			const initialState = definition.getInitialState(args)
			const poj = new Poj(initialState, [], key)
			keepUpdatedPojState(key, poj)
			if (!entryReducers) entryReducers = []
			entryReducers.push({
				key,
				initialState,
				reducer: definition.reducer,
			})
			return entryComponents[key] = poj.component
		}
		else {
			return null
		}
	}
}

export const reducer = (state = defaultState, action) => {
	if (entryReducers && action.scopePoj) {
		const pojScope = new PojScope(action.scopePoj)

		let isChanged
		const possibleState = entryReducers.reduce((nextState, { key, reducer, initialState }) => {
			const prev = (state[key] || initialState)

			if (pojScope.canGoDown(key)) {
				const next = reducer(prev, action, pojScope)
				pojScope.plsGoUp()
				if (next !== prev) {
					nextState[key] = next
					if (!isChanged) isChanged = true
				}
				else {
					nextState[key] = prev
				}
			}
			else {
				nextState[key] = prev
			}

			return nextState
		}, {})
		return isChanged ? possibleState : state
	}
	else {
		return state
	}
}
