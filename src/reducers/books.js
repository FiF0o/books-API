import {initialState} from '../initialState'

const books = (state = initialState.books, action) => {
	switch (action.type) {
		case 'ADD_BOOK': {
			return [
				...state,
				{...action.payload}
			]
		}

		default: {
			return state
		}
	}
}

export default books
