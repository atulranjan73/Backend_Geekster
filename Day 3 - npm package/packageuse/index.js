const BinarySearch = require("binarysearch-package-atulranjan");

const arr = [1, 3, 5, 7, 9, 11];
const target = 7;
const result = BinarySearch(arr, target);

console.log(`The target ${target} is at index ${result}.`);
