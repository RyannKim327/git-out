/**
 * Selection Sort (ascending order)
 * Time:  O(n²)
 * Space: O(1)  (in-place)
 */
function selectionSort<T>(arr: T[]): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // find the smallest element in the remaining unsorted part
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    // swap the found minimum with the first unsorted element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/* ---------- Usage example ---------- */
const nums = [64, 25, 12, 22, 11];
console.log(selectionSort([...nums])); // [11, 12, 22, 25, 64]

const words = ['pear', 'apple', 'banana', 'cherry'];
console.log(selectionSort([...words])); // ["apple", "banana", "cherry", "pear"]
