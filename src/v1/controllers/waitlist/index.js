'use strict'

const { errorHandling } = require('../../../core/debuggers')
let emailValidator = require('email-validator-pro')
let validator = new emailValidator()
const doesEmailExist = require('does-email-exist')


async function addToWaitlist(request, response, next){
  try {

    console.log(validator.isValidAddress(request.body.email))

    const checkEmail = await doesEmailExist.check(request.body.email)
    console.log(checkEmail)

    response.status(200).send('Added')
    
  } catch (error) {
    next(new Error(error.stack))
  }
}

module.exports = {
  addToWaitlist
}