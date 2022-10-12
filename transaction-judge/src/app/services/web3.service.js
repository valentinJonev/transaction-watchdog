import Web3 from 'web3';

export class Web3Service {
    constructor({ logger, env }) {
        this.logger = logger;
        this.ethNetwork = `wss://${env.network}.infura.io/ws/v3/${env.infura_project_id}`;
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.ethNetwork));
    }

    getTransactionInfo(transactionId) {
        return new Promise((resolve, reject) => {
            this.logger.log(`Getting transaction info for ${transactionId}`, 'debug');
    
            let transactionHash = String(transactionId);
            try{
                this.web3.eth.getTransaction(transactionHash, (error, transaction) => {
                    if(error) {
                        reject(error);
                    }
                    else {
                        resolve(transaction);
                    }
                })
            }
            catch(error) {
                this.logger.log(error, 'error');
            }
        })
    }
}