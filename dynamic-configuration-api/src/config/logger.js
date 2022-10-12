import winston from 'winston';

export class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
    
    this.logger.stream = {
      write: (message) => {
        this.logger.info(message.trim());
      },
    };
  }

  log(message, severity) {
    switch(severity){
      case 'info':
        this.logger.info(message);
        break;
      case 'warning':
        this.logger.warn(message);
        break;
      case 'error':
        this.logger.error(message);
        break;
      case 'debug':
        this.logger.debug(message)
        break;
    }
  }
}