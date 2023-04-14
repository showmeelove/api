const { log, errorProcessing } = require('./src/core/debuggers')
const { bootstrap } = require('./bootstrap')

require('dotenv').config()

const app = require('express')()
const PORT = 8181 || process.env.PORT

const routes = require(`./src/${process.env.VERSION}/routes`)

bootstrap(app, routes, process.env.VERSION)


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

app.listen(PORT, () => {
  log(`App listening on port: ${PORT}`)
})