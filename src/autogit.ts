function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return [];
    
    // Find min and max values
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    
    // Initialize count array
    const count: number[] = new Array(range).fill(0);
    
    // Count occurrences of each value
    for (const num of arr) {
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

// Example usage:
const unsorted = [4, 2, 2, 8, 3, 3, 1];
const sorted = countingSort(unsorted);
console.log(sorted); // [1, 2, 2, 3, 3, 4, 8]
function countingSortOptimized(arr: number[]): number[] {
    if (arr.length === 0) return [];
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    
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
    
    // Build output array in reverse for stability
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        const index = count[num - min] - 1;
        output[index] = num;
        count[num - min]--;
    }
    
    return output;
}
interface SortableObject {
    id: number;
    // other properties...
}

function countingSortObjects(
    arr: SortableObject[], 
    keyExtractor: (obj: SortableObject) => number
): SortableObject[] {
    if (arr.length === 0) return [];
    
    // Extract keys
    const keys = arr.map(keyExtractor);
    const min = Math.min(...keys);
    const max = Math.max(...keys);
    const range = max - min + 1;
    
    const count: number[] = new Array(range).fill(0);
    const output: SortableObject[] = new Array(arr.length);
    
    // Count occurrences
    for (const key of keys) {
        count[key - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable sort)
    for (let i = arr.length - 1; i >= 0; i--) {
        const obj = arr[i];
        const key = keyExtractor(obj);
        const index = count[key - min] - 1;
        output[index] = obj;
        count[key - min]--;
    }
    
    return output;
}

// Example usage with objects:
const objects = [
    { id: 3, name: "Charlie" },
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 1, name: "Anna" }
];

const sortedObjects = countingSortObjects(objects, obj => obj.id);
console.log(sortedObjects);
