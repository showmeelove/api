import winston, { format } from 'winston';
import morgan from 'morgan';
import kleur from 'kleur';

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
      transports: [
        new winston.transports.Console()
      ]
    });
  }

  public stream = {
    write: (message: string) => {
      this.logger.info(message.trim());
    }
  };

  public info(message: string): void {
    this.logger.info(kleur.blue(message));
  }

  public error(message: string): void {
    this.logger.error(kleur.red(message));
  }

  public warn(message: string): void {
    this.logger.warn(kleur.yellow(message));
  }
}

export const logger = new Logger();
