function countingSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  // Find min and max values
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  
  // Create count array
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  
  // Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }
  
  // Reconstruct sorted array
  const result: number[] = [];
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      result.push(i + min);
      count[i]--;
    }
  }
  
  return result;
}
interface CountingSortOptions {
  min?: number;
  max?: number;
}

function countingSortEnhanced(
  arr: number[], 
  options?: CountingSortOptions
): number[] {
  if (arr.length <= 1) return [...arr];
  
  // Determine range with optional parameters
  const min = options?.min ?? Math.min(...arr);
  const max = options?.max ?? Math.max(...arr);
  
  // Validate input
  if (min > max) {
    throw new Error("Invalid range: min cannot be greater than max");
  }
  
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  
  // Count elements
  for (const num of arr) {
    if (num < min || num > max) {
      throw new Error(`Element ${num} is out of the specified range [${min}, ${max}]`);
    }
    count[num - min]++;
  }
  
  // Build sorted array
  const sortedArray: number[] = [];
  for (let i = 0; i < range; i++) {
    for (let j = 0; j < count[i]; j++) {
      sortedArray.push(i + min);
    }
  }
  
  return sortedArray;
}
function countingSortGeneric<T>(
  arr: T[],
  keyExtractor: (item: T) => number,
  options?: CountingSortOptions
): T[] {
  if (arr.length <= 1) return [...arr];
  
  const numericKeys = arr.map(keyExtractor);
  const min = options?.min ?? Math.min(...numericKeys);
  const max = options?.max ?? Math.max(...numericKeys);
  
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const buckets: T[][] = new Array(range).fill(null).map(() => []);
  
  // Count and bucket elements
  for (let i = 0; i < arr.length; i++) {
    const key = keyExtractor(arr[i]);
    const index = key - min;
    
    if (key < min || key > max) {
      throw new Error(`Key ${key} is out of range [${min}, ${max}]`);
    }
    
    count[index]++;
    buckets[index].push(arr[i]);
  }
  
  // Build sorted array
  const sortedArray: T[] = [];
  for (let i = 0; i < range; i++) {
    sortedArray.push(...buckets[i]);
  }
  
  return sortedArray;
}

// Example usage with objects
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 }
];

const sortedByAge = countingSortGeneric(
  people,
  (person) => person.age
);
function countingSortOptimized(arr: number[]): number[] {
  if (arr.length <= 1) return [...arr];
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  
  const count = new Array(range).fill(0);
  
  // Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }
  
  // Calculate cumulative positions
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const pos = count[num - min] - 1;
    output[pos] = num;
    count[num - min]--;
  }
  
  return output;
}
// Basic usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
const sorted = countingSort(numbers);
console.log(sorted); // [1, 2, 2, 3, 3, 4, 8]

// With range constraints
const constrained = countingSortEnhanced(numbers, { min: 2, max: 5 });
console.log(constrained); // [2, 2, 3, 3, 4]

// Generic usage
const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
const sortedItems = countingSortGeneric(items, item => item.value);
console.log(sortedItems); // [{ value: 1 }, { value: 2 }, { value: 3 }]
