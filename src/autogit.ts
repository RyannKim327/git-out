/**
 * Merges two sorted arrays into a single sorted array.
 * @param left The left sorted array.
 * @param right The right sorted array.
 * @returns A new array containing all elements from left and right, sorted.
 */
function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from both arrays and add the smaller one to the result
    while (leftIndex < left.length && rightIndex < right.length) {
        // Use '<=' for stability: if elements are equal, prioritize the one from the left array
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add any remaining elements from the left array
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // Add any remaining elements from the right array
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result;

    // A more concise way to handle remaining elements using spread and slice:
    // return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

/**
 * Sorts an array using the Merge Sort algorithm.
 * @param arr The array to be sorted.
 * @returns A new array that is sorted. The original array remains unchanged.
 */
function mergeSort<T>(arr: T[]): T[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Find the middle point
    const mid = Math.floor(arr.length / 2);

    // Divide the array into two halves
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively sort the two halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

// --- Usage Examples (Basic) ---
console.log("--- Basic Merge Sort Examples ---");

const numbers = [38, 27, 43, 3, 9, 82, 10];
console.log("Original numbers:", numbers);
console.log("Sorted numbers:", mergeSort(numbers)); // Output: [3, 9, 10, 27, 38, 43, 82]

const strings = ["banana", "apple", "grape", "cherry", "date"];
console.log("Original strings:", strings);
console.log("Sorted strings:", mergeSort(strings)); // Output: ["apple", "banana", "cherry", "date", "grape"]

const mixed = [5, "b", 2, "a", 10, "c"];
// This will work based on JavaScript's default comparison for mixed types,
// but it's generally not recommended to sort mixed types this way without a custom comparator.
console.log("Original mixed (not recommended):", mixed);
console.log("Sorted mixed (not recommended):", mergeSort(mixed));
/**
 * Type definition for a comparison function.
 * Returns:
 *   -1 if a < b
 *    0 if a == b
 *    1 if a > b
 */
type Comparator<T> = (a: T, b: T) => number;

// --- Default Comparators (for convenience) ---
const defaultNumberComparator: Comparator<number> = (a, b) => a - b;
const defaultStringComparator: Comparator<string> = (a, b) => a.localeCompare(b);

/**
 * Merges two sorted arrays into a single sorted array using a custom comparator.
 * @param left The left sorted array.
 * @param right The right sorted array.
 * @param comparator The function used to compare two elements.
 * @returns A new array containing all elements from left and right, sorted.
 */
function mergeWithComparator<T>(left: T[], right: T[], comparator: Comparator<T>): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        // Use comparator(left, right) <= 0 for stability
        if (comparator(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

/**
 * Sorts an array using the Merge Sort algorithm with a custom comparator.
 * @param arr The array to be sorted.
 * @param comparator The function used to compare two elements.
 * @returns A new array that is sorted. The original array remains unchanged.
 */
function mergeSortWithComparator<T>(arr: T[], comparator: Comparator<T>): T[] {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    const sortedLeft = mergeSortWithComparator(left, comparator);
    const sortedRight = mergeSortWithComparator(right, comparator);

    return mergeWithComparator(sortedLeft, sortedRight, comparator);
}

// --- Usage Examples (Advanced) ---
console.log("\n--- Advanced Merge Sort Examples with Comparator ---");

interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 }, // Same age as Bob
    { name: "Eve", age: 20 },
];

console.log("Original people:", people);

// Sort by age (ascending)
const sortByAgeAscending: Comparator<Person> = (a, b) => a.age - b.age;
const sortedByAge = mergeSortWithComparator(people, sortByAgeAscending);
console.log("Sorted by age (asc):", sortedByAge);
// Expected: [{name: "Eve", age: 20}, {name: "Bob", age: 25}, {name: "David", age: 25}, {name: "Alice", age: 30}, {name: "Charlie", age: 35}]
// Note: Bob and David maintain their relative order because of <= in merge.

// Sort by age (descending)
const sortByAgeDescending: Comparator<Person> = (a, b) => b.age - a.age;
const sortedByAgeDesc = mergeSortWithComparator(people, sortByAgeDescending);
console.log("Sorted by age (desc):", sortedByAgeDesc);

// Sort by name (ascending)
const sortByNameAscending: Comparator<Person> = (a, b) => a.name.localeCompare(b.name);
const sortedByName = mergeSortWithComparator(people, sortByNameAscending);
console.log("Sorted by name (asc):", sortedByName);

// Sort by age, then by name for ties
const sortByAgeThenName: Comparator<Person> = (a, b) => {
    const ageComparison = a.age - b.age;
    if (ageComparison !== 0) {
        return ageComparison; // If ages are different, sort by age
    }
    return a.name.localeCompare(b.name); // If ages are same, sort by name
};
const sortedByAgeThenName = mergeSortWithComparator(people, sortByAgeThenName);
console.log("Sorted by age then name:", sortedByAgeThenName);
// Expected: [{name: "Eve", age: 20}, {name: "Bob", age: 25}, {name: "David", age: 25}, {name: "Alice", age: 30}, {name: "Charlie", age: 35}]
// This example specifically shows how David and Bob (same age) will be ordered by name.
