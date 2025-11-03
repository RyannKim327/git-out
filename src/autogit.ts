function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
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
    
    // Add remaining elements from either left or right array
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); // [11, 12, 22, 25, 34, 64, 90]
function mergeSort<T>(arr: T[]): T[] {
    if (arr.length <= 1) {
        return arr;
    }
    
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    
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

// Usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(numbers));

// Usage with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log(mergeSort(strings)); // ["apple", "banana", "cherry", "date"]
function mergeSort<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (arr.length <= 1) {
        return arr;
    }
    
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    
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

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(numbers)); // Default ascending order

// Descending order
console.log(mergeSort(numbers, (a, b) => b - a));

// Custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

// Sort by age
console.log(mergeSort(people, (a, b) => a.age - b.age));
function mergeSortInPlace(arr: number[]): void {
    if (arr.length <= 1) return;
    
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    
    mergeSortInPlace(left);
    mergeSortInPlace(right);
    
    mergeInPlace(arr, left, right);
}

function mergeInPlace(arr: number[], left: number[], right: number[]): void {
    let leftIndex = 0;
    let rightIndex = 0;
    let arrIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            arr[arrIndex] = left[leftIndex];
            leftIndex++;
        } else {
            arr[arrIndex] = right[rightIndex];
            rightIndex++;
        }
        arrIndex++;
    }
    
    // Copy remaining elements
    while (leftIndex < left.length) {
        arr[arrIndex] = left[leftIndex];
        leftIndex++;
        arrIndex++;
    }
    
    while (rightIndex < right.length) {
        arr[arrIndex] = right[rightIndex];
        rightIndex++;
        arrIndex++;
    }
}

// Usage
const array = [64, 34, 25, 12, 22, 11, 90];
mergeSortInPlace(array);
console.log(array); // [11, 12, 22, 25, 34, 64, 90]
