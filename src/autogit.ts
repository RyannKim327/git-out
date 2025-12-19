const arr = [1, 2, 3, 4, 5];
arr.reverse();          // ➜ [5, 4, 3, 2, 1]
console.log(arr);         // original array is mutated
const original = [1, 2, 3, 4, 5];
const reversed = [...original].reverse(); // spread into a new array
console.log(original); // [1, 2, 3, 4, 5]
console.log(reversed); // [5, 4, 3, 2, 1]
