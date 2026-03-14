/**
 * Selection Sort – stable‑like, O(n²) time, O(1) extra space.
 *
 * @param arr   The array to be sorted (in‑place).
 * @param cmp   Optional comparator: (a, b) => number.
 *              If omitted, numerical ascending order is assumed.
 */
export function selectionSort<T>(
  arr: T[],
  cmp?: (a: T, b: T) => number
): void {
  const compare = cmp ?? ((a: any, b: any) => a - b);

  for (let i = 0; i < arr.length - 1; i++) {
    // Assume the smallest is at i.
    let minIdx = i;

    // Search the rest of the array for a smaller element.
    for (let j = i + 1; j < arr.length; j++) {
      if (compare(arr[j], arr[minIdx]) < 0) {
        minIdx = j;
      }
    }

    // If the smallest isn't already in place, swap.
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
}
const nums = [64, 25, 12, 22, 11];
selectionSort(nums);
console.log(nums); // → [11, 12, 22, 25, 64]

const words = ["pear", "apple", "orange"];
selectionSort(words, (a, b) => a.localeCompare(b));
console.log(words); // → ["apple", "orange", "pear"]
