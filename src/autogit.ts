const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();               // → [5, 4, 3, 2, 1]
console.log(numbers);
const original: string[] = ['a', 'b', 'c'];
const reversed = [...original].reverse(); // → ['c', 'b', 'a']

console.log(original); // ['a', 'b', 'c']
console.log(reversed); // ['c', 'b', 'a']
const reversed = Array.from(original).reverse();
function reverseArray<T>(arr: readonly T[]): T[] {
  const result: T[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

const reversed = reverseArray(original);
/**
 * Returns a new array with the elements of `arr` in reverse order.
 * The original array is never mutated.
 */
function reversed<T>(arr: readonly T[]): T[] {
  return [...arr].reverse(); // or use the manual loop if you prefer
}

// Usage
const nums = [10, 20, 30];
const revNums = reversed(nums); // [30, 20, 10]

console.log(nums);    // [10, 20, 30]  (unchanged)
console.log(revNums); // [30, 20, 10]
const reversed = (arr: readonly any[]) => arr.reduceRight((acc, cur) => {
  acc.push(cur);
  return acc;
}, [] as any[]);

const rev = reversed([1, 2, 3]); // [3, 2, 1]
// reverse-utils.ts
export function reverseInPlace<T>(arr: T[]): T[] {
  return arr.reverse(); // mutates arr
}

export function reverseCopy<T>(arr: readonly T[]): T[] {
  return [...arr].reverse(); // immutable
}

// demo.ts
import { reverseInPlace, reverseCopy } from './reverse-utils';

const mutable = [1, 2, 3];
reverseInPlace(mutable);
console.log('mutated:', mutable); // [3, 2, 1]

const original = ['x', 'y', 'z'];
const copy = reverseCopy(original);
console.log('original:', original); // ['x', 'y', 'z']
console.log('copy:', copy);         // ['z', 'y', 'x']
tsc demo.ts && node demo.js
