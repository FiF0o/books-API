import {initialState} from '../initialState'

const books = (state = initialState.books, action) => {
	switch (action.type) {
		case 'ADD_BOOK': {
			return [
				...state,
				{...action.payload}
			]
		}

		case 'FETCH_BOOKS_SUCCESS': {
			return [
				...state,
			]
		}

		default: {
			return state
		}
	}
}

export default books
