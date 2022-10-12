export class QueueService {
        channel;
        exchangeName = 'config';

        constructor({ amq, logger }){
                this.amq = amq;
                this.logger= logger;
        }

        async createChannel() {
                this.channel = await this.amq.createExchange(this.exchangeName); 
        }

        async queueMessage(config) {
                this.channel.assertQueue(config.network);
                this.channel.publish(this.exchangeName, config.network, Buffer.from([config.id]));
                this.logger.log(`Config updated on network ${config.network}`, 'info');
        }
}