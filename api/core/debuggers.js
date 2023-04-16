const fs = require('fs')

const log = (msg) => {
  console.log(msg)
}


const errorProcessing = (receivedErrorMessage) => {
  let errorMessage = receivedErrorMessage.message.split(':')[1]
  errorMessage = errorMessage.split('|')

  let errorObject = errorMessage.length

  if(errorObject <= 1) logErrorToFile(receivedErrorMessage)

  return {
    errorCode: (errorObject > 1) ? errorMessage[0] : 500,
    errorMessage: {
      message: (errorObject > 1) ? errorMessage[1] : 'Internal Server Error'
    }
  }
}

const errorHandling = (receivedErrorMessage) => {
  throw new Error(receivedErrorMessage)
}

const logErrorToFile = (receivedErrorMessage) => {
  fs.appendFileSync(`src/${process.env.VERSION}/error.log.txt`, new Date() + receivedErrorMessage + '\r\n')
}

module.exports = { 
  log,
  errorProcessing,
  errorHandling
}