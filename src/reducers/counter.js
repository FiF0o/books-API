/**
 * Created by jonlazarini on 18/02/17.
 */
const initialState = {}

const counter = (state = initialState, action) => {
	console.log('REDU state: ', state)
	console.log('REDU action: ', action)
	switch (action.type) {
		case 'COUNT': {
			return {
				...state,
				id: action.id,
				value: action.value,
				completed: false
			}
		}

		default: {
			return state
		}
	}
}

export default counter
