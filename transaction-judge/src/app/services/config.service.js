export class ConfigService {
    configuration = {};

    constructor({ sequelize, env, logger }) {
        this.sequelize = sequelize;
        this.env = env;
        this.logger = logger;
    }

    async updateConfiguration() {
        const dbConfig = await this.sequelize.DynamicConfiguration.findOne({ where: { network: this.env.network, active: true } });

        if(dbConfig != null) {
            this.configuration = dbConfig;
            this.logger.log(`New config received`, 'info');
        }
        else {
            this.logger.log(`No config found for network ${this.env.network}`, 'info');
        }
    }
}