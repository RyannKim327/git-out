let arr = [1, 2, 3, 4, 5];
arr.reverse();

console.log(arr); // Output: [5, 4, 3, 2, 1]
let arr = [1, 2, 3, 4, 5];
let reversedArr = [...arr].reverse();

console.log(reversedArr); // Output: [5, 4, 3, 2, 1]
console.log(arr);         // Output: [1, 2, 3, 4, 5]
