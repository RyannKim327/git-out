function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    const sortedArray = [...arr]; // Create a copy to avoid mutating original
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                // Swap elements
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
            }
        }
    }
    
    return sortedArray;
}
function optimizedBubbleSort<T>(arr: T[]): T[] {
    const n = arr.length;
    const sortedArray = [...arr];
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                // Swap elements
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is already sorted
        if (!swapped) {
            break;
        }
    }
    
    return sortedArray;
}
function genericBubbleSort<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const n = arr.length;
    const sortedArray = [...arr];
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (compareFn(sortedArray[j], sortedArray[j + 1]) > 0) {
                // Swap elements
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
    }
    
    return sortedArray;
}
// Basic usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// With strings using generic version
const strings = ["banana", "apple", "cherry", "date"];
console.log(genericBubbleSort(strings)); // ["apple", "banana", "cherry", "date"]

// With custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 }
];

const sortedByAge = genericBubbleSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{name: "Alice", age: 25}, {name: "John", age: 30}, {name: "Bob", age: 35}]
function bubbleSortInPlace(arr: number[]): void {
    const n = arr.length;
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
    }
}
