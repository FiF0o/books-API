require('dotenv').config()
export const config = {
  expireTime: '30d',
  db: {
    url: process.env.DEV_DB
  },
  secrets: {
  }
}