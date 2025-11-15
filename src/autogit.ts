/**
 * In-place Bubble Sort (ascending order).
 * Mutates the original array and returns it for convenience.
 * O(n²) time, O(1) space.
 */
function bubbleSort<T>(arr: T[]): T[] {
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
    // so next pass can ignore the last item.
  } while (swapped);

  return arr;
}

/* ---------- Usage ---------- */
const nums = [7, 3, 1, 4, 9, 2];
console.log(bubbleSort(nums)); // [1, 2, 3, 4, 7, 9]

const words = ['pear', 'apple', 'banana'];
console.log(bubbleSort(words)); // ['apple', 'banana', 'pear']
