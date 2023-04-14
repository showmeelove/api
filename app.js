const { log } = require('./src/core/debuggers')
const { bootstrap } = require('./bootstrap')

require('dotenv').config()

const app = require('express')()
const PORT = 8181 || process.env.PORT

const routes = require(`./src/${process.env.VERSION}/routes`)

bootstrap(app, routes, process.env.VERSION)

app.listen(PORT, () => {
  log(`App listening on port: ${PORT}`)
})