let unsubscribe
const entryPojes = []
const defaultSelector = (state) => (state.POJ)

export let prevState = {}

export const keepUpdatedPojState = (key, poj) => {
	entryPojes.push({ key, poj })
}

export const attachStore = (store, selector = defaultSelector) => {
	unsubscribe && unsubscribe()
	unsubscribe = store.subscribe(() => {
		const nextState = selector(store.getState())
		if (nextState !== prevState) {
			entryPojes.forEach(({ key, poj }) => {
				const state = nextState[key]
				if (state !== prevState[key]) {
					poj.setState(state)
				}
			})
			prevState = nextState
		}
	})
}
