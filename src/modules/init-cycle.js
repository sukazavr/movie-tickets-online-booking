import { run } from '@cycle/run'
import { reactionsDriver } from './reactions'
import { cycleMiddleware } from './init-store'


export default (main) => run(main, {
	REACTIONS: reactionsDriver,
	REDUX_STATE: cycleMiddleware.makeStateDriver(),
	REDUX_ACTION: cycleMiddleware.makeActionDriver(),
})
