const numbers = [1, 2, 3, 4, 5];
numbers.reverse();          // → [5, 4, 3, 2, 1]
const numbers = [1, 2, 3, 4, 5];

// Option A: slice + reverse
const reversedA = numbers.slice().reverse();   // → [5,4,3,2,1]

// Option B: spread + reverse (ES2018+)
const reversedB = [...numbers].reverse();      // → [5,4,3,2,1]

// Both `reversedA` and `reversedB` are new arrays; `numbers` stays unchanged.
function reverseInPlace<T>(arr: T[]): void {
  const len = arr.length;
  for (let i = 0; i < len / 2; i++) {
    const opposite = len - 1 - i;
    [arr[i], arr[opposite]] = [arr[opposite], arr[i]]; // destructuring swap
  }
}

// Usage
const letters = ['a', 'b', 'c', 'd'];
reverseInPlace(letters); // letters === ['d','c','b','a']
function reversed<T>(arr: readonly T[]): T[] {
  const result: T[] = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[arr.length - 1 - i];
  }
  return result;
}

// Usage
const original = [true, false, true];
const copy = reversed(original); // [true, false, true] reversed → [true, false, true] (same values, different order)
/**
 * Returns a new array with the elements of `arr` in reverse order.
 * The original array is never mutated.
 *
 * @param arr - The source array (can be readonly)
 * @returns A new array with reversed order
 */
export function reverseArray<T>(arr: readonly T[]): T[] {
  // Using spread + reverse is concise, but the explicit loop avoids an extra temporary array.
  const result: T[] = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[arr.length - 1 - i];
  }
  return result;
}
import { useState } from 'react';
import { reverseArray } from './utils';

export function NumberList() {
  const [numbers, setNumbers] = useState<number[]>([1, 2, 3, 4, 5]);

  const handleReverse = () => {
    // Immutable update – React will see a new reference
    setNumbers(prev => reverseArray(prev));
  };

  return (
    <>
      <ul>{numbers.map(n => <li key={n}>{n}</li>)}</ul>
      <button onClick={handleReverse}>Reverse</button>
    </>
  );
}
