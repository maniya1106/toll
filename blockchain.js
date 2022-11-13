const Block = require("./block");
const cryptoHash = require("./hash-gen");
const x = require("./front");

class blockChain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({ prevBlock: this.chain[this.chain.length - 1], data, });
        this.chain.push(newBlock);
    }

    static isValidate(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            const { prevHash, timeStemp, hash, nonce, difficulty, data } = chain[i];
            const originalPrevHash = chain[i - 1].hash;

            if (prevHash !== originalPrevHash) {
                return false;
            }

            const validatedHash = cryptoHash(timeStemp, prevHash, nonce, difficulty, data);
            if (hash !== validatedHash) {
                return false;
            }
        }
        return true;
    }

    replaceChain(chain) {
        if (chain <= this.chain.length) {
            console.error("the incoming chain is not loger.");
            return
        }
        if (!blockChain.isValidate(chain)) {
            console.error("the incoming chain is not validate.");
            return
        }
        this.chain = chain;
    }
}

function addblockbyform(datafromform) {

}
const blockChain1 = new blockChain();
blockChain1.addBlock({ data: x });
const result = blockChain.isValidate(blockChain1.chain);
console.log(result);
console.log(blockChain1.chain);

module.exports = blockChain;