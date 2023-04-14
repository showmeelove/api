'use strict'

const { errorHandling } = require('../../../core/debuggers')


async function addToWaitlist(request, response, next){
  try {

    errorHandling(`400|Please send email.|`)

    response.status(200).send('Added')
    
  } catch (error) {
    next(new Error(error.stack))
  }
}

module.exports = {
  addToWaitlist
}