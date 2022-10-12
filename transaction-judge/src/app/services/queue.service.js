export class QueueService {
        channel;
        exchangeName = 'config';

        constructor({ amq, logger, env, configService, web3Service, judgeService, sequelize }){
                this.amq = amq;
                this.logger= logger;
                this.env = env;
                this.configService = configService;
                this.web3Service = web3Service;
                this.judgeService = judgeService;
                this.sequelize = sequelize;
        }

        async createChannel() {
                this.channel = await this.amq.createChannel(this.exchangeName); 
        }

        async listenForConfigChanges() {
                await this.channel.assertExchange(this.exchangeName, 'direct', { durable: false });
                let queue = await this.channel.assertQueue();
                this.channel.bindQueue(queue.q, this.exchangeName, this.env.network);
                this.channel.consume(queue.q, (message) => {
                        this.logger.log(`Config ${message.content[0]} status set to true on network ${this.env.network}`, 'debug')
                        this.configService.updateConfiguration();
                }, { noAck: true });
        }

        async listenForTransactions() {
                this.logger.log('Listening for transactions', 'info')
                this.channel.assertQueue(`${this.env.network}-transactions`, { durable: true });
                this.channel.consume(`${this.env.network}-transactions`, async (message) => {
                        this.logger.log(`Transaction ${message.content} received`, 'debug');
                        let transaction = await this.web3Service.getTransactionInfo(message.content)
                        if(transaction && this.judgeService.judge(transaction)){
                                this.logger.log(`Transaction ${transaction.hash} approved`, 'debug')
                                this.sequelize.Transaction.create({
                                        transactionJson: JSON.stringify(transaction),
                                        DynamicConfigurationId: this.configService.configuration.id
                                })
                        }
                        this.channel.ack(message);
                }, { noAck: false });
        }
}