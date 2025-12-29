/**
 * In-place selection sort for numbers.
 * @param arr Array of numbers to sort
 * @returns The same array, now sorted in ascending order
 */
function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find the index of the smallest element in the unsorted suffix
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap the found minimum element with the first unsorted element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/* ---------- Usage ---------- */
const data = [64, 25, 12, 22, 11];
console.log('Before:', data);
selectionSort(data);
console.log('After:', data);
function selectionSortGeneric<T>(
  arr: T[],
  compare: (a: T, b: T) => number
): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (compare(arr[j], arr[minIdx]) < 0) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/* ---------- Example with strings ---------- */
const words = ['pear', 'banana', 'apple'];
selectionSortGeneric(words, (a, b) => a.localeCompare(b));
console.log(words); // [ 'apple', 'banana', 'pear' ]
tsc selectionSort.ts
node selectionSort.js
