const original = [1, 2, 3, 4];

const reversed = original.slice().reverse(); // => [4, 3, 2, 1]
const arr = [5, 4, 3];

// 👈 preserve arr
const backToFront = arr.slice().reverse(); // [3, 4, 5]
console.log(arr);          // [5, 4, 3]
const arr = [1, 2, 3];
arr.reverse(); // arr is now [3, 2, 1]
const reverseArray = <T>(input: T[]): T[] =>
  input.reduce<T[]>((acc, item) => [item, ...acc], []);

const arr = [10, 20, 30];
const rev = reverseArray(arr); // [30, 20, 10]
