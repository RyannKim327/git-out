function binarySearch(
  arr: number[],         // Sorted array to search
  target: number,        // Value to search for
  left: number = 0,      // Left boundary of current search segment
  right: number = arr.length - 1 // Right boundary
): number {               // Returns index of target or -1 if not found

  if (left > right) {
    // Search space exhausted, target not found
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return mid; // Found the target
  } else if (arr[mid] > target) {
    // Search in the left half
    return binarySearch(arr, target, left, mid - 1);
  } else {
    // Search in the right half
    return binarySearch(arr, target, mid + 1, right);
  }
}

// Example usage:
const sortedArr = [1, 3, 5, 7, 9, 11];
const targetValue = 7;

const index = binarySearch(sortedArr, targetValue);
console.log(index); // Output: 3
