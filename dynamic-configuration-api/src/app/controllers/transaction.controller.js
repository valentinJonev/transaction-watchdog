import httpStatus from 'http-status';

export class TransactionController {
    constructor() {
    }

    async getAll(req, res, next) {
        const logger = req.scope.resolve('logger');
        const sequelize = req.scope.resolve('sequelize');

        try {
            let configurations = await sequelize.Transaction.findAll({ where: { ...req.query }, include: 'DynamicConfiguration' });
    
            res.status(httpStatus.OK);
            res.json(configurations);
        }
        catch(error) {
            logger.log(error, 'error');
            next(error);
        }
    }
}