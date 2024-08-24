const BinarySearch   = require('binarysearchpackage_atulranjan');

const arr = [1, 3, 5, 7, 9, 11];
const target = 7;

const result = BinarySearch(arr, target);
if(result !==-1 ){
    console.log(`Element found at index ${result}`);

    
}
else{
    console.log('Element is not found ');
}