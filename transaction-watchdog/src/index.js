import awilix, { Lifetime } from 'awilix';
import { App, Router } from './app/index.js'
import { Logger, Environment, AMQ } from './config/index.js';
import { QueueService, Web3Service } from './app/services/index.js';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    queueService: awilix.asClass(QueueService).setLifetime(awilix.Lifetime.SCOPED),
    web3Service: awilix.asClass(Web3Service).setLifetime(awilix.Lifetime.SCOPED),
    logger: awilix.asClass(Logger).setLifetime(awilix.Lifetime.SINGLETON),
    router: awilix.asClass(Router),
    amq: awilix.asClass(AMQ),
    env: awilix.asClass(Environment),
});

const app = new App(
    container.resolve('router'), 
    container.resolve('env'), 
    container.resolve('logger'),
    container.resolve('queueService'),
    container.resolve('web3Service')
);

app.start();