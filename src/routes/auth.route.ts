import { AuthController } from "@/controllers/auth.controller";
import { ResendOTPDto } from "@/dtos/otp.dto";
import { UserSignInDto, UserSignUpStep1Dto, UserSignUpStep2Dto, VerifyEmailDto } from "@/dtos/user.dto";
import { IRoute } from "@/interfaces/routes.interface";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";
import { Router } from "express";

export class AuthRoute implements IRoute {
  public path = '/auth'
  public router = Router()
  private auth = new AuthController()

  constructor(){
    this.initializeRoutes()
  }

  private initializeRoutes(){
    this.router.post(`${this.path}/signin`, ValidationMiddleware(UserSignInDto), this.auth.logIn)
    this.router.post(`${this.path}/signup/step/1`, ValidationMiddleware(UserSignUpStep1Dto), this.auth.signUpStep1)
    this.router.post(`${this.path}/signup/step/2`, ValidationMiddleware(UserSignUpStep2Dto), this.auth.signUpStep2)
    this.router.post(`${this.path}/verifyemail`, ValidationMiddleware(VerifyEmailDto), this.auth.verifyEmail)
    this.router.post(`${this.path}/resendotp`, ValidationMiddleware(ResendOTPDto), this.auth.resendOTP)
  }
}