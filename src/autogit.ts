const numbers: number[] = [1, 2, 3, 4, 5];

numbers.reverse();          // numbers is now [5, 4, 3, 2, 1]
console.log(numbers);
function reversed<T>(arr: readonly T[]): T[] {
  // Spread operator creates a shallow copy, then we reverse that copy.
  return [...arr].reverse();
}

// Example
const letters = ['a', 'b', 'c'];
const revLetters = reversed(letters);

console.log(letters);      // ['a', 'b', 'c']  (unchanged)
console.log(revLetters);   // ['c', 'b', 'a']
function reverseInPlace<T>(arr: T[]): void {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Swap arr[left] and arr[right]
    const tmp = arr[left];
    arr[left] = arr[right];
    arr[right] = tmp;

    left++;
    right--;
  }
}

// Example
const mixed = [true, 42, 'hello'];
reverseInPlace(mixed);
console.log(mixed); // [ 'hello', 42, true ]
function reverseWithReduce<T>(arr: readonly T[]): T[] {
  return arr.reduceRight<T[]>((acc, cur) => {
    acc.push(cur);
    return acc;
  }, []);
}

// Example
const nums = [10, 20, 30];
const rev = reverseWithReduce(nums);
console.log(rev); // [30, 20, 10]
/**
 * Returns a new array with the elements of `arr` in reverse order.
 * The original array is never mutated.
 */
export function reverseArray<T>(arr: readonly T[]): T[] {
  return [...arr].reverse();
}
import { reverseArray } from './array-utils';

const names = ['Alice', 'Bob', 'Carol'];
const reversedNames = reverseArray(names);
// Mutating (simple)
myArray.reverse();

// Non‑mutating (recommended for most TS projects)
const reversed = [...myArray].reverse();
