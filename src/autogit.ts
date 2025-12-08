function countingSort(arr: number[]): number[] {
    if (arr.length <= 1) return [...arr];
    
    // Find the maximum value to determine the range
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    // Initialize count array
    const count = new Array(range).fill(0);
    
    // Count occurrences of each element
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the sorted array
    const sorted = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        sorted[count[num - min] - 1] = num;
        count[num - min]--;
    }
    
    return sorted;
}
interface CountingSortOptions<T> {
    keyExtractor?: (item: T) => number;
    min?: number;
    max?: number;
}

function countingSortGeneric<T>(
    arr: T[],
    options: CountingSortOptions<T> = {}
): T[] {
    if (arr.length <= 1) return [...arr];
    
    const { keyExtractor = (x: T) => x as unknown as number, min, max } = options;
    
    // Determine range
    let actualMin = min ?? Infinity;
    let actualMax = max ?? -Infinity;
    
    if (min === undefined || max === undefined) {
        for (const item of arr) {
            const key = keyExtractor(item);
            actualMin = Math.min(actualMin, key);
            actualMax = Math.max(actualMax, key);
        }
    }
    
    const range = actualMax - actualMin + 1;
    
    // Initialize count array
    const count = new Array(range).fill(0);
    const originalItems: T[] = new Array(range);
    
    // Count occurrences and store original items
    for (const item of arr) {
        const key = keyExtractor(item);
        const index = key - actualMin;
        count[index]++;
        originalItems[index] = item; // Store one instance for reconstruction
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the sorted array
    const sorted = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const item = arr[i];
        const key = keyExtractor(item);
        const index = key - actualMin;
        sorted[count[index] - 1] = item;
        count[index]--;
    }
    
    return sorted;
}
// Basic usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
const sortedNumbers = countingSort(numbers);
console.log(sortedNumbers); // [1, 2, 2, 3, 3, 4, 8]

// Sorting objects by numeric property
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 20 },
    { name: "Charlie", age: 25 },
    { name: "David", age: 18 }
];

const sortedPeople = countingSortGeneric(people, {
    keyExtractor: (person) => person.age
});

console.log(sortedPeople);
// [
//     { name: "David", age: 18 },
//     { name: "Bob", age: 20 },
//     { name: "Alice", age: 25 },
//     { name: "Charlie", age: 25 }
// ]
// Optimized version for better performance
function optimizedCountingSort(arr: number[]): number[] {
    if (arr.length <= 1) return [...arr];
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    
    // Count elements
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
    
    // Reconstruct sorted array directly
    let index = 0;
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            arr[index++] = i + min;
            count[i]--;
        }
    }
    
    return arr;
}
