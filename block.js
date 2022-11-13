const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./hash-gen");

class block {
    constructor({ timeStemp, prevHash, hash, data, nonce, difficulty }) {
        this.timeStemp = timeStemp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ prevBlock, data }) {
        let hash, timeStemp;
        let prevHash = prevBlock.hash;
        const { difficulty } = prevBlock;
        let nonce = 0;
        do {
            nonce++;
            timeStemp = Date.now();
            hash = cryptoHash(timeStemp, prevHash, data, nonce, difficulty)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))
        return new this({
            timeStemp,
            prevHash,
            data,
            hash,
            difficulty,
            nonce
        });

    }
}

module.exports = block;
