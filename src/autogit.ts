const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = Array.from(new Set(array));
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.filter((value, index) => array.indexOf(value) === index);
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.reduce<number[]>((acc, value) => {
    if (!acc.includes(value)) {
        acc.push(value);
    }
    return acc;
}, []);
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray: number[] = [];
array.forEach(value => {
    if (!uniqueArray.includes(value)) {
        uniqueArray.push(value);
    }
});
console.log(uniqueArray); // Output: [1, 2, 3, 4, 5]
