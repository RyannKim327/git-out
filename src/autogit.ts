function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];
  
  // Find the maximum value in the array
  const max = Math.max(...arr);
  
  // Initialize count array
  const count = new Array(max + 1).fill(0);
  
  // Count occurrences of each number
  for (const num of arr) {
    count[num]++;
  }
  
  // Build the sorted array
  const sorted: number[] = [];
  for (let i = 0; i <= max; i++) {
    for (let j = 0; j < count[i]; j++) {
      sorted.push(i);
    }
  }
  
  return sorted;
}
function countingSortEfficient(arr: number[]): number[] {
  if (arr.length === 0) return [];
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  
  // Initialize count array
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  
  // Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }
  
  // Calculate cumulative counts
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    output[count[num - min] - 1] = num;
    count[num - min]--;
  }
  
  return output;
}
interface CountingSortOptions {
  min?: number;
  max?: number;
}

function countingSortGeneric(
  arr: number[], 
  options?: CountingSortOptions
): number[] {
  if (arr.length === 0) return [];
  
  // Determine min and max values
  const min = options?.min ?? Math.min(...arr);
  const max = options?.max ?? Math.max(...arr);
  const range = max - min + 1;
  
  // Validate input
  if (min > max) {
    throw new Error("Minimum cannot be greater than maximum");
  }
  
  // Initialize count array
  const count = new Array(range).fill(0);
  
  // Count occurrences
  for (const num of arr) {
    if (num < min || num > max) {
      throw new Error(`Value ${num} is outside the specified range [${min}, ${max}]`);
    }
    count[num - min]++;
  }
  
  // Build sorted array
  const sorted: number[] = [];
  for (let i = 0; i < range; i++) {
    for (let j = 0; j < count[i]; j++) {
      sorted.push(i + min);
    }
  }
  
  return sorted;
}
// Example usage
const numbers = [4, 2, 2, 8, 3, 3, 1];

console.log("Original array:", numbers);
console.log("Sorted (basic):", countingSort(numbers));
console.log("Sorted (efficient):", countingSortEfficient(numbers));
console.log("Sorted (generic):", countingSortGeneric(numbers));

// With custom range
console.log("Sorted with custom range:", countingSortGeneric(numbers, { min: 1, max: 8 }));

// Performance test
const largeArray = Array.from({ length: 10000 }, () => 
  Math.floor(Math.random() * 100)
);

console.time("Counting Sort");
const sortedLarge = countingSortEfficient(largeArray);
console.timeEnd("Counting Sort");
