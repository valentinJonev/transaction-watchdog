import awilix from 'awilix';
import { App, Router } from './app/index.js'
import { SequelizeHelper, Logger, Environment, AMQ } from './config/index.js';
import { DynamicConfigurationController, TransactionController } from './app/controllers/index.js';
import { QueueService } from './app/services/index.js';
import { DynamicConfigurationValidations } from './app/validations/dynamic-configuration.validation.js';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
})

container.register({
    dynamicConfigurationController: awilix.asClass(DynamicConfigurationController).setLifetime(awilix.Lifetime.SCOPED),
    transactionController: awilix.asClass(TransactionController).setLifetime(awilix.Lifetime.SCOPED),
    queueService: awilix.asClass(QueueService).setLifetime(awilix.Lifetime.SCOPED),
    logger: awilix.asClass(Logger).setLifetime(awilix.Lifetime.SINGLETON),
    router: awilix.asClass(Router),
    amq: awilix.asClass(AMQ).setLifetime(awilix.Lifetime.SINGLETON),
    sequelize: awilix.asClass(SequelizeHelper).setLifetime(awilix.Lifetime.SINGLETON),
    env: awilix.asClass(Environment),
    configValidations: awilix.asClass(DynamicConfigurationValidations)
})

const app = new App(
    container.resolve('router'), 
    container.resolve('env'), 
    container.resolve('sequelize'), 
    container.resolve('queueService'), 
    container.resolve('logger'),
    container
);

app.start();