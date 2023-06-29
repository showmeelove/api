import nodemailer, { Transporter, createTransport } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { EMAIL_USERNAME, EMAIL_PASS } from "@config"
import Mail from "nodemailer/lib/mailer"
import { generateEmail } from "@templates/email_template"
import { IEmailOptions } from "@interfaces/email.interface"

const options : SMTPTransport.Options = {
  service: 'gmail',
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASS
  }
}



class EmailService {
  private transport: Transporter<any>

  constructor(){
    this.transport = createTransport(options)
  }

  public async sendMail(data: IEmailOptions, type: "waitlist" | "login" | "otp" | "email verification" | "signup") {
    let subject = ""

    switch(type){
      case 'waitlist':
        subject = "Thank you for joining the Waitlist!!!"
        break;
      case 'login':
        subject = "Login Confirmation!!"
        break;
      case 'otp':
        subject = " OTP Code"
        break;
      case 'email verification':
        subject = "Your Email has been Verified!!"
        break;
      case 'signup':
        subject = "Welcome to Showmeelove!!"
        break;
    }

    const mailOptions: Mail.Options = {
      from: `Showmeelove ${EMAIL_USERNAME}`,
      to: '',
      subject: subject,
      html: generateEmail(data, type)
    }

    mailOptions.to = data.email
    var sent = false 


    try {
      let mail = await this.transport.sendMail(mailOptions);
      console.log(mail)
      return true;
    } catch (error) {
      console.log(error)
      return false; 
    }

  }
}

export const emailService = new EmailService()