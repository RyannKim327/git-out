const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

const commonElements = array1.filter(item => array2.includes(item));

console.log(commonElements); // Output: [3, 4, 5]
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

const set2 = new Set(array2);
const commonElements = array1.filter(item => set2.has(item));

console.log(commonElements); // Output: [3, 4, 5]
