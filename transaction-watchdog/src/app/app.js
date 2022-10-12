import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

export class App {
    constructor(router, env, logger, queueService, web3Service){
        this.app = express();
        this.router = router;
        this.env = env;
        this.queueService = queueService;
        this.web3Service = web3Service;
        this.logger = logger;
    }

    start() {
        this.app.use(morgan(this.env.logs));

        this.app.use(helmet()); 
        this.app.use(cors());

        this.router.init();
        this.app.use(this.router.router);
        
        this.createQueueChannel();

        this.app.listen(this.env.port, () => this.logger.log(`Watchdog started on port ${this.env.port} (${this.env.env})`, 'info'));
    }

    createQueueChannel() {
        this.queueService.createChannel().then(() => {
            this.web3Service.createSubscription();
        });
    }
}