function interpolationSearch(
  arr: number[],
  target: number,
  low: number = 0,
  high: number = arr.length - 1
): number {
  // Handle edge cases
  if (arr.length === 0) return -1;
  if (low > high) return -1;
  
  // Check if target is within the current bounds
  if (target < arr[low] || target > arr[high]) return -1;

  // Calculate the position using interpolation formula
  const pos = low + Math.floor(
    ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
  );

  // Check if calculated position is within bounds
  if (pos < low || pos > high) return -1;

  if (arr[pos] === target) {
    return pos; // Found the target
  } else if (arr[pos] < target) {
    // Search in the right subarray
    return interpolationSearch(arr, target, pos + 1, high);
  } else {
    // Search in the left subarray
    return interpolationSearch(arr, target, low, pos - 1);
  }
}
function interpolationSearch(
  arr: number[],
  target: number,
  low: number = 0,
  high: number = arr.length - 1
): number {
  // Validation checks
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }
  
  if (arr.length === 0) return -1;
  
  // Ensure array is sorted
  if (!isSorted(arr)) {
    throw new Error('Array must be sorted for interpolation search');
  }

  // Boundary checks
  if (target < arr[low] || target > arr[high]) return -1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // Prevent division by zero and handle uniform arrays
    if (arr[low] === arr[high]) {
      if (arr[low] === target) return low;
      return -1;
    }

    // Calculate probe position using interpolation formula
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    // Safety check to avoid infinite loops
    if (pos < low || pos > high) break;

    if (arr[pos] === target) {
      return pos; // Found the target
    } else if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return -1; // Target not found
}

// Helper function to check if array is sorted
function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}
function interpolationSearchIterative(
  arr: number[],
  target: number
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (arr[low] === arr[high]) {
      if (arr[low] === target) return low;
      break;
    }

    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    if (pos < low || pos > high) break;

    if (arr[pos] === target) {
      return pos;
    } else if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return -1;
}
// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

console.log(interpolationSearch(sortedArray, 7));  // Output: 3
console.log(interpolationSearch(sortedArray, 15)); // Output: 7
console.log(interpolationSearch(sortedArray, 20)); // Output: -1

// Using the iterative version
console.log(interpolationSearchIterative(sortedArray, 9)); // Output: 4
