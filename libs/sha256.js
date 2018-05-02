var crypto = require('crypto');


var sha256 = function (message) {
    var c = crypto.createHash('sha256');

    //Check if message is JSON
    if (typeof message == 'object') {
        message = JSON.stringify(message);
    }

    var messageBuffer = new Buffer(message);
    c.update(messageBuffer);
    var bufferDigest = c.digest();
    var shaHex = bufferDigest.toString('hex');
    return shaHex;
};

module.exports = sha256;