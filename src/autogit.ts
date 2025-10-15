// Helper function: Counting sort for a specific digit position
function countingSortByDigit(
  arr: number[], 
  exp: number, 
  min: number, 
  max: number
): number[] {
  const n = arr.length;
  const range = max - min + 1;
  const output = new Array(n);
  const count = new Array(range).fill(0);
  
  // Count occurrences of each digit
  for (let i = 0; i < n; i++) {
    const index = Math.floor((arr[i] / exp) % 10) + (-min); // Adjust for negative numbers
    count[index]++;
  }
  
  // Calculate cumulative counts
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const index = Math.floor((arr[i] / exp) % 10) + (-min);
    output[count[index] - 1] = arr[i];
    count[index]--;
  }
  
  return output;
}

// Main radix sort function
function radixSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  // Find min and max values
  let min = arr[0];
  let max = arr[0];
  
  for (let num of arr) {
    min = Math.min(min, num);
    max = Math.max(max, num);
  }
  
  // If all numbers are the same, return early
  if (min === max) return arr;
  
  // Get the number of digits required for the largest number
  const maxDigits = Math.floor(Math.log10(Math.abs(max))) + 1;
  
  // Perform counting sort for each digit position
  let result = [...arr];
  let exp = 1;
  
  for (let digit = 0; digit < maxDigits; digit++) {
    result = countingSortByDigit(result, exp, min, max);
    exp *= 10;
  }
  
  return result;
}

// Alternative implementation for non-negative numbers only (simpler)
function radixSortNonNegative(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  // Find max value to determine number of digits
  let max = arr[0];
  for (let num of arr) {
    max = Math.max(max, num);
  }
  
  // If all numbers are the same, return early
  if (max === arr[0]) return arr;
  
  const maxDigits = Math.floor(Math.log10(max)) + 1;
  let result = [...arr];
  let exp = 1;
  
  for (let digit = 0; digit < maxDigits; digit++) {
    result = countingSortNonNegativeHelper(result, exp);
    exp *= 10;
  }
  
  return result;
}

function countingSortNonNegativeHelper(arr: number[], exp: number): number[] {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    const digit = Math.floor((arr[i] / exp) % 10);
    count[digit]++;
  }
  
  // Change count[i] so that count[i] now contains actual position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor((arr[i] / exp) % 10);
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  return output;
}

// Example usage and testing
function testRadixSort() {
  // Test with positive numbers
  const positiveArr = [170, 45, 75, 90, 802, 24, 2, 66];
  console.log("Original:", positiveArr);
  const sortedPositive = radixSortNonNegative(positiveArr);
  console.log("Sorted:", sortedPositive);
  
  // Test with mixed numbers (positive and negative)
  const mixedArr = [170, -45, 75, 90, -802, 24, 2, -66];
  console.log("\nOriginal (mixed):", mixedArr);
  const sortedMixed = radixSort(mixedArr);
  console.log("Sorted (mixed):", sortedMixed);
  
  // Test with all identical numbers
  const identicalArr = [5, 5, 5, 5];
  console.log("\nOriginal (identical):", identicalArr);
  const sortedIdentical = radixSort(identicalArr);
  console.log("Sorted (identical):", sortedIdentical);
  
  // Test with single element
  const singleElement = [42];
  console.log("\nOriginal (single):", singleElement);
  const sortedSingle = radixSort(singleElement);
  console.log("Sorted (single):", sortedSingle);
}

// Run the test
testRadixSort();
const numbers = [170, 45, 75, 90, 802, 24, 2, 66];
const sorted = radixSortNonNegative(numbers);
console.log(sorted); // [2, 24, 45, 66, 75, 90, 170, 802]
