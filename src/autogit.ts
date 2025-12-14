function mergeSort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }
    
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));
}

function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
function mergeSort<T>(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }
    
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    
    return merge(
        mergeSort(left, compareFn), 
        mergeSort(right, compareFn), 
        compareFn
    );
}

function merge<T>(
    left: T[], 
    right: T[], 
    compareFn: (a: T, b: T) => number
): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
function mergeSortInPlace<T>(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): void {
    const tempArray = new Array(array.length);
    mergeSortHelper(array, tempArray, 0, array.length - 1, compareFn);
}

function mergeSortHelper<T>(
    array: T[], 
    tempArray: T[], 
    start: number, 
    end: number, 
    compareFn: (a: T, b: T) => number
): void {
    if (start < end) {
        const middle = Math.floor((start + end) / 2);
        
        mergeSortHelper(array, tempArray, start, middle, compareFn);
        mergeSortHelper(array, tempArray, middle + 1, end, compareFn);
        mergeInPlace(array, tempArray, start, middle, end, compareFn);
    }
}

function mergeInPlace<T>(
    array: T[], 
    tempArray: T[], 
    start: number, 
    middle: number, 
    end: number, 
    compareFn: (a: T, b: T) => number
): void {
    let leftIndex = start;
    let rightIndex = middle + 1;
    let tempIndex = start;
    
    while (leftIndex <= middle && rightIndex <= end) {
        if (compareFn(array[leftIndex], array[rightIndex]) <= 0) {
            tempArray[tempIndex] = array[leftIndex];
            leftIndex++;
        } else {
            tempArray[tempIndex] = array[rightIndex];
            rightIndex++;
        }
        tempIndex++;
    }
    
    while (leftIndex <= middle) {
        tempArray[tempIndex] = array[leftIndex];
        leftIndex++;
        tempIndex++;
    }
    
    while (rightIndex <= end) {
        tempArray[tempIndex] = array[rightIndex];
        rightIndex++;
        tempIndex++;
    }
    
    for (let i = start; i <= end; i++) {
        array[i] = tempArray[i];
    }
}
// Basic usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// Usage with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log(mergeSort(strings)); // ["apple", "banana", "cherry", "date"]

// Custom comparator for descending order
const descendingNumbers = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(descendingNumbers, (a, b) => b - a)); // [90, 64, 34, 25, 22, 12, 11]

// Custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = mergeSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge); // Sorted by age ascending

// In-place sorting
const arrayToSort = [64, 34, 25, 12, 22, 11, 90];
mergeSortInPlace(arrayToSort);
console.log(arrayToSort); // Original array is now sorted
