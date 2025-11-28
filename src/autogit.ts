// Number array example
const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // Output: [5, 4, 3, 2, 1]

// String array example
const letters: string[] = ['a', 'b', 'c'];
letters.reverse();
console.log(letters); // Output: ['c', 'b', 'a']
const original: number[] = [10, 20, 30];
const reversed = [...original].reverse(); // Creates a shallow copy first

console.log(original); // [10, 20, 30] (unchanged)
console.log(reversed); // [30, 20, 10]
const readonlyArr: readonly number[] = [1, 2, 3];
const reversed = [...readonlyArr].reverse(); // Safe reversal
