const dotenv =require('dotenv')

dotenv.config()

// console.log(process.env)

// const SERVER_PORT = 8000

module.exports = {
  SERVER_PORT,
  SERVER_HOST
} = process.env