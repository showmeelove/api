import { User } from "@/interfaces/user.interface";
import { AuthService } from "@/services/auth.service";
import { generateOTP } from "@/utils/otp_generator";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  private auth$ = new AuthService()

  public verifyEmail = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let { email, otp } = request.body
      await this.auth$.verifyEmail$(email, otp)
      response.status(200).json({ message: "Email has been verified." })
    }
    catch(e){
      next(e)
    }
  }

  public resendOTP = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let { email } = request.body
      await this.auth$.resendOTP$(email)
      response.status(200).json({ message: "OTP resent" })
    }
    catch(e){
      next(e)
    }
  }

  public logIn = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let data = request.body
      let user = await this.auth$.logIn$(data)
      response.status(200).json({ data: user, message: "Logged In" })
    }
    catch(e){
      next(e)
    }
  }

  public signUpStep1 = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let data = request.body
      let user = await this.auth$.completeSignUp(1, data)
      response.status(200).json({ data: user, message: "Signup Step 1 Completed" })
    }
    catch(e: any){
      next(e)
    }
  }

  public signUpStep2 = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let data = request.body
      let user = await this.auth$.completeSignUp(2, data)
      response.status(200).json({ data: user, message: "Signup Step 2 Completed" })
    }
    catch(e){
      next(e)
    }
  }

}