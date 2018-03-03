import mongoose from 'mongoose'
import config from './config'


mongoose.Promise = global.Promise


export const connect = () =>
  mongoose.connect(config.db.url, {
    useMongoClient: true
  })