// 1. Define a Comparator type for flexibility
type Comparator<T> = (a: T, b: T) => number;

// 2. Default Comparator for primitive types (numbers, strings)
//    Returns -1 if a < b, 0 if a === b, 1 if a > b
const defaultComparator = <T>(a: T, b: T): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};

/**
 * Merges two already sorted arrays into a single sorted array.
 * @param left The left sorted array.
 * @param right The right sorted array.
 * @param comparator An optional comparison function. Defaults to comparing primitives directly.
 * @returns A new array containing all elements from left and right, sorted.
 */
function merge<T>(
    left: T[],
    right: T[],
    comparator: Comparator<T> = defaultComparator
): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from both arrays and add the smaller one to the result
    while (leftIndex < left.length && rightIndex < right.length) {
        if (comparator(left[leftIndex], right[rightIndex]) <= 0) {
            // Using <= 0 makes the sort stable (maintains relative order of equal elements)
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add any remaining elements from the left array (if any)
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // Add any remaining elements from the right array (if any)
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    // A more concise alternative for adding remaining elements using concat:
    // return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    // While concise, the multiple `concat` calls can create intermediate arrays.
    // The explicit loops above avoid this, though modern JS engines optimize `concat` well.

    return result;
}

/**
 * Implements the Merge Sort algorithm to sort an array.
 * @param arr The array to be sorted.
 * @param comparator An optional comparison function. Defaults to comparing primitives directly.
 * @returns A new sorted array. The original array is not modified.
 */
export function mergeSort<T>(
    arr: T[],
    comparator: Comparator<T> = defaultComparator
): T[] {
    // Base case: an array with 0 or 1 element is already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Find the middle point
    const mid = Math.floor(arr.length / 2);

    // Divide the array into two halves
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively sort the two halves
    const sortedLeft = mergeSort(left, comparator);
    const sortedRight = mergeSort(right, comparator);

    // Merge the sorted halves
    return merge(sortedLeft, sortedRight, comparator);
}
const numbers = [38, 27, 43, 3, 9, 82, 10];
const sortedNumbers = mergeSort(numbers);
console.log("Original numbers:", numbers); // [38, 27, 43, 3, 9, 82, 10]
console.log("Sorted numbers:", sortedNumbers); // [3, 9, 10, 27, 38, 43, 82]

const emptyArray: number[] = [];
console.log("Sorted empty:", mergeSort(emptyArray)); // []

const singleElement = [5];
console.log("Sorted single element:", mergeSort(singleElement)); // [5]
const strings = ["banana", "apple", "grape", "cherry"];
const sortedStrings = mergeSort(strings);
console.log("Original strings:", strings); // ["banana", "apple", "grape", "cherry"]
console.log("Sorted strings:", sortedStrings); // ["apple", "banana", "cherry", "grape"]
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
    { name: "Eve", age: 30 },
];

// Custom comparator for Person objects
const personComparator: Comparator<Person> = (p1, p2) => {
    // Sort primarily by age
    if (p1.age !== p2.age) {
        return p1.age - p2.age; // For ascending age
    }
    // If ages are the same, sort secondarily by name
    return p1.name.localeCompare(p2.name); // For ascending name
};

const sortedPeople = mergeSort(people, personComparator);
console.log("Original people:", people);
console.log("Sorted people:", sortedPeople);
/*
[
  { name: 'Bob', age: 25 },
  { name: 'David', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Eve', age: 30 },
  { name: 'Charlie', age: 35 }
]
*/
const numbersDesc = [38, 27, 43, 3, 9, 82, 10];
const descendingComparator: Comparator<number> = (a, b) => {
    return b - a; // Swapping a and b in the subtraction reverses the order
};

const sortedNumbersDesc = mergeSort(numbersDesc, descendingComparator);
console.log("Sorted numbers (descending):", sortedNumbersDesc); // [82, 43, 38, 27, 10, 9, 3]
