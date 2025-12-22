function insertionSort(arr: number[]): number[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const currentElement = sortedArray[i];
        let j = i - 1;
        
        // Move elements that are greater than currentElement one position ahead
        while (j >= 0 && sortedArray[j] > currentElement) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        // Insert the currentElement at its correct position
        sortedArray[j + 1] = currentElement;
    }
    
    return sortedArray;
}
function insertionSortGeneric<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const currentElement = sortedArray[i];
        let j = i - 1;
        
        while (j >= 0 && compareFn(sortedArray[j], currentElement) > 0) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        sortedArray[j + 1] = currentElement;
    }
    
    return sortedArray;
}
// Basic usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", insertionSort(numbers));

// Generic usage with numbers
console.log("Generic sorted:", insertionSortGeneric(numbers));

// Generic usage with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log("Strings sorted:", insertionSortGeneric(strings));

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
console.log("People sorted by age:", sortedByAge);

const sortedByName = insertionSortGeneric(people, (a, b) => a.name.localeCompare(b.name));
console.log("People sorted by name:", sortedByName);
function insertionSortInPlace(arr: number[]): void {
    for (let i = 1; i < arr.length; i++) {
        const currentElement = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > currentElement) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = currentElement;
    }
}

// Usage
const mutableArray = [64, 34, 25, 12, 22, 11, 90];
insertionSortInPlace(mutableArray);
console.log("In-place sorted:", mutableArray);
