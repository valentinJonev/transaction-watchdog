export class QueueService {
        channel;
        constructor({ env, logger, amq }) {
                this.amq = amq;
                this.env = env;
                this.logger = logger;
        }

        async createChannel() {
                this.channel = await this.amq.createChannel(this.exchangeName); 
        }

        async queueMessage(transactionId) {
                this.channel.assertQueue(`${this.env.network}-transactions`, { durable: true });
                this.channel.sendToQueue(`${this.env.network}-transactions`, Buffer.from(transactionId));
                this.logger.log(`New transaction with id ${transactionId} sent to network ${this.env.network}`, 'debug');
        }
}