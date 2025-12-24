function selectionSort<T>(array: T[]): T[] {
    const arr = [...array]; // Create a copy to avoid mutating the original
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find the minimum element in the unsorted part
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}
function selectionSort<T>(
    array: T[],
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (compareFn(arr[j], arr[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}
// Basic usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = selectionSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

// With strings
const strings = ["banana", "apple", "cherry"];
const sortedStrings = selectionSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry"]

// With custom comparator (descending order)
const descendingSort = selectionSort(numbers, (a, b) => b - a);
console.log(descendingSort); // [90, 64, 34, 25, 22, 12, 11]

// With objects
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
function selectionSortInPlace<T>(array: T[]): void {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
}
