import mongoose from 'mongoose'

export const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Genres must have title']
  },
  create_date: {
      type: Date,
      default: Date.now
  },
})

export const Genres =  mongoose.model('genres', genresSchema)
