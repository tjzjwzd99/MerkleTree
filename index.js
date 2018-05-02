'use strict';
var merkle = require('./libs/merkle.js');

var inputParam = process.argv[2] || 1;
var inputFile = './data/'+ inputParam + '.js';
var inputArr = require(inputFile);

console.log('===========================================');
console.log('Calculating Merkle Tree for :');
console.log(inputArr);

var merkleTree = merkle(inputArr);

console.log('===========================================');
console.log('Final Merkle Tree is :');
console.log(merkleTree.merkleTree);

console.log('Top hash is :');
console.log(merkleTree.topHash);
console.log('===========================================');

