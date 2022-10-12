import { Sequelize, DataTypes, Op } from 'sequelize';

export class SequelizeHelper {
    DynamicConfiguration;
    Transaction;
    constructor({ env, logger }) {
        this.env = env;
        this.logger = logger;

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
