import { IError } from "@interfaces/error.interface"
import { NextFunction, Request, Response } from "express"
import { logger } from "@/utils/logger"

export class HttpException extends Error {
  public statusCode!: number;
  public statusMessage!: {
    message: string
  };

  constructor(public message: string) {
      super(message)
      // this.message = message
      this.errorResolver(message);
  }

  public errorResolver = (error: string) => {
      let errorMessage: string | any = error.split(':')[1] ? error.split(':')[1] : error.split("|")
      // let errorMessage: string[] =
      let errorObject: number = errorMessage.length;
      if (errorObject <= 1) {
          logger.error(500 + " Internal Server Error: " + error);
          this.statusCode = 500;
          this.statusMessage = { message: "Internal Server Error" };
      } else {
          this.statusCode = parseInt(errorMessage[0]);
          this.statusMessage = { message: errorMessage[1] };
      }

      return {
        statusCode: this.statusCode,
        statusMessage: this.statusMessage
      }
  };

}


export const ErrorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      if(error instanceof Error) error = new HttpException(error.message)
      console.log(error)
      logger.error(`[${error.statusCode}] ${req.method} ${req.path} ${error.statusMessage.message}`)
      const statusCode = (error.statusCode) ? parseInt(error.statusCode.toString()) : 500
      const statusMessage = (error.statusMessage) ? error.statusMessage : { message: 'Internal Server Error' }
      res.status(statusCode).json(statusMessage);
  } catch (e) {
      next(e);
  }
};