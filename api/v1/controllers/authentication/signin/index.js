'use strict';

async function signIn(request, response , next){
  try {

    
  } catch (error) {
    next(new Error(error.stack))
  }
}

module.exports = {
  signIn
}