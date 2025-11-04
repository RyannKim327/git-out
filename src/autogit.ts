function selectionSort<T>(arr: T[]): T[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;

    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in the unsorted portion
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            // Compare elements (works for numbers, strings, etc.)
            if (sortedArray[j] < sortedArray[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first unsorted element
        if (minIndex !== i) {
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        }
    }
    
    return sortedArray;
}
// Example with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
const sortedNumbers = selectionSort(numbers);
console.log("Sorted:", sortedNumbers);
console.log("Original unchanged:", numbers); // Original array is unchanged

// Example with strings
const fruits = ["banana", "apple", "cherry", "date"];
console.log("Original:", fruits);
const sortedFruits = selectionSort(fruits);
console.log("Sorted:", sortedFruits);

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

function selectionSortByAge(people: Person[]): Person[] {
    const sorted = [...people];
    const n = sorted.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (sorted[j].age < sorted[minIndex].age) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [sorted[i], sorted[minIndex]] = [sorted[minIndex], sorted[i]];
        }
    }
    
    return sorted;
}

const sortedByAge = selectionSortByAge(people);
console.log("Sorted by age:", sortedByAge);
function selectionSortInPlace<T>(arr: T[]): void {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            // Swap elements
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

// Usage
const mutableArray = [64, 34, 25, 12, 22, 11, 90];
selectionSortInPlace(mutableArray);
console.log("Sorted in place:", mutableArray);
function selectionSortWithComparator<T>(
    arr: T[], 
    comparator: (a: T, b: T) => number = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
): T[] {
    const sortedArray = [...arr];
    const n = sortedArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (comparator(sortedArray[j], sortedArray[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        }
    }
    
    return sortedArray;
}

// Usage with custom comparator for descending order
const descendingComparator = (a: number, b: number) => (a > b ? -1 : a < b ? 1 : 0);
const numbersDesc = [1, 5, 3, 9, 2];
const sortedDesc = selectionSortWithComparator(numbersDesc, descendingComparator);
console.log("Sorted descending:", sortedDesc); // [9, 5, 3, 2, 1]
