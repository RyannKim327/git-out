function selectionSort(arr: number[]): number[] {
    const arrayCopy = [...arr]; // Create a copy to avoid mutating original
    const n = arrayCopy.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Assume current position is the minimum
        let minIndex = i;
        
        // Find the actual minimum in the remaining unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arrayCopy[j] < arrayCopy[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap if a smaller element was found
        if (minIndex !== i) {
            [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
        }
    }
    
    return arrayCopy;
}
function selectionSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const arrayCopy = [...arr];
    const n = arrayCopy.length;
    const compare = compareFn || ((a: T, b: T) => a < b ? -1 : a > b ? 1 : 0);
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (compare(arrayCopy[j], arrayCopy[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
        }
    }
    
    return arrayCopy;
}
// Basic usage with numbers
const numbers = [64, 25, 12, 22, 11];
console.log(selectionSort(numbers)); // [11, 12, 22, 25, 64]

// Generic usage with numbers
console.log(selectionSortGeneric(numbers)); // [11, 12, 22, 25, 64]

// Generic usage with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log(selectionSortGeneric(strings)); // ["apple", "banana", "cherry", "date"]

// Generic usage with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];

// Sort by age
const sortedByAge = selectionSortGeneric(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{name: "Jane", age: 25}, {name: "John", age: 30}, {name: "Bob", age: 35}]

// Sort by name
const sortedByName = selectionSortGeneric(people, (a, b) => 
    a.name.localeCompare(b.name)
);
console.log(sortedByName);
// [{name: "Bob", age: 35}, {name: "Jane", age: 25}, {name: "John", age: 30}]
function selectionSortInPlace(arr: number[]): void {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            // Traditional swap using temporary variable
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}
