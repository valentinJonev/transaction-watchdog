import { Sequelize, DataTypes, Op } from 'sequelize';

export class SequelizeHelper {
    DynamicConfiguration;
    Transaction;
    constructor({ env, logger, queueService }) {
        this.env = env;
        this.logger = logger;
        this.queueService = queueService;

        this.connection = new Sequelize('watchdog', this.env.db_username, this.env.db_password, {
            host: this.env.db_host,
            dialect: 'postgres',
            logging: msg => this.logger.log(msg, 'debug')
        })

        this.createConfigModel();
        this.createTransactionModel();
    }

    createConfigModel() {
        this.DynamicConfiguration = this.connection.define('DynamicConfiguration', {
            id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true
            },
            configJson: {
              type: DataTypes.JSON,
              allowNull: false
            },
            delayed: {
              type: DataTypes.BOOLEAN,
              defaultValue: false
            },
            network: {
              type: DataTypes.STRING,
              allowNull: false
            },
            active: {
              type: DataTypes.BOOLEAN,
              defaultValue: false
            },
            deleted: {
              type: DataTypes.BOOLEAN,
              defaultValue: false
            }
        });
          
        this.DynamicConfiguration.addHook('beforeSave', async (config) => {
            if(config.active) {
              await this.DynamicConfiguration.update({ active: false }, { where: { network: config.network, deleted: false, id: { [Op.ne]: config.id } }})
            }
          });
          
        this.DynamicConfiguration.addHook('afterSave', async (config) => {
            if(config.active) {
              await this.queueService.queueMessage(config);
            }
        });
    }

    createTransactionModel() {
        this.Transaction = this.connection.define('Transaction', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            transactionJson: {
                type: DataTypes.JSON,
                allowNull: false
            }
        });
        
        this.DynamicConfiguration.hasMany(this.Transaction);
        this.Transaction.belongsTo(this.DynamicConfiguration);
    }

}
