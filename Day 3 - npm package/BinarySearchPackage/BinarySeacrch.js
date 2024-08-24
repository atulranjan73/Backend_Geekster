import binarySearch from binarysearchpackage_atulranjan;
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 5;

const result = binarySearch(arr, target);

if (result !== -1) {
    console.log(`Element found at index ${result}`);
} else {
    console.log('Element not found');
}