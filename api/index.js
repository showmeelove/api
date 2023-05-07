const { log, errorProcessing } = require('./core/debuggers.js')
const { bootstrap } = require('./bootstrap')
const cors = require("cors");

require('dotenv').config()

const express = require('express')


const app = express()
const PORT = 8181 || process.env.PORT
const routes = require(`./${process.env.VERSION}/routes/index.js`)
const connect_to_db = require('./core/database.js')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`./${process.env.VERSION}/public`))

bootstrap(app, routes, process.env.VERSION)

connect_to_db()

app.use((request, response, next) => {
  next({
    errorCode: 404,
    errorMessage: {
      message: 'Invalid Endpoint'
    }
  })
})

app.use((error, request, response, next) => {
  if(error instanceof Error) error = errorProcessing(error)
  const statusCode = parseInt((error.errorCode) ? error.errorCode : 500)
  const statusMessage = (error.errorMessage) ? error.errorMessage : { message: 'Internal Server Error' }
  response.status(statusCode).json(statusMessage)
})


// app.listen(PORT, connect_to_db(), () => {
//   log(`App listening on port: ${PORT}`)
// })

module.exports = app