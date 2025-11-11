function mergeSort<T>(array: T[]): T[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (array.length <= 1) {
        return array;
    }
    
    // Find the middle point to divide the array into two halves
    const middle = Math.floor(array.length / 2);
    
    // Divide the array into left and right halves
    const leftHalf = array.slice(0, middle);
    const rightHalf = array.slice(middle);
    
    // Recursively sort both halves
    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);
    
    // Merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Compare elements from both arrays and add the smaller one to result
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    // Add remaining elements from left array (if any)
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }
    
    // Add remaining elements from right array (if any)
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }
    
    return result;
}
function mergeSort<T>(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }
    
    const middle = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, middle);
    const rightHalf = array.slice(middle);
    
    const sortedLeft = mergeSort(leftHalf, compareFn);
    const sortedRight = mergeSort(rightHalf, compareFn);
    
    return mergeWithComparator(sortedLeft, sortedRight, compareFn);
}

function mergeWithComparator<T>(
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
    
    // Add remaining elements
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
function mergeSortInPlace<T>(array: T[]): void {
    const tempArray = new Array(array.length);
    mergeSortHelper(array, tempArray, 0, array.length - 1);
}

function mergeSortHelper<T>(
    array: T[], 
    tempArray: T[], 
    left: number, 
    right: number
): void {
    if (left >= right) {
        return;
    }
    
    const middle = Math.floor((left + right) / 2);
    
    // Recursively sort both halves
    mergeSortHelper(array, tempArray, left, middle);
    mergeSortHelper(array, tempArray, middle + 1, right);
    
    // Merge the sorted halves
    mergeInPlace(array, tempArray, left, middle, right);
}

function mergeInPlace<T>(
    array: T[], 
    tempArray: T[], 
    left: number, 
    middle: number, 
    right: number
): void {
    // Copy both halves into the temporary array
    for (let i = left; i <= right; i++) {
        tempArray[i] = array[i];
    }
    
    let leftIndex = left;
    let rightIndex = middle + 1;
    let current = left;
    
    // Merge the two halves back into the original array
    while (leftIndex <= middle && rightIndex <= right) {
        if (tempArray[leftIndex] <= tempArray[rightIndex]) {
            array[current] = tempArray[leftIndex];
            leftIndex++;
        } else {
            array[current] = tempArray[rightIndex];
            rightIndex++;
        }
        current++;
    }
    
    // Copy the remaining elements of left half
    while (leftIndex <= middle) {
        array[current] = tempArray[leftIndex];
        current++;
        leftIndex++;
    }
}
// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", mergeSort(numbers));
// Output: [11, 12, 22, 25, 34, 64, 90]

// Example 2: Sorting strings
const fruits = ["banana", "apple", "cherry", "date"];
console.log("Original:", fruits);
console.log("Sorted:", mergeSort(fruits));
// Output: ["apple", "banana", "cherry", "date"]

// Example 3: Using custom comparator (descending order)
const scores = [85, 92, 78, 96, 88];
const descendingSort = mergeSort(scores, (a, b) => b - a);
console.log("Descending:", descendingSort);
// Output: [96, 92, 88, 85, 78]

// Example 4: Sorting objects
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
console.log("Sorted by age:", sortedByAge);
// Output: [{name: "Bob", age: 25}, {name: "Alice", age: 30}, {name: "Charlie", age: 35}]

// Example 5: In-place sorting
const mutableArray = [5, 2, 8, 1, 9];
console.log("Before in-place:", mutableArray);
mergeSortInPlace(mutableArray);
console.log("After in-place:", mutableArray);
