import Joi from 'joi';

export class DynamicConfigurationValidations {
    constructor(){
        this.createConfiguration = {
            body: Joi.object({
                configJson: Joi.string().required(),
                delayed: Joi.boolean().optional(),
                network: Joi.string().required(),
                active: Joi.boolean().forbidden(),
                deleted: Joi.boolean().forbidden()
            })
        };
    
        this.updateConfiguration = {
            body: Joi.object({
                configJson: Joi.string().optional(),
                network: Joi.string().forbidden(),
                delayed: Joi.boolean().optional(),
                active: Joi.boolean().forbidden(),
                deleted: Joi.boolean().forbidden()
            }),
            params: Joi.object({
                id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
            })
        }
    }
}