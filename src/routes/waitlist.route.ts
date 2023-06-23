import { WaitlistController } from "@/controllers/waitlist.controller";
import { WaitlistDto } from "@/dtos/waitlist.dto";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";
import { IRoute } from "@interfaces/routes.interface";
import { Router } from "express";

export class WaitlistRoute implements IRoute {
  public path = "/waitlist"
  public router = Router()
  private waitlist = new WaitlistController()

  constructor(){
    this.initializeRoutes()
  }

  private initializeRoutes(){
    this.router.post(`${this.path}`, ValidationMiddleware(WaitlistDto), this.waitlist.addToWaitlist)
  }
}