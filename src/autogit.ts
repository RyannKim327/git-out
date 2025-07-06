let arr = [1, 2, 3, 4, 5];
const elementToRemove = 3;
const index = arr.indexOf(elementToRemove);

if (index > -1) {
    arr.splice(index, 1); // Remove 1 element at index
}

console.log(arr); // Output: [1, 2, 4, 5]
let arr = [1, 2, 3, 4, 5];
const elementToRemove = 3;

arr = arr.filter(item => item !== elementToRemove);

console.log(arr); // Output: [1, 2, 4, 5]
let arr = [1, 2, 3, 4, 5];
const elementToRemove = 3;

arr = arr.reduce((accumulator, current) => {
    if (current !== elementToRemove) {
        accumulator.push(current);
    }
    return accumulator;
}, [] as number[]);

console.log(arr); // Output: [1, 2, 4, 5]
let arr = [1, 2, 3, 4, 5];
const elementToRemove = 3;
let newArr: number[] = [];

arr.forEach(item => {
    if (item !== elementToRemove) {
        newArr.push(item);
    }
});

arr = newArr;

console.log(arr); // Output: [1, 2, 4, 5]
let arr = [1, 2, 3, 4, 5];
const elementToRemove = 3;
const index = arr.findIndex(item => item === elementToRemove);

if (index !== -1) {
    arr.splice(index, 1);
}

console.log(arr); // Output: [1, 2, 4, 5]
