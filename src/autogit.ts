function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return [];
    
    // Find min and max values
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    // Create count array
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    
    // Count occurrences
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

// Example usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
const sorted = countingSort(numbers);
console.log(sorted); // [1, 2, 2, 3, 3, 4, 8]
function countingSort<T>(
    arr: T[],
    getKey: (item: T) => number,
    min?: number,
    max?: number
): T[] {
    if (arr.length === 0) return [];
    
    // Calculate min/max if not provided
    const actualMin = min ?? Math.min(...arr.map(getKey));
    const actualMax = max ?? Math.max(...arr.map(getKey));
    
    const range = actualMax - actualMin + 1;
    const count = new Array(range).fill(0);
    const output: T[] = new Array(arr.length);
    
    // Count occurrences
    for (const item of arr) {
        count[getKey(item) - actualMin]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable sort)
    for (let i = arr.length - 1; i >= 0; i--) {
        const key = getKey(arr[i]);
        output[count[key - actualMin] - 1] = arr[i];
        count[key - actualMin]--;
    }
    
    return output;
}

// Example usage with objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 25 },
    { name: "Jane", age: 20 },
    { name: "Bob", age: 25 },
    { name: "Alice", age: 20 }
];

const sortedByAge = countingSort(
    people,
    (person) => person.age
);

console.log(sortedByAge);
// [
//   { name: "Jane", age: 20 },
//   { name: "Alice", age: 20 },
//   { name: "John", age: 25 },
//   { name: "Bob", age: 25 }
// ]
function countingSortOptimized(arr: number[]): number[] {
    if (arr.length === 0) return [];
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    
    // Count occurrences
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Calculate starting positions
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    const sorted = new Array(arr.length);
    
    // Build sorted array (backwards for stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        sorted[count[num - min] - 1] = num;
        count[num - min]--;
    }
    
    return sorted;
}
// For better performance with large arrays
function countingSortWithPrecomputedRange(
    arr: number[],
    knownMin: number,
    knownMax: number
): number[] {
    // Implementation similar to basic version
    // But uses provided min/max to avoid expensive Math.min/Math.max calls
}
