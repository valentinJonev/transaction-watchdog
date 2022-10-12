import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

export class App {
    constructor(router, env, sequelize, logger, queueService, configService){
        this.app = express();
        this.router = router;
        this.env = env;
        this.sequelize = sequelize;
        this.queueService = queueService;
        this.configService = configService;
        this.logger = logger;
    }

    start() {
        this.app.use(morgan(this.env.logs));

        this.app.use(helmet()); 
        this.app.use(cors());

        this.router.init();
        this.app.use(this.router.router);
        
        this.authDb();
        this.createQueueChannel();

        this.app.listen(this.env.port, () => this.logger.log(`Judge started on port ${this.env.port} (${this.env.env})`, 'info'));
    }

    authDb() {
        this.sequelize.connection.authenticate()
        .then(async () => {
            this.logger.log('Connection to the DB has been established successfully.', 'info');
            await this.configService.updateConfiguration();
        })
        .catch((error) => {
            this.logger.log(`Could not connect to DB ${error}`, 'error');
        })
    }

    createQueueChannel() {
        this.queueService.createChannel().then(() => {
            this.queueService.listenForConfigChanges();
            this.queueService.listenForTransactions();
        })
    }
}