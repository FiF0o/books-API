import mongoose from 'mongoose'
require('dotenv').config()

mongoose.Promise = global.Promise


export const connect = () =>
  mongoose.connect(process.env.DEV_DB, {
    useMongoClient: true
  })