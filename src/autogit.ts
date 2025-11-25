function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}
function optimizedBubbleSort<T>(arr: T[]): T[] {
    const n = arr.length;
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no swaps occurred, array is sorted
        if (!swipped) break;
    }
    
    return arr;
}
function genericBubbleSort<T>(
    arr: T[],
    comparator: (a: T, b: T) => boolean = (a, b) => a > b
): T[] {
    const n = arr.length;
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (comparator(arr[j], arr[j + 1])) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return arr;
}
// Number array
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// String array
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log(genericBubbleSort(strings)); // ['apple', 'banana', 'cherry', 'date']

// Custom objects with comparator
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];

const sortedByAge = genericBubbleSort(people, (a, b) => a.age > b.age);
console.log(sortedByAge);
function safeBubbleSort<T>(
    arr: T[],
    comparator?: (a: T, b: T) => boolean
): T[] {
    // Input validation
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    // Create a copy to avoid mutating the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    
    // Default comparator for numbers and strings
    const defaultComparator = (a: T, b: T): boolean => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a > b;
        }
        return String(a) > String(b);
    };
    
    const comp = comparator || defaultComparator;
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (comp(sortedArray[j], sortedArray[j + 1])) {
                // Swap elements
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return sortedArray;
}
