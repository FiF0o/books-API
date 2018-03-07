const initialState = {}

const counter = (state = initialState, action) => {
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
