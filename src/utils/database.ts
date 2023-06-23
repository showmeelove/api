'use strict'
import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from './logger';

const mongooseOptions : ConnectOptions = {
  
};


export class MongoDatabase {
  private uri: string;

  constructor(uri: any){
    this.uri = uri;
    this.connectToDb(this.uri);
  }

  private connectToDb(uri: string){
    mongoose.connect(this.uri, mongooseOptions);

    mongoose.connection.once('open', () => {
      logger.info("CONNECTED TO DATABASE")
    });

    mongoose.connection.on('error', (err: any) => {
      logger.error("ERROR CONNECTING TO DATABASE")
    });
  }
}