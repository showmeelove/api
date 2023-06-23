import { WaitlistService } from "@services/waitlist.service";
import { NextFunction, Request, Response } from "express";
import { emailVerifier } from "@/utils/email_verifier";

export class WaitlistController {

  private waitlistService = new WaitlistService();

  public addToWaitlist = async (request: Request, response: Response, next: NextFunction) => {
    try{
      let { email } = request.body

      if(!email) throw new Error(`400|Email Required.|`)

      if(!await emailVerifier.VerifyEmail(email)) throw new Error(`400|Email address does not exist.|`)

      if(await this.waitlistService.addToWaitlist$(email)){
        response.status(201).json({ message: 'Email Added to Waitlist.' });
      }else{
        response.status(400).json({ message: 'An Error Occurred!' });
      }
     
    }
    catch(e: any){
      next(e);
    }
  };

}