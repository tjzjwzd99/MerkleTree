var sha256 = require('./sha256');

function merkle(inputArr) {

    var merkleHashArr = [];
    var leafNodeArr = [];
    var that = this;
    var topHash = '';

    this.calculateLeafNodes = function (inputArr) {
        for (var i=0; i<inputArr.length; i++) {
            leafNodeArr.push(sha256(inputArr[i]));
        }
        merkleHashArr.push(leafNodeArr);
    };

    this.calculateMerkleHash = function (merkleTopLevelArr) {
        var merkleNewLevelArr = [];

        for (var i = 0; i < merkleTopLevelArr.length; i+=2) {
            if (merkleTopLevelArr[i + 1] === undefined) {
                break;
            }
            var combinedHash = merkleTopLevelArr[i] + merkleTopLevelArr[i + 1];
            var hashOfCombinedHash = sha256(combinedHash);
            merkleNewLevelArr.push(hashOfCombinedHash);
        }

        // check if top level array is odd
        if (merkleTopLevelArr.length%2 == 1) {
            merkleNewLevelArr.push(merkleTopLevelArr[merkleTopLevelArr.length-1]);
        }

        merkleHashArr.push(merkleNewLevelArr);

        if (merkleNewLevelArr.length == 1) {
            topHash = merkleNewLevelArr[0];
            return;
        }else {
            that.calculateMerkleHash(merkleNewLevelArr);
        }
    };

    this.calculateLeafNodes(inputArr);
    this.calculateMerkleHash(merkleHashArr[0]);

    return {
        topHash: topHash,
        merkleTree: merkleHashArr
    }
}

module.exports = merkle;