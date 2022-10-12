import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { asClass } from 'awilix';

export class App {
    constructor(router, env, sequelize, queueService, logger, container){
        this.app = express();
        this.router = router;
        this.env = env;
        this.sequelize = sequelize;
        this.queueService = queueService;
        this.logger = logger;
        this.container = container;
    }

    start() {
        this.app.use(morgan(this.env.logs));

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(helmet());
        this.app.use(cors());

        this.app.use((req, res, next) => {
            req.scope = this.container.createScope()
            next()
        })

        this.router.init();
        this.app.use(this.router.router);
        
        this.authDb();
        this.createQueueChannel();

        this.app.listen(this.env.port, () => this.logger.log(`API started on port ${this.env.port} (${this.env.env})`, 'info'));
    }

    authDb() {
        this.sequelize.connection.authenticate()
        .then(() => {
            this.logger.log('Connection to the DB has been established successfully.', 'info');
        })
        .catch((error) => {
            this.logger.log(`Could not connect to DB ${error}`, 'error');
        })
    }

    createQueueChannel() {
        this.queueService.createChannel();
    }
}