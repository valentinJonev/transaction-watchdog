import dotenv from 'dotenv';

dotenv.config()

export class Environment {
  constructor() {
    this.env = process.env.NODE_ENV;
    this.port = process.env.PORT;
    this.logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
    this.db_host = process.env.DB_HOST;
    this.db_username = process.env.DB_USERNAME;
    this.db_password = process.env.DB_PASSWORD;
    this.mq_host = process.env.MQ_HOST;
  }
  
}