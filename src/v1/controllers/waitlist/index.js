'use strict'

const { errorHandling } = require('../../../core/debuggers')
const { getEmailTemplate } = require('../../../core/template')
let emailValidator = require('email-validator-pro')
let validator = new emailValidator()
const doesEmailExist = require('does-email-exist')

require('dotenv').config()

const nodemailer = require('nodemailer')
const { Waitlist } = require('./schemas')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: `${process.env.EMAIL_USERNAME}`,
      pass: `${process.env.EMAIL_PASS}`
  }
});



async function addToWaitlist(request, response, next){
  try {

    if(!request.body.email) errorHandling(`400|Please enter email address.|`)

    let existingUser = await Waitlist.findOne({ email: request.body.email })

    if(existingUser != null) errorHandling(`400|Email already exists!.|`)

    let mailOptions = {
      from: `Showmeelove ${process.env.EMAIL_USERNAME}`,
      to: `${request.body.email}`,
      subject: ' Thank You for Joining the Waitlist for Showmeelove!',
      html: await getEmailTemplate({
        name: 'Abideen'
      })
    };
  

    const isEmailValid = validator.isValidAddress(request.body.email)


    if(isEmailValid){
      
      transporter.sendMail(mailOptions, async function(error, info){
        if(error){
            errorHandling(`503|Service Unavailable.|`)
        }else{

            let user = new Waitlist({
              email: request.body.email
            })

            await user.save()

            response.status(200).json({ message: 'Email added successfully' })
        }
    });
    

    }else{
      errorHandling(`400|Email Invalid.|`)
    }



    
  } catch (error) {
    next(new Error(error.stack))
  }
}

module.exports = {
  addToWaitlist
}