import amqp from 'amqplib';

export class AMQ {
    constructor({ env }) {
        this.env = env;
    }

    async createChannel() {
        const connection = await amqp.connect(this.env.mq_host);
        const channel = await connection.createChannel();

        return channel;
    }
}