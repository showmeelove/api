'use strict';

async function signUp(request, response , next){
  try {

    
  } catch (error) {
    next(new Error(error.stack))
  }
}

module.exports = {
  signUp
}