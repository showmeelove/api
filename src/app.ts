import cors from "cors"
import express from "express"
import { logger } from "@utils/logger"
import { MONGO_URI, VERSION } from "@config"
import { IRoute } from "@interfaces/routes.interface"
import morgan from "morgan"
import { ErrorHandler } from "./middlewares/error.middleware"
import { MongoDatabase } from "./utils/database"

import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import hpp from 'hpp'
import helmet from 'helmet'


export class App {
  private app: express.Application = express()
  private port!: string | number

  constructor(port: string|number, routes: IRoute[]){
    this.port = port
    this.app = express()
    this.initAndListen()
    this.initializeDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeSwagger()
    this.initerrorHandling()
  }

  private initAndListen(){
    this.app.listen(this.port, () => {
      logger.info(`APP STARTED ON PORT ${this.port}`)
    })
  }

  private initializeRoutes(routes: IRoute[]){

    this.app.get(`/api/${VERSION}`, (request, response) => {

      response.status(200).json({ statusCode: 200, statusMessage: 'OK', version: VERSION })
    })

    routes.forEach((route) => {
      this.app.use(`/api/${VERSION}`, route.router)
    })
  }

  private initializeDatabase(){
    new MongoDatabase(MONGO_URI)
  }

  private initializeMiddlewares(){
    this.app.use(cors({ origin: "*" }));
    this.app.use(morgan('dev', { stream: logger.stream }));
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet())
    this.app.disable('x-powered-by')
    this.app.use(hpp())
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'Showmeelove',
          version: '1.0.0',
          description: 'API documentation for Showmeelove',
        },
        basePath: `/api/${VERSION}`,
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


  }

  private initerrorHandling(){
    this.app.use((request, response, next) => {
      next({
        statusCode: 404,
        statusMessage: {
          message: 'Invalid Endpoint',
          path: request.path,
          method: request.method
        }
      })
    })

    this.app.use(ErrorHandler)
  }

}





// app.use((error, request, response, next) => {
//   if(error instanceof Error) error = errorProcessing(error)
//   const statusCode = parseInt((error.errorCode) ? error.errorCode : 500)
//   const statusMessage = (error.errorMessage) ? error.errorMessage : { message: 'Internal Server Error' }
//   response.status(statusCode).json(statusMessage)
// })
