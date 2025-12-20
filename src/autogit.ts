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
        if (left[leftIndex] <= right[rightIndex]) {
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
function mergeSort<T>(
    array: T[],
    comparator: (a: T, b: T) => number = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
): T[] {
    if (array.length <= 1) {
        return array;
    }
    
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    
    return merge(
        mergeSort(left, comparator),
        mergeSort(right, comparator),
        comparator
    );
}

function merge<T>(
    left: T[],
    right: T[],
    comparator: (a: T, b: T) => number
): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (comparator(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
function mergeSortInPlace<T>(array: T[]): T[] {
    const tempArray = new Array(array.length);
    mergeSortHelper(array, tempArray, 0, array.length - 1);
    return array;
}

function mergeSortHelper<T>(
    array: T[],
    tempArray: T[],
    leftStart: number,
    rightEnd: number
): void {
    if (leftStart >= rightEnd) return;
    
    const middle = Math.floor((leftStart + rightEnd) / 2);
    mergeSortHelper(array, tempArray, leftStart, middle);
    mergeSortHelper(array, tempArray, middle + 1, rightEnd);
    mergeHalves(array, tempArray, leftStart, rightEnd);
}

function mergeHalves<T>(
    array: T[],
    tempArray: T[],
    leftStart: number,
    rightEnd: number
): void {
    const leftEnd = Math.floor((leftStart + rightEnd) / 2);
    const rightStart = leftEnd + 1;
    const size = rightEnd - leftStart + 1;
    
    let left = leftStart;
    let right = rightStart;
    let index = leftStart;
    
    while (left <= leftEnd && right <= rightEnd) {
        if (array[left] <= array[right]) {
            tempArray[index] = array[left];
            left++;
        } else {
            tempArray[index] = array[right];
            right++;
        }
        index++;
    }
    
    // Copy remaining elements
    array.copyWithin(index, left, leftEnd + 1);
    array.copyWithin(index, right, rightEnd + 1);
    
    // Copy back from temp array
    for (let i = leftStart; i <= rightEnd; i++) {
        array[i] = tempArray[i];
    }
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// With custom comparator for descending order
const descendingComparator = (a: number, b: number) => b - a;
console.log(mergeSort(numbers, descendingComparator)); // [90, 64, 34, 25, 22, 12, 11]

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

const byAge = (a: Person, b: Person) => a.age - b.age;
console.log(mergeSort(people, byAge));
// [{ name: "Bob", age: 25 }, { name: "Alice", age: 30 }, { name: "Charlie", age: 35 }]

// Sorting strings
const strings = ["banana", "apple", "cherry"];
console.log(mergeSort(strings)); // ["apple", "banana", "cherry"]
