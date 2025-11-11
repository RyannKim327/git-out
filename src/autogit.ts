function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;
    
    // Find the maximum value to determine the range
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    // Create count array with size based on the range
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    
    // Count occurrences of each element
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    
    // Modify count array to store cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
}
interface CountingSortResult {
    sortedArray: number[];
    executionTime: number;
}

function enhancedCountingSort(arr: number[]): CountingSortResult {
    // Input validation
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    if (arr.length === 0) {
        return { sortedArray: [], executionTime: 0 };
    }
    
    // Validate that all elements are integers
    if (!arr.every(num => Number.isInteger(num))) {
        throw new Error('All elements must be integers');
    }
    
    const startTime = performance.now();
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    // Handle negative numbers properly
    const range = max - min + 1;
    
    // Check for reasonable range size to prevent memory issues
    if (range > 1000000) {
        throw new Error('Range too large for counting sort. Consider a different algorithm.');
    }
    
    const count: number[] = new Array(range).fill(0);
    const output: number[] = new Array(arr.length);
    
    // Count occurrences
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable sort)
    for (let i = arr.length - 1; i >= 0; i--) {
        const currentNum = arr[i];
        const countIndex = currentNum - min;
        output[count[countIndex] - 1] = currentNum;
        count[countIndex]--;
    }
    
    const executionTime = performance.now() - startTime;
    
    return { sortedArray: output, executionTime };
}
interface Sortable {
    value: number;
    originalIndex?: number;
}

function genericCountingSort<T>(
    arr: T[],
    getKey: (item: T) => number
): T[] {
    if (arr.length === 0) return arr;
    
    const keys = arr.map(getKey);
    const min = Math.min(...keys);
    const max = Math.max(...keys);
    const range = max - min + 1;
    
    const count: number[] = new Array(range).fill(0);
    const output: T[] = new Array(arr.length);
    
    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[keys[i] - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const key = keys[i];
        output[count[key - min] - 1] = arr[i];
        count[key - min]--;
    }
    
    return output;
}
// Basic usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
console.log('Original:', numbers);
console.log('Sorted:', countingSort(numbers));

// Enhanced version usage
try {
    const result = enhancedCountingSort([1, 4, 1, 2, 7, 5, 2]);
    console.log('Sorted:', result.sortedArray);
    console.log('Execution time:', result.executionTime, 'ms');
} catch (error) {
    console.error('Error:', error.message);
}

// Generic version usage
const objects = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 }
];

const sortedByAge = genericCountingSort(objects, obj => obj.age);
console.log('Sorted by age:', sortedByAge);

// Sorting strings by length
const strings = ['a', 'aaa', 'aa', 'aaaa', 'aa'];
const sortedByLength = genericCountingSort(strings, str => str.length);
console.log('Sorted by length:', sortedByLength);
