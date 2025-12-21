/**
 * Sorts the array in ascending order using Bubble Sort (in-place).
 * Time:  O(n²)
 * Space: O(1)
 */
function bubbleSortAscending<T>(arr: T[]): T[] {
  const n = arr.length;
  let swapped: boolean;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; // swap
        swapped = true;
      }
    }
    // After each pass the largest element is at the end,
    // so next pass can ignore the last element.
  } while (swapped);

  return arr;
}

/* ---------- Demo ---------- */
const nums = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", nums);
bubbleSortAscending(nums);
console.log("Sorted:  ", nums);
function bubbleSortCopy<T>(source: readonly T[]): T[] {
  const clone = [...source];
  bubbleSortAscending(clone);
  return clone;
}
function bubbleSortWithComparator<T>(
  arr: T[],
  cmp: (a: T, b: T) => number
): T[] {
  const n = arr.length;
  let swapped: boolean;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (cmp(arr[i], arr[i + 1]) > 0) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}

/* ---------- Demo: descending numbers ---------- */
const nums2 = [3, 1, 4, 1, 5, 9];
bubbleSortWithComparator(nums2, (a, b) => b - a);
console.log("Descending:", nums2);
// bubbleSort.test.ts
import { bubbleSortAscending } from "./bubbleSort";

test("bubble sort", () => {
  expect(bubbleSortAscending([5, 3, 8, 4])).toEqual([3, 4, 5, 8]);
  expect(bubbleSortAscending([])).toEqual([]);
  expect(bubbleSortAscending([1])).toEqual([1]);
});
