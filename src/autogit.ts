function interpolationSearch(
  arr: number[],
  target: number,
  low: number = 0,
  high: number = arr.length - 1
): number {
  // Handle edge cases
  if (arr.length === 0) return -1;
  if (low > high) return -1;
  
  // Prevent division by zero and ensure array is sorted
  if (arr[low] === arr[high]) {
    return arr[low] === target ? low : -1;
  }
  
  // Calculate position using interpolation formula
  const position = Math.floor(
    low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
  );
  
  // Ensure position is within bounds
  if (position < low || position > high) {
    return -1;
  }
  
  // Compare and recurse
  if (arr[position] === target) {
    return position;
  } else if (arr[position] < target) {
    return interpolationSearch(arr, target, position + 1, high);
  } else {
    return interpolationSearch(arr, target, low, position - 1);
  }
}

// Iterative version (optional)
function interpolationSearchIterative(
  arr: number[],
  target: number
): number {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      return arr[low] === target ? low : -1;
    }
    
    const position = Math.floor(
      low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );
    
    if (arr[position] === target) {
      return position;
    }
    
    if (arr[position] < target) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  
  return -1;
}
// Example usage
const sortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const target = 60;

const result = interpolationSearch(sortedArray, target);
console.log(`Element ${target} found at index: ${result}`);

// Test with different scenarios
const testCases = [
  { arr: [1, 2, 3, 4, 5], target: 3, expected: 2 },
  { arr: [10, 20, 30, 40, 50], target: 25, expected: -1 },
  { arr: [], target: 5, expected: -1 },
  { arr: [5], target: 5, expected: 0 },
];

testCases.forEach(({ arr, target, expected }) => {
  const result = interpolationSearch(arr, target);
  console.log(`Search for ${target} in [${arr}]: ${result} (expected: ${expected})`);
});
// Performance comparison helper
function measurePerformance(arr: number[], target: number): void {
  const startTime = performance.now();
  const result = interpolationSearch(arr, target);
  const endTime = performance.now();
  
  console.log(`Interpolation search: ${endTime - startTime}ms, result: ${result}`);
}

// Generate a large uniformly distributed array
const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2);
measurePerformance(largeArray, 500000);
