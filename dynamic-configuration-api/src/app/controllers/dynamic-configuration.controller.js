import httpStatus from 'http-status';

export class DynamicConfigurationController {
    constructor() {
    }

    async getAll(req, res, next) {
        const logger = req.scope.resolve('logger');
        const sequelize = req.scope.resolve('sequelize');

        try {
            let configurations = await sequelize.DynamicConfiguration.findAll({ where: { ...req.query }});
    
            res.status(httpStatus.OK);
            res.json(configurations);
        }
        catch(error) {
            logger.log(error, 'error');
            next(error);
        }
    }

    async getById(req, res, next) {
        const logger = req.scope.resolve('logger');
        const sequelize = req.scope.resolve('sequelize');

        try {
            let configurations = await sequelize.DynamicConfiguration.findByPk(req.params.id);
    
            res.status(httpStatus.OK);
            res.json(configurations);
        }
        catch (error) {
            logger.log(error, 'error');
            next(error);
        }
    }

    async create(req, res, next) {
        const logger = req.scope.resolve('logger');
        const sequelize = req.scope.resolve('sequelize');

        try {
            let config = await sequelize.DynamicConfiguration.create(req.body);
    
            res.status(httpStatus.CREATED);
            res.json(config);
        }
        catch (error) {
            logger.log(error, 'error');
            next(error);
        }
    }

    async update(req, res, next) {
        const logger = req.scope.resolve('logger');
        const sequelize = req.scope.resolve('sequelize');

        try {
            var updated = await sequelize.DynamicConfiguration.update(req.body, { where: { id: req.params.id }, individualHooks: true });
    
            if(updated[0] == 0) {
                res.status(httpStatus.BAD_REQUEST);
                res.send(`Configuration with id ${req.params.id} could not be updated`);
            }
            else {
                res.status(httpStatus.OK);
                res.send();
            }
        }
        catch (error) {
            logger.log(error, 'error');
            next(error);
        }
    }

    async toggleActive(req, res, next) {
        const logger = req.scope.resolve('logger');
        const sequelize = req.scope.resolve('sequelize');

        try {
            var activated = await sequelize.DynamicConfiguration.update({ active: true }, { where: { id: req.params.id }, individualHooks: true });
    
            if(activated[0] == 0) {
                res.status(httpStatus.BAD_REQUEST);
                res.send(`Configuration with id ${req.params.id} could not be activated`);
            }
            else {
                res.status(httpStatus.OK);
                res.send();
            }
        }
        catch (error) {
            logger.log(error, 'error');
            next(error);
        }
    }

    async delete(req, res, next) {
        const logger = req.scope.resolve('logger');
        const sequelize = req.scope.resolve('sequelize');
        
        try {
            let deleted = await sequelize.DynamicConfiguration.update({ deleted: true },{ where: { id: req.params.id, active: false } });
    
            if(deleted[0] == 0) {
                res.status(httpStatus.BAD_REQUEST);
                res.send(`Configuration with id ${req.params.id} could not be deleted`);
            }
            else {
                res.status(httpStatus.OK)
                res.send()
            }
        }
        catch (error) {
            logger.log(error, 'error');
            next(error);
        }
    }
}