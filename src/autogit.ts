function mergeSort<T>(array: T[]): T[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (array.length <= 1) {
        return array;
    }

    // Find the middle point to divide the array into two halves
    const middle = Math.floor(array.length / 2);
    
    // Divide the array into left and right halves
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Recursively sort both halves and merge them
    return merge(mergeSort(left), mergeSort(right));
}

function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from both arrays and add the smaller one to result
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add remaining elements from left array
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // Add remaining elements from right array
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result;
}
// Example usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

// Example usage with strings
const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]
function mergeSortWithComparator<T>(
    array: T[], 
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return mergeWithComparator(
        mergeSortWithComparator(left, comparator),
        mergeSortWithComparator(right, comparator),
        comparator
    );
}

function mergeWithComparator<T>(
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
// Custom comparator for descending order
const descendingComparator = (a: number, b: number) => b - a;
const descendingSorted = mergeSortWithComparator(numbers, descendingComparator);
console.log(descendingSorted); // [90, 64, 34, 25, 22, 12, 11]

// Custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 }
];

const sortedByAge = mergeSortWithComparator(
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
    startIdx: number,
    endIdx: number,
    auxiliaryArray: T[]
): void {
    if (startIdx === endIdx) return;
    
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
    mergeInPlace(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
}

function mergeInPlace<T>(
    mainArray: T[],
    startIdx: number,
    middleIdx: number,
    endIdx: number,
    auxiliaryArray: T[]
): void {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            mainArray[k] = auxiliaryArray[i];
            i++;
        } else {
            mainArray[k] = auxiliaryArray[j];
            j++;
        }
        k++;
    }

    while (i <= middleIdx) {
        mainArray[k] = auxiliaryArray[i];
        i++;
        k++;
    }

    while (j <= endIdx) {
        mainArray[k] = auxiliaryArray[j];
        j++;
        k++;
    }
}
