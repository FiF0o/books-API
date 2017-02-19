/**
 * Created by jonlazarini on 18/02/17.
 */
import { combineReducers } from 'redux'
import counter  from './counter'

const reducers = combineReducers({
	counter,
})
export default reducers
