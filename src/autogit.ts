function mergeSortIterative(arr: number[]): number[] {
  const n = arr.length;
  let currentSize = 1;

  // Helper function to merge two sorted subarrays
  function merge(left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }

    // Copy any remaining elements from leftArr
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    // Copy any remaining elements from rightArr
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  }

  while (currentSize < n) {
    // Merge subarrays in pairs
    for (let leftStart = 0; leftStart < n - currentSize; leftStart += 2 * currentSize) {
      const mid = leftStart + currentSize - 1;
      const rightEnd = Math.min(leftStart + 2 * currentSize - 1, n - 1);
      merge(leftStart, mid, rightEnd);
    }
    currentSize *= 2;
  }

  return arr;
}

// Example usage:
const array = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSortIterative(array));  // [3, 9, 10, 27, 38, 43, 82]
