function selectionSort<T>(array: T[]): T[] {
    const arr = [...array]; // Create a copy to avoid mutating the original
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find the index of the minimum element in the unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element of unsorted portion
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}
function selectionSort<T>(
    array: T[],
    comparator?: (a: T, b: T) => number
): T[] {
    const arr = [...array];
    const n = arr.length;
    
    // Default comparator for primitive types
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (compare(arr[j], arr[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}
// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(selectionSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// Example 2: Sorting strings
const strings = ["banana", "apple", "cherry", "date"];
console.log(selectionSort(strings)); // ["apple", "banana", "cherry", "date"]

// Example 3: Sorting with custom comparator (descending order)
const descendingComparator = (a: number, b: number) => b - a;
console.log(selectionSort(numbers, descendingComparator)); // [90, 64, 34, 25, 22, 12, 11]

// Example 4: Sorting custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 25 },
    { name: "Jane", age: 30 },
    { name: "Bob", age: 20 }
];

const ageComparator = (a: Person, b: Person) => a.age - b.age;
console.log(selectionSort(people, ageComparator));
// [{ name: "Bob", age: 20 }, { name: "John", age: 25 }, { name: "Jane", age: 30 }]
