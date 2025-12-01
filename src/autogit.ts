function selectionSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const arr = [...array]; // Create a copy to avoid mutating original array
    const n = arr.length;
    const comparator = compareFn || ((a: T, b: T) => a < b ? -1 : (a > b ? 1 : 0));

    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in the unsorted part
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (comparator(arr[j], arr[minIndex]) < 0) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element of unsorted part
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}
// Sorting numbers (default comparator)
const numbers = [64, 25, 12, 22, 11];
const sortedNumbers = selectionSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 64]

// Sorting strings (default comparator)
const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = selectionSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]

// Custom comparator for descending order
const descendingNumbers = selectionSort(numbers, (a, b) => b - a);
console.log(descendingNumbers); // [64, 25, 22, 12, 11]

// Custom objects with custom comparator
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 }
];

const sortedByAge = selectionSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{ name: "Alice", age: 25 }, { name: "John", age: 30 }, { name: "Bob", age: 35 }]
function selectionSortInPlace<T>(
    array: T[], 
    compareFn?: (a: T, b: T) => number
): void {
    const n = array.length;
    const comparator = compareFn || ((a: T, b: T) => a < b ? -1 : (a > b ? 1 : 0));

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (comparator(array[j], array[minIndex]) < 0) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
}
