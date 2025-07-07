function mergeSortIterative<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
  const n = array.length;
  const arr = array.slice(); // Make a copy to avoid mutating input

  // Default compare function for numbers if none provided
  const compare = compareFn || ((a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  // Merge function to combine two sorted subarrays
  const merge = (left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid);
    const rightArr = arr.slice(mid, right);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (compare(leftArr[i], rightArr[j]) <= 0) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
      }
    }

    // Copy remaining elements if any
    while (i < leftArr.length) {
      arr[k++] = leftArr[i++];
    }
    while (j < rightArr.length) {
      arr[k++] = rightArr[j++];
    }
  };

  // Iteratively merge subarrays of increasing size
  for (let size = 1; size < n; size *= 2) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = Math.min(start + size, n);
      const end = Math.min(start + size * 2, n);
      merge(start, mid, end);
    }
  }

  return arr;
}

// Example usage:
const numbers = [5, 3, 8, 4, 2, 7, 1, 6];
const sortedNumbers = mergeSortIterative(numbers);
console.log(sortedNumbers); // [1, 2, 3, 4, 5, 6, 7, 8]

// With custom compare function for strings:
const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSortIterative(strings, (a, b) => a.localeCompare(b));
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]
