function mergeSort<T>(array: T[]): T[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (array.length <= 1) {
        return array;
    }

    // Find the middle point to divide the array into two halves
    const middle = Math.floor(array.length / 2);
    
    // Split the array into left and right halves
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Recursively sort both halves and merge them
    return merge(mergeSort(left), mergeSort(right));
}

function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from both arrays and merge them in sorted order
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
    return result.concat(
        left.slice(leftIndex),
        right.slice(rightIndex)
    );
}
// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]
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

    return result.concat(
        left.slice(leftIndex),
        right.slice(rightIndex)
    );
}
// Sort numbers in descending order
const descendingNumbers = mergeSort(
    [64, 34, 25, 12, 22, 11, 90],
    (a, b) => b - a
);
console.log(descendingNumbers); // [90, 64, 34, 25, 22, 12, 11]

// Sort objects by a specific property
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = mergeSort(
    people,
    (a, b) => a.age - b.age
);
console.log(sortedByAge); // Sorted by age ascending
function mergeSortInPlace<T>(array: T[]): T[] {
    if (array.length <= 1) return array;

    const auxiliaryArray = [...array];
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
    return array;
}

function mergeSortHelper<T>(
    mainArray: T[],
    start: number,
    end: number,
    auxiliaryArray: T[]
): void {
    if (start === end) return;
    
    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(auxiliaryArray, start, middle, mainArray);
    mergeSortHelper(auxiliaryArray, middle + 1, end, mainArray);
    mergeArrays(mainArray, start, middle, end, auxiliaryArray);
}

function mergeArrays<T>(
    mainArray: T[],
    start: number,
    middle: number,
    end: number,
    auxiliaryArray: T[]
): void {
    let i = start;
    let j = middle + 1;
    let k = start;

    while (i <= middle && j <= end) {
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            mainArray[k] = auxiliaryArray[i];
            i++;
        } else {
            mainArray[k] = auxiliaryArray[j];
            j++;
        }
        k++;
    }

    while (i <= middle) {
        mainArray[k] = auxiliaryArray[i];
        i++;
        k++;
    }

    while (j <= end) {
        mainArray[k] = auxiliaryArray[j];
        j++;
        k++;
    }
}
