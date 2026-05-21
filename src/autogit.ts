/**
 * Randomly shuffles an array in-place.
 * Uses the Fisher–Yates algorithm.
 */
function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Checks whether the array is sorted in ascending order.
 * Works for numbers and strings (lexicographically).
 */
function isSorted<T extends number | string>(array: T[]): boolean {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) return false;
  }
  return true;
}

/**
 * Bogosort: keep shuffling until the array is sorted.
 * In practice, this is a joke algorithm because of its astronomical
 * expected runtime, but it’s fun to see it in TypeScript.
 */
export function randomSort<T extends number | string>(array: T[]): T[] {
  // We’ll operate on a copy to avoid mutating the caller’s data.
  const arr = array.slice();

  // Guard against trivial cases.
  if (arr.length < 2) return arr;

  // Keep shuffling until the array is sorted.
  while (!isSorted(arr)) {
    shuffle(arr);
  }

  return arr;
}
const unsorted = [3, 1, 4, 1, 5, 9, 2];
const sorted = randomSort(unsorted);
console.log(sorted); // [1, 1, 2, 3, 4, 5, 9]
