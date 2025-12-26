/**
 * Bubble Sort (ascending order)
 * Mutates the input array in-place and also returns it for convenience.
 * Time complexity: O(n²) worst/average, O(n) best (if already sorted).
 */
function bubbleSort<T>(arr: T[]): T[] {
  const n = arr.length;
  let swapped: boolean;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    // After each pass, the largest element among the unsorted
    // portion is bubbled to the end, so we can shorten the loop.
    n--;
  } while (swapped);

  return arr;
}

/* ---------- Usage ---------- */
const nums = [64, 34, 25, 12, 22, 11, 90];
console.log('Before:', nums);
bubbleSort(nums);
console.log('After: ', nums);

const words = ['pear', 'apple', 'orange', 'banana'];
bubbleSort(words);
console.log(words); // [ 'apple', 'banana', 'orange', 'pear' ]
