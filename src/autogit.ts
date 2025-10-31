function insertionSort(arr: number[]): number[] {
    const sortedArray = [...arr]; // Create a copy to avoid mutating original array
    
    for (let i = 1; i < sortedArray.length; i++) {
        const current = sortedArray[i];
        let j = i - 1;
        
        // Shift elements greater than current to the right
        while (j >= 0 && sortedArray[j] > current) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        // Insert current at correct position
        sortedArray[j + 1] = current;
    }
    
    return sortedArray;
}
function insertionSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const sortedArray = [...arr];
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    for (let i = 1; i < sortedArray.length; i++) {
        const current = sortedArray[i];
        let j = i - 1;
        
        while (j >= 0 && compare(sortedArray[j], current) > 0) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        sortedArray[j + 1] = current;
    }
    
    return sortedArray;
}
function insertionSortInPlace(arr: number[]): void {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = current;
    }
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(insertionSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// Generic usage with numbers
const sortedNumbers = insertionSortGeneric([3, 1, 4, 1, 5, 9, 2]);
console.log(sortedNumbers); // [1, 1, 2, 3, 4, 5, 9]

// Generic usage with strings
const strings = ["banana", "apple", "cherry"];
const sortedStrings = insertionSortGeneric(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry"]

// Generic usage with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = insertionSortGeneric(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{ name: "Bob", age: 25 }, { name: "Alice", age: 30 }, { name: "Charlie", age: 35 }]
