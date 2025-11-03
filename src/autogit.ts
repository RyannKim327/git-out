/**
 * In-place selection sort.
 * Returns the *same* array, now sorted in ascending order.
 */
function selectionSort<T>(arr: T[]): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Assume the minimum is the first unsorted element
    let minIdx = i;

    // Find the real minimum in the remaining unsorted part
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap only if a smaller element was found
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/* ---------- Usage ---------- */
const nums = [64, 25, 12, 22, 11];
console.log('before:', nums);
selectionSort(nums);
console.log('after: ', nums);

// Works for any comparable type
const words = ['pear', 'apple', 'orange', 'banana'];
console.log(selectionSort(words));
