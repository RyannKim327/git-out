function mergeSort<T>(array: T[]): T[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (array.length <= 1) {
        return array;
    }

    // Find the middle index
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
console.log('Original:', numbers);
console.log('Sorted:', mergeSort(numbers));

// Example usage with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Original:', strings);
console.log('Sorted:', mergeSort(strings));

// Example usage with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];

// Sort by age
const sortedByAge = mergeSort(people.map(p => p.age));
console.log('Ages sorted:', sortedByAge);
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

function mergeWithComparator<T>(left: T[], right: T[], comparator: (a: T, b: T) => number): T[] {
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

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

// Usage with custom comparator
const numbersDesc = [64, 34, 25, 12, 22, 11, 90];
const sortedDesc = mergeSortWithComparator(numbersDesc, (a, b) => b - a);
console.log('Descending order:', sortedDesc);
// Time complexity: O(n log n) in all cases
// Space complexity: O(n) due to auxiliary arrays

// Test with large array
function testPerformance() {
    const largeArray = Array.from({ length: 10000 }, () => 
        Math.floor(Math.random() * 1000)
    );
    
    console.time('Merge Sort');
    const sorted = mergeSort(largeArray);
    console.timeEnd('Merge Sort');
    console.log('First 10 elements:', sorted.slice(0, 10));
}

testPerformance();
