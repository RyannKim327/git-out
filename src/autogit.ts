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
    
    // Add remaining elements from both arrays
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}
// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]
function mergeSortAdvanced<T>(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }
    
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    
    return mergeAdvanced(
        mergeSortAdvanced(left, compareFn),
        mergeSortAdvanced(right, compareFn),
        compareFn
    );
}

function mergeAdvanced<T>(left: T[], right: T[], compareFn: (a: T, b: T) => number): T[] {
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
    
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

// Usage with custom comparator
const objects = [
    { name: "John", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Bob", age: 20 }
];

const sortedByAge = mergeSortAdvanced(objects, (a, b) => a.age - b.age);
console.log(sortedByAge);
