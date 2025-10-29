function bubbleSort(arr: number[]): number[] {
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
        
        // If no swaps occurred in this pass, array is sorted
        if (!swapped) break;
    }
    
    return arr;
}
function bubbleSortGeneric<T>(
    arr: T[],
    compareFn: (a: T, b: T) => number = (a, b) => a > b ? 1 : -1
): T[] {
    const n = arr.length;
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (compareFn(arr[j], arr[j + 1]) > 0) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return arr;
}
// Basic usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// Generic usage with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
const sortedStrings = bubbleSortGeneric(strings, (a, b) => a.localeCompare(b));
console.log(sortedStrings); // ['apple', 'banana', 'cherry', 'date']

// Generic usage with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 }
];

const sortedByAge = bubbleSortGeneric(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{ name: 'Bob', age: 20 }, { name: 'John', age: 25 }, { name: 'Alice', age: 30 }]
