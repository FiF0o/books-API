import mongoose from 'mongoose'

export const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Books must have title']
  },
  booksCollection: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book'
  }],
  author: {
    type: String,
    required: true
  },
  genre: {
      type: String,
  },
  publisher: {
      type: String
  },
  description: {
      type: String
  },
  link_img: {
      type: String
  },
  link_buy: {
      type: String
  },
  create_date: {
      type: Date,
      default: Date.now
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false
  }
})

export const Books =  mongoose.model('books', booksSchema)