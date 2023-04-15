const mongoose = require('mongoose')

const signInSchema = new mongoose.Schema({

})

const signUpSchema = new mongoose.Schema({

})

const signIn = mongoose.model('Signin', signInSchema)
const signUp = mongoose.model('Signup', signUpSchema)


module.exports = {
  signIn,
  signUp
}