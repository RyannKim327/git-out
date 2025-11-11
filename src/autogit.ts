function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;
    
    // Find min and max values
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    // Calculate range
    const range = max - min + 1;
    
    // Initialize count array
    const count = new Array(range).fill(0);
    
    // Count occurrences
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Reconstruct sorted array
    const result: number[] = [];
    for (let i = 0; i < range; i++) {
        for (let j = 0; j < count[i]; j++) {
            result.push(i + min);
        }
    }
    
    return result;
}
interface SortableItem {
    key: number;
    // Can include other properties
    value?: any;
}

function countingSortGeneric<T extends SortableItem>(
    items: T[], 
    keyExtractor: (item: T) => number = (item) => item.key
): T[] {
    if (items.length === 0) return items;
    
    const keys = items.map(keyExtractor);
    const min = Math.min(...keys);
    const max = Math.max(...keys);
    const range = max - min + 1;
    
    // Count occurrences
    const count = new Array(range).fill(0);
    for (const key of keys) {
        count[key - min]++;
    }
    
    // Calculate positions
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable sort)
    const output = new Array(items.length);
    for (let i = items.length - 1; i >= 0; i--) {
        const key = keyExtractor(items[i]);
        output[count[key - min] - 1] = items[i];
        count[key - min]--;
    }
    
    return output;
}
class CountingSort {
    // Basic implementation for numbers only
    static sortNumbers(arr: number[]): number[] {
        if (arr.length <= 1) return [...arr];
        
        const min = Math.min(...arr);
        const max = Math.max(...arr);
        const range = max - min + 1;
        
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
        
        // Build output array (stable)
        for (let i = arr.length - 1; i >= 0; i--) {
            const num = arr[i];
            output[count[num - min] - 1] = num;
            count[num - min]--;
        }
        
        return output;
    }
    
    // Generic implementation for objects
    static sort<T>(
        items: T[],
        getKey: (item: T) => number
    ): T[] {
        if (items.length <= 1) return [...items];
        
        const keys = items.map(getKey);
        const min = Math.min(...keys);
        const max = Math.max(...keys);
        const range = max - min + 1;
        
        const count = new Array(range).fill(0);
        const output = new Array(items.length);
        
        // Count occurrences
        for (const key of keys) {
            count[key - min]++;
        }
        
        // Calculate cumulative counts
        for (let i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output array (stable)
        for (let i = items.length - 1; i >= 0; i--) {
            const key = getKey(items[i]);
            output[count[key - min] - 1] = items[i];
            count[key - min]--;
        }
        
        return output;
    }
}

// Example usage and tests
const testNumbers = [4, 2, 2, 8, 3, 3, 1];
console.log('Original:', testNumbers);
console.log('Sorted:', CountingSort.sortNumbers(testNumbers));

// Example with objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 20 },
    { name: 'Charlie', age: 25 },
    { name: 'David', age: 18 }
];

console.log('\nPeople sorted by age:');
const sortedPeople = CountingSort.sort(people, person => person.age);
sortedPeople.forEach(p => console.log(`${p.name}: ${p.age}`));

// Test with negative numbers
const negativeTest = [-3, -1, -2, 0, 2, 1, -4];
console.log('\nNegative numbers:', CountingSort.sortNumbers(negativeTest));
