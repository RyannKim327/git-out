function insertionSort(arr: number[]): number[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const current = sortedArray[i];
        let j = i - 1;
        
        // Shift elements greater than current to the right
        while (j >= 0 && sortedArray[j] > current) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        // Insert current in correct position
        sortedArray[j + 1] = current;
    }
    
    return sortedArray;
}
function insertionSortGeneric<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const current = sortedArray[i];
        let j = i - 1;
        
        while (j >= 0 && compareFn(sortedArray[j], current) > 0) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        sortedArray[j + 1] = current;
    }
    
    return sortedArray;
}
// Basic number sorting
function insertionSort(arr: number[]): number[] {
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const current = sortedArray[i];
        let j = i - 1;
        
        while (j >= 0 && sortedArray[j] > current) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        sortedArray[j + 1] = current;
    }
    
    return sortedArray;
}

// Generic version for any comparable type
function insertionSortGeneric<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number
): T[] {
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const current = sortedArray[i];
        let j = i - 1;
        
        while (j >= 0 && compareFn(sortedArray[j], current) > 0) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        sortedArray[j + 1] = current;
    }
    
    return sortedArray;
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', insertionSort(numbers));

// Using generic version with numbers
const sortedNumbers = insertionSortGeneric(numbers, (a, b) => a - b);
console.log('Generic sorted:', sortedNumbers);

// Using with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
const sortedStrings = insertionSortGeneric(strings, (a, b) => a.localeCompare(b));
console.log('Sorted strings:', sortedStrings);

// Using with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];

const sortedByAge = insertionSortGeneric(people, (a, b) => a.age - b.age);
console.log('Sorted by age:', sortedByAge);
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

// Usage
const mutableArray = [64, 34, 25, 12, 22, 11, 90];
insertionSortInPlace(mutableArray);
console.log('In-place sorted:', mutableArray); // Original array is modified
