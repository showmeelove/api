'use strict'
require('dotenv').config()

function getCurrentVersion(request, response){
  response.status(200).json({ version: `${process.env.VERSION}` })
}

module.exports = getCurrentVersion