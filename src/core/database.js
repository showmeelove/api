'use strict'
const mongoose = require('mongoose')
const { log } = require('./debuggers')

require('dotenv').config()

async function connect_to_db(){
  mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })

  mongoose.connection.on('error', (error) => {
    log('Error Connecting to Database')
    log(error)
  })

  mongoose.connection.once('open', () => {
    log('Successfully connected to database')
  })
}


module.exports = connect_to_db