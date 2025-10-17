function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;
    
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
    const sorted: number[] = [];
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            sorted.push(i + min);
            count[i]--;
        }
    }
    
    return sorted;
}

// Example usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
const sorted = countingSort(numbers);
console.log(sorted); // [1, 2, 2, 3, 3, 4, 8]
interface SortableObject {
    key: number;
    // Can include other properties
    data?: any;
}

function countingSortObjects(
    arr: SortableObject[],
    keySelector: (obj: SortableObject) => number = obj => obj.key
): SortableObject[] {
    if (arr.length === 0) return arr;
    
    // Extract keys
    const keys = arr.map(keySelector);
    const max = Math.max(...keys);
    const min = Math.min(...keys);
    const range = max - min + 1;
    
    // Count occurrences
    const count: SortableObject[][] = new Array(range).fill(null).map(() => []);
    for (const obj of arr) {
        const key = keySelector(obj);
        count[key - min].push(obj);
    }
    
    // Reconstruct sorted array
    const sorted: SortableObject[] = [];
    for (let i = 0; i < count.length; i++) {
        sorted.push(...count[i]);
    }
    
    return sorted;
}

// Example usage with objects
const objects = [
    { key: 3, name: 'Charlie' },
    { key: 1, name: 'Alice' },
    { key: 2, name: 'Bob' },
    { key: 1, name: 'Anna' }
];

const sortedObjects = countingSortObjects(objects);
console.log(sortedObjects);
// [
//   { key: 1, name: 'Alice' },
//   { key: 1, name: 'Anna' },
//   { key: 2, name: 'Bob' },
//   { key: 3, name: 'Charlie' }
// ]
function countingSortOptimized(arr: number[]): number[] {
    if (arr.length <= 1) return [...arr];
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    // Count occurrences
    const count = new Array(range).fill(0);
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Calculate cumulative positions (optional optimization)
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        output[count[num - min] - 1] = num;
        count[num - min]--;
    }
    
    return output;
}
