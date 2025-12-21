const numbers = [1, 2, 3, 4, 5];
numbers.reverse();          // numbers is now [5, 4, 3, 2, 1]
console.log(numbers);
const original = [1, 2, 3];
const reversed = [...original].reverse(); // or original.slice().reverse()
console.log(original); // [1, 2, 3]
console.log(reversed); // [3, 2, 1]
function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse(); // copy then reverse
}
function reverseArray<T>(arr: T[]): T[] {
  return arr.reduceRight<T[]>((acc, cur) => {
    acc.push(cur);
    return acc;
  }, []);
}
function reverseArray<T>(arr: T[]): T[] {
  const result: T[] = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[arr.length - 1 - i];
  }
  return result;
}
/**
 * Returns a new array with the elements of `arr` in reverse order.
 * The original array is left untouched.
 */
function reverse<T>(arr: readonly T[]): T[] {
  // `readonly T[]` accepts both mutable and immutable arrays.
  return [...arr].reverse();
}

// Usage examples:
const nums = [1, 2, 3];
const revNums = reverse(nums); // number[]

const strings = ['a', 'b', 'c'];
const revStrings = reverse(strings); // string[]
type ReverseTuple<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? [...ReverseTuple<Rest>, First]
    : [];

// Example
type Original = [string, number, boolean];
type Reversed = ReverseTuple<Original>; // [boolean, number, string]
function reverseTuple<T extends any[]>(tuple: readonly [...T]): ReverseTuple<T> {
  return [...tuple].reverse() as ReverseTuple<T>;
}

// Usage
const tup = [1, 'two', true] as const;
const rev = reverseTuple(tup); // rev: [true, "two", 1]
// utils/array.ts
export function reverse<T>(arr: readonly T[]): T[] {
  return [...arr].reverse();
}

// app.ts
import { reverse } from './utils/array';

const fruits = ['apple', 'banana', 'cherry'] as const;
const reversedFruits = reverse(fruits);

console.log('original:', fruits);          // ['apple', 'banana', 'cherry']
console.log('reversed:', reversedFruits); // ['cherry', 'banana', 'apple']
function reverse<T>(arr: readonly T[]): T[] {
  return [...arr].reverse();
}
