function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return [];
    
    // Find min and max values
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    // Handle case where all elements are the same
    if (min === max) return [...arr];
    
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences of each number
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
}
interface SortableItem {
    key: number;
    // Add other properties as needed
}

function countingSortGeneric<T extends SortableItem>(
    arr: T[], 
    keySelector: (item: T) => number = (item) => item.key
): T[] {
    if (arr.length === 0) return [];
    
    const keys = arr.map(keySelector);
    const min = Math.min(...keys);
    const max = Math.max(...keys);
    
    if (min === max) return [...arr];
    
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[keys[i] - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable sort)
    for (let i = arr.length - 1; i >= 0; i--) {
        const position = count[keys[i] - min] - 1;
        output[position] = arr[i];
        count[keys[i] - min]--;
    }
    
    return output;
}
// Basic usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
const sorted = countingSort(numbers);
console.log(sorted); // [1, 2, 2, 3, 3, 4, 8]

// Generic usage with objects
const items = [
    { key: 4, name: 'Item4' },
    { key: 2, name: 'Item2' },
    { key: 2, name: 'Item2Duplicate' },
    { key: 8, name: 'Item8' }
];

const sortedItems = countingSortGeneric(items);
console.log(sortedItems);
// [
//     { key: 2, name: 'Item2' },
//     { key: 2, name: 'Item2Duplicate' },
//     { key: 4, name: 'Item4' },
//     { key: 8, name: 'Item8' }
// ]

// With custom key selector
const sortedByCustomKey = countingSortGeneric(
    items, 
    item => item.key * 2 // Example transformation
);
function countingSortEnhanced(arr: number[]): number[] {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    if (arr.length === 0) return [];
    
    // Validate all elements are integers
    if (!arr.every(Number.isInteger)) {
        throw new Error('All array elements must be integers');
    }
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    // Handle very large ranges
    const range = max - min + 1;
    if (range > 1000000) {
        throw new Error('Range too large for counting sort');
    }
    
    if (min === max) return [...arr];
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
}
