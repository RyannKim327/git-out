function mergeSortIterative<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const result = [...array];
    const temp = new Array(array.length);
    
    // Start with subarrays of size 1 and double each time
    for (let size = 1; size < array.length; size *= 2) {
        for (let leftStart = 0; leftStart < array.length; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, array.length);
            const rightEnd = Math.min(leftStart + 2 * size, array.length);
            
            merge(
                result, 
                temp, 
                leftStart, 
                mid, 
                rightEnd
            );
        }
        
        // Copy temp array back to result for next iteration
        for (let i = 0; i < array.length; i++) {
            result[i] = temp[i];
        }
    }
    
    return result;
}

function merge<T>(
    array: T[], 
    temp: T[], 
    leftStart: number, 
    mid: number, 
    rightEnd: number
): void {
    let left = leftStart;
    let right = mid;
    let index = leftStart;
    
    // Merge the two subarrays
    while (left < mid && right < rightEnd) {
        if (array[left] <= array[right]) {
            temp[index++] = array[left++];
        } else {
            temp[index++] = array[right++];
        }
    }
    
    // Copy remaining elements from left subarray
    while (left < mid) {
        temp[index++] = array[left++];
    }
    
    // Copy remaining elements from right subarray
    while (right < rightEnd) {
        temp[index++] = array[right++];
    }
}

// Example usage with type safety
interface Person {
    name: string;
    age: number;
}

const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSortIterative(numbers);
console.log('Sorted numbers:', sortedNumbers);

const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSortIterative(strings);
console.log('Sorted strings:', sortedStrings);

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

// Custom comparator version
function mergeSortIterativeWithComparator<T>(
    array: T[], 
    compare: (a: T, b: T) => number
): T[] {
    if (array.length <= 1) {
        return array;
    }

    const result = [...array];
    const temp = new Array(array.length);
    
    for (let size = 1; size < array.length; size *= 2) {
        for (let leftStart = 0; leftStart < array.length; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, array.length);
            const rightEnd = Math.min(leftStart + 2 * size, array.length);
            
            mergeWithComparator(
                result, 
                temp, 
                leftStart, 
                mid, 
                rightEnd,
                compare
            );
        }
        
        for (let i = 0; i < array.length; i++) {
            result[i] = temp[i];
        }
    }
    
    return result;
}

function mergeWithComparator<T>(
    array: T[], 
    temp: T[], 
    leftStart: number, 
    mid: number, 
    rightEnd: number,
    compare: (a: T, b: T) => number
): void {
    let left = leftStart;
    let right = mid;
    let index = leftStart;
    
    while (left < mid && right < rightEnd) {
        if (compare(array[left], array[right]) <= 0) {
            temp[index++] = array[left++];
        } else {
            temp[index++] = array[right++];
        }
    }
    
    while (left < mid) {
        temp[index++] = array[left++];
    }
    
    while (right < rightEnd) {
        temp[index++] = array[right++];
    }
}

// Sort people by age
const sortedPeople = mergeSortIterativeWithComparator(
    people, 
    (a, b) => a.age - b.age
);
console.log('Sorted people by age:', sortedPeople);
// Basic usage
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const sorted = mergeSortIterative(arr);

// With custom comparator
const sortedDescending = mergeSortIterativeWithComparator(
    arr, 
    (a, b) => b - a
);

// Sorting objects
interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: "Laptop", price: 1000 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 }
];

const sortedProducts = mergeSortIterativeWithComparator(
    products,
    (a, b) => a.price - b.price
);
