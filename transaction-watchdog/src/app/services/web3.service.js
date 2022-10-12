import Web3 from 'web3';

export class Web3Service {
    constructor({ logger, env, queueService }) {
        this.logger = logger;
        this.queueService = queueService;
        this.ethNetwork = `wss://${env.network}.infura.io/ws/v3/${env.infura_project_id}`;
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.ethNetwork));
    }

    createSubscription() {
        this.logger.log('Creating transaction subscription', 'debug');

        this.web3.eth.subscribe('pendingTransactions')
        .on('connected', (info) => {
            this.logger.log(`Subscription id: ${info}`, 'debug');
        })
        .on("data", (transaction) => {
            this.queueService.queueMessage(transaction);
        });
    }
}