function selectionSort(arr: number[]): number[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Assume the current position has the minimum value
        let minIndex = i;
        
        // Find the index of the minimum element in the remaining unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (sortedArray[j] < sortedArray[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the element at position i
        if (minIndex !== i) {
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        }
    }
    
    return sortedArray;
}
function selectionSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const sortedArray = [...arr];
    const n = sortedArray.length;
    
    // Default comparison function for numbers and strings
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (compare(sortedArray[j], sortedArray[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        }
    }
    
    return sortedArray;
}
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
            // Swap using temporary variable
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}
// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ["banana", "apple", "cherry", "date"];

// Basic number sorting
console.log("Original:", numbers);
console.log("Sorted:", selectionSort(numbers));

// Generic sorting with numbers
console.log("Generic number sort:", selectionSortGeneric(numbers));

// Generic sorting with strings
console.log("String sort:", selectionSortGeneric(strings));

// Generic sorting with custom comparison
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = selectionSortGeneric(people, (a, b) => a.age - b.age);
console.log("Sorted by age:", sortedByAge);

// In-place sorting
const mutableArray = [64, 34, 25, 12, 22, 11, 90];
selectionSortInPlace(mutableArray);
console.log("In-place sorted:", mutableArray);
