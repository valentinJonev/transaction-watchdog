import dotenv from 'dotenv';

dotenv.config()

export class Environment {
  constructor() {
    this.env = process.env.NODE_ENV;
    this.port = process.env.PORT;
    this.logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
    this.mq_host = process.env.MQ_HOST;
    this.network = process.env.NETWORK;
    this.infura_project_id = process.env.INFURA_PROJECT_ID;
  }
  
}