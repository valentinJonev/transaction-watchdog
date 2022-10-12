export class JudgeService {
    constructor({ configService, logger }) {
        this.configService = configService;
        this.logger = logger;
    }

    judge(transaction) {
        const config = JSON.parse(this.configService.configuration.configJson).config;
        this.logger.log(`Judging transaction ${transaction.hash}`, 'debug');
        let passed = false;
        config.forEach(rule => {
            if(this.compare(transaction[rule.key], rule.operation, rule.value)){
                passed = true
            }
            else {
                passed = false;
            }
        });
    
        return passed;
    }

    compare(key, operation, value) {
        switch (operation){
            case "eq":
                return key == value;
            case "gt":
                return key > value;
            case "lt":
                return key < value;
            case "ne":
                return key != value;
        }
    }
}

