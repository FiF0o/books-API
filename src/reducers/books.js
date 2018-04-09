
import {initialState} from '../initialState'
import {assoc, compose} from 'ramda'


//TODO Update DB where linkImg & linkUrl are link_img, link_url or transform them
const books = (state = initialState.books, action) => {
	switch (action.type) {
		case 'FETCH_BOOKS': {
			return state
		}
		case 'FETCH_BOOKS_SUCCESS': {
			return {
				...state,
				bookList: [
					...action.payload
				],
			}
		}
		case 'POST_BOOK': {
			return {
				...state,
				book: {
					title: action.title,
					genre: action.genre,
					author: action.author,
					bookType: action.bookType,
					description: action.description,
					description: action.description,
					linkBuy: action.linkBuy,
					linkBuy: action.linkBuy,
					linkImg: action.linkImg,
				}
			}
		}
		case
		'POST_BOOK_SUCCESS',
		'WS_ADD_BOOK': {
			return compose(
				assoc('book', {}),
				assoc('bookList', [...state.bookList, {...action.payload}])
			)(state)
		}
		default: {
			return state
		}
	}
}


//TODO Combine reducers: book & bookList
export default books
