import express from 'express'
import { validate } from 'express-validation'

export class Router{
    constructor({dynamicConfigurationController, transactionController, configValidations}) {
        this.router = express.Router();
        this.dynamicConfigurationController = dynamicConfigurationController;
        this.transactionController = transactionController;
        this.configValidations = configValidations;
    }

    init() {
        this.router.get('/healthcheck', (req, res) => res.send('OK'));

        this.router
            .route('/configurations/')
            .get(this.dynamicConfigurationController.getAll)
            .post(this.dynamicConfigurationController.create, validate(this.configValidations.createConfiguration));

        this.router
            .route('/configurations/:id')
            .get(this.dynamicConfigurationController.getById)
            .patch(this.dynamicConfigurationController.update, validate(this.configValidations.updateConfiguration))
            .delete(this.dynamicConfigurationController.delete);

        this. router
            .route('/configurations/:id/activate')
            .post(this.dynamicConfigurationController.toggleActive);


        this.router
            .route('/transactions')
            .get(this.transactionController.getAll);
    }
}