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
    
    // Default comparison function for numbers/strings
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
// Test the implementations
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ["banana", "apple", "cherry", "date"];

console.log("Original:", numbers);
console.log("Sorted:", selectionSort(numbers));

console.log("Strings sorted:", selectionSortGeneric(strings));

// With custom comparison for descending order
console.log("Descending:", selectionSortGeneric(numbers, (a, b) => b - a));

// Sorting objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

console.log("People by age:", selectionSortGeneric(people, (a, b) => a.age - b.age));
// Helper to measure performance
function measurePerformance<T>(sortFn: (arr: T[]) => T[], arr: T[]): void {
    const start = performance.now();
    const result = sortFn(arr);
    const end = performance.now();
    
    console.log(`Sorted ${arr.length} elements in ${(end - start).toFixed(2)}ms`);
}

// Test with larger array
const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
measurePerformance(selectionSort, largeArray);
