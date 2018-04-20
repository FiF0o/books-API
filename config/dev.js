require('dotenv').config()
export const config = {
  expireTime: '30d',
  db: {
    url: process.env.PRISMA_DB_ENDPOINT,
    secret: process.env.PRISMA_DB_SECRET
  },
  secrets: {
  }
}