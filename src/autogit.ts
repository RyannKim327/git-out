function mergeSortIterative<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const result = [...array];
    const temp = new Array(array.length);
    
    // Start with subarrays of size 1 and double each time
    for (let size = 1; size < result.length; size *= 2) {
        for (let left = 0; left < result.length; left += 2 * size) {
            const mid = Math.min(left + size, result.length);
            const right = Math.min(left + 2 * size, result.length);
            
            merge(result, temp, left, mid, right);
        }
    }
    
    return result;
}

function merge<T>(
    array: T[], 
    temp: T[], 
    left: number, 
    mid: number, 
    right: number
): void {
    let i = left;
    let j = mid;
    let k = left;
    
    // Copy the current segment to temporary array
    for (let index = left; index < right; index++) {
        temp[index] = array[index];
    }
    
    // Merge the two sorted halves
    while (i < mid && j < right) {
        if (temp[i] <= temp[j]) {
            array[k++] = temp[i++];
        } else {
            array[k++] = temp[j++];
        }
    }
    
    // Copy remaining elements from left half
    while (i < mid) {
        array[k++] = temp[i++];
    }
    
    // Copy remaining elements from right half
    while (j < right) {
        array[k++] = temp[j++];
    }
}

// Generic version with comparator
function mergeSortIterativeWithComparator<T>(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }

    const result = [...array];
    const temp = new Array(array.length);
    
    for (let size = 1; size < result.length; size *= 2) {
        for (let left = 0; left < result.length; left += 2 * size) {
            const mid = Math.min(left + size, result.length);
            const right = Math.min(left + 2 * size, result.length);
            
            mergeWithComparator(result, temp, left, mid, right, compareFn);
        }
    }
    
    return result;
}

function mergeWithComparator<T>(
    array: T[], 
    temp: T[], 
    left: number, 
    mid: number, 
    right: number,
    compareFn: (a: T, b: T) => number
): void {
    let i = left;
    let j = mid;
    let k = left;
    
    for (let index = left; index < right; index++) {
        temp[index] = array[index];
    }
    
    while (i < mid && j < right) {
        if (compareFn(temp[i], temp[j]) <= 0) {
            array[k++] = temp[i++];
        } else {
            array[k++] = temp[j++];
        }
    }
    
    while (i < mid) {
        array[k++] = temp[i++];
    }
    
    while (j < right) {
        array[k++] = temp[j++];
    }
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSortIterative(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

// With custom comparator
const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSortIterativeWithComparator(
    strings, 
    (a, b) => a.localeCompare(b)
);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]

// Complex objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = mergeSortIterativeWithComparator(
    people,
    (a, b) => a.age - b.age
);
console.log(sortedByAge);
// [{name: "Bob", age: 25}, {name: "Alice", age: 30}, {name: "Charlie", age: 35}]
// Performance test utility
function testPerformance<T>(array: T[], sortFn: (arr: T[]) => T[]): void {
    const start = performance.now();
    const sorted = sortFn(array);
    const end = performance.now();
    
    console.log(`Sorted ${array.length} elements in ${(end - start).toFixed(2)}ms`);
    console.log(`First 10 elements: ${sorted.slice(0, 10).join(', ')}`);
}

// Test with large array
const largeArray = Array.from({ length: 10000 }, () => 
    Math.floor(Math.random() * 1000000)
);

testPerformance(largeArray, mergeSortIterative);
