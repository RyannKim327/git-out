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
function mergeSortInPlace<T>(
    array: T[],
    comparator: (a: T, b: T) => number = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
): void {
    if (array.length <= 1) return;

    const temp = [...array];
    mergeSortHelper(array, temp, 0, array.length - 1, comparator);
}

function mergeSortHelper<T>(
    array: T[],
    temp: T[],
    left: number,
    right: number,
    comparator: (a: T, b: T) => number
): void {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);
    
    mergeSortHelper(array, temp, left, middle, comparator);
    mergeSortHelper(array, temp, middle + 1, right, comparator);
    mergeInPlace(array, temp, left, middle, right, comparator);
}

function mergeInPlace<T>(
    array: T[],
    temp: T[],
    left: number,
    middle: number,
    right: number,
    comparator: (a: T, b, T) => number
): void {
    // Copy both halves to temp array
    for (let i = left; i <= right; i++) {
        temp[i] = array[i];
    }

    let i = left;
    let j = middle + 1;
    let k = left;

    while (i <= middle && j <= right) {
        if (comparator(temp[i], temp[j]) <= 0) {
            array[k] = temp[i];
            i++;
        } else {
            array[k] = temp[j];
            j++;
        }
        k++;
    }

    // Copy remaining left elements
    while (i <= middle) {
        array[k] = temp[i];
        i++;
        k++;
    }
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

// With custom comparator
const strings = ["banana", "apple", "cherry"];
const sortedStrings = mergeSort(strings, (a, b) => a.localeCompare(b));
console.log(sortedStrings); // ["apple", "banana", "cherry"]

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

const sortedByAge = mergeSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{name: "Alice", age: 25}, {name: "John", age: 30}, {name: "Bob", age: 35}]

// In-place sorting
const numbersToSort = [64, 34, 25, 12, 22, 11, 90];
mergeSortInPlace(numbersToSort);
console.log(numbersToSort); // [11, 12, 22, 25, 34, 64, 90]
