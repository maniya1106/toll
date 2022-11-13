const crypto = require('crypto');

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash("sha256");
    hash.update(inputs.sort().join(""));
    result = hash.digest("hex");
    return result;

}

module.exports = cryptoHash;