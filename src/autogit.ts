/**
 * Quicksort (ascending) – immutable version
 * @param arr Array of items that can be compared with `<` and `>`
 * @returns New sorted array
 */
export function quicksort<T>(arr: readonly T[]): T[] {
  if (arr.length <= 1) return [...arr];

  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  // Partition
  for (let i = 0; i < arr.length - 1; i++) {
    (arr[i] < pivot ? left : right).push(arr[i]);
  }

  // Recurse + concat
  return [...quicksort(left), pivot, ...quicksort(right)];
}

/* --- Usage --- */
const nums = [3, 7, 2, 9, 1, 5, 4, 8, 6];
console.log(quicksort(nums)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(nums);            // original untouched
