import amqp from 'amqplib';

export class AMQ {
    constructor({ env }) {
        this.env = env;
    }

    async createExchange(exchangeName) {
        const connection = await amqp.connect(this.env.mq_host);
        const channel = await connection.createChannel();
        await channel.assertExchange(exchangeName, 'direct', { durable: false });

        return channel;
    }
}