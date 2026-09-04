/**
 * In‑place quicksort for an array of elements that implement Comparable.
 * @param arr The array to sort.
 * @param left Index of the first element to consider.
 * @param right Index of the last element to consider.
 * @returns The sorted array (the same reference is returned).
 */
export function quicksort<T>(arr: T[], left = 0, right = arr.length - 1): T[] {
  // Using 0‐based indices
  if (left >= right) return arr;           // Base case – 0 or 1 element

  const pivotIndex = partition(arr, left, right);
  quicksort(arr, left, pivotIndex - 1);   // left side (0‑based)
  quicksort(arr, pivotIndex + 1, right);  // right side
  return arr;
}

/**
 * Hoare partition scheme.
 * Moves elements < pivot to the left, > pivot to the right.
 * Returns the final pivot position (the index of the pivot element after partition).
 */
function partition<T>(arr: T[], left: number, right: number): number {
  // Pick the middle element as pivot (arbitrary choice)
  const pivot = arr[Math.floor((left + right) / 2)];

  let i = left;
  let j = right;

  while (i <= j) {
    // Move i until we find element >= pivot
    while (arr[i] < pivot) i++;
    // Move j until we find element <= pivot
    while (arr[j] > pivot) j--;

    if (i <= j) {
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  // Return the index where the next recursive calls will split.
  return i - 1;
}
const data = [34, 7, 23, 32, 5, 62];
console.log(quicksort(data)); // [5, 7, 23, 32, 34, 62]
export function quicksortBy<T>(
  arr: T[],
  cmp: (a: T, b: T) => number,
  left = 0,
  right = arr.length - 1
): T[] {
  if (left >= right) return arr;

  const pivotIndex = partitionBy(arr, cmp, left, right);
  quicksortBy(arr, cmp, left, pivotIndex - 1);
  quicksortBy(arr, cmp, pivotIndex + 1, right);
  return arr;
}

function partitionBy<T>(
  arr: T[],
  cmp: (a: T, b: T) => number,
  left: number,
  right: number
): number {
  const pivot = arr[Math.floor((left + right) / 2)];

  let i = left;
  let j = right;

  while (i <= j) {
    while (cmp(arr[i], pivot) < 0) i++;
    while (cmp(arr[j], pivot) > 0) j--;

    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  return i - 1;
}
const users = [
  { name: 'Anna', age: 23 },
  { name: 'Bob', age: 17 },
  { name: 'Clara', age: 31 },
];

quicksortBy(users, (a, b) => a.age - b.age);
stdin: 5 1 4 2 6 0
stdout: 0 1 2 4 5 6
