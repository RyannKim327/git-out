function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;
    
    // Find min and max values
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    // Initialize count array
    const count = new Array(range).fill(0);
    
    // Count occurrences of each number
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Reconstruct sorted array
    const sorted: number[] = [];
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            sorted.push(i + min);
            count[i]--;
        }
    }
    
    return sorted;
}
function countingSort(
    arr: number[],
    min?: number,
    max?: number
): number[] {
    // Handle empty array
    if (arr.length === 0) return [];
    
    // Determine range if not provided
    const actualMin = min ?? Math.min(...arr);
    const actualMax = max ?? Math.max(...arr);
    const range = actualMax - actualMin + 1;
    
    // Validate parameters
    if (range <= 0) {
        throw new Error("Invalid range: min must be less than or equal to max");
    }
    
    if (range > 1000000) {
        throw new Error("Range too large for counting sort");
    }
    
    // Initialize count array
    const count = new Array(range).fill(0);
    
    // Count occurrences
    for (const num of arr) {
        if (num < actualMin || num > actualMax) {
            throw new Error(`Value ${num} is out of the specified range [${actualMin}, ${actualMax}]`);
        }
        count[num - actualMin]++;
    }
    
    // Build sorted array
    const sorted: number[] = [];
    for (let i = 0; i < range; i++) {
        for (let j = 0; j < count[i]; j++) {
            sorted.push(i + actualMin);
        }
    }
    
    return sorted;
}
// Basic usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
const sorted = countingSort(numbers);
console.log(sorted); // [1, 2, 2, 3, 3, 4, 8]

// With known range
const numbers2 = [10, 15, 12, 11, 13];
const sorted2 = countingSort(numbers2, 10, 15);
console.log(sorted2); // [10, 11, 12, 13, 15]

// Edge cases
console.log(countingSort([])); // []
console.log(countingSort([5])); // [5]
interface SortableObject {
    key: number;
    // ... other properties
}

function countingSortObjects(
    arr: SortableObject[],
    keyExtractor: (obj: SortableObject) => number
): SortableObject[] {
    if (arr.length === 0) return [];
    
    // Extract keys and find range
    const keys = arr.map(keyExtractor);
    const min = Math.min(...keys);
    const max = Math.max(...keys);
    const range = max - min + 1;
    
    // Initialize arrays
    const count = new Array(range).fill(0);
    const output: SortableObject[] = new Array(arr.length);
    
    // Count occurrences
    for (const obj of arr) {
        const key = keyExtractor(obj);
        count[key - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable sort)
    for (let i = arr.length - 1; i >= 0; i--) {
        const key = keyExtractor(arr[i]);
        output[count[key - min] - 1] = arr[i];
        count[key - min]--;
    }
    
    return output;
}

// Usage
const objects = [
    { key: 3, name: "Charlie" },
    { key: 1, name: "Alice" },
    { key: 2, name: "Bob" }
];

const sortedObjects = countingSortObjects(objects, obj => obj.key);
console.log(sortedObjects);
// [{ key: 1, name: "Alice" }, { key: 2, name: "Bob" }, { key: 3, name: "Charlie" }]
