/**
 * Bubble sort – compares adjacent elements and swaps them if they're out of order.
 *
 * @param arr – The array of numbers (or any type that implements `<`),
 *              sorted in place and also returned for convenience.
 * @returns The sorted array.
 */
export function bubbleSort<T>(arr: T[]): T[] {
  const n = arr.length;

  // Outer loop – each pass guarantees that the largest element among the
  // unsorted portion moves to its final position at the end of the array.
  for (let i = 0; i < n - 1; i++) {
    // Inner loop – only needs to run up to the last unsorted element.
    for (let j = 0; j < n - i - 1; j++) {
      // If the current element is greater than the next one, swap them.
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
import { bubbleSort } from './bubbleSort';

const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Before:', numbers);

bubbleSort(numbers);

console.log('After:', numbers);   // [11, 12, 22, 25, 34, 64, 90]
