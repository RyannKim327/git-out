/**
 * Merges two sorted sub-arrays into a single sorted sub-array.
 * This is a standard merge operation, crucial for both recursive and iterative merge sort.
 *
 * @param arr The array containing the sub-arrays to be merged.
 * @param left The starting index of the left sub-array.
 * @param mid The ending index of the left sub-array (and mid + 1 is the start of the right sub-array).
 * @param right The ending index of the right sub-array.
 * @param compare A comparison function to determine the order of elements.
 */
function merge<T>(
    arr: T[],
    left: number,
    mid: number,
    right: number,
    compare: (a: T, b: T) => number
): void {
    // Create a temporary array to store the merged result
    const temp: T[] = new Array(right - left + 1);
    let i = left;      // Pointer for the left sub-array (arr[left...mid])
    let j = mid + 1;   // Pointer for the right sub-array (arr[mid+1...right])
    let k = 0;         // Pointer for the temporary array

    // Compare elements from both sub-arrays and place the smaller one into temp
    while (i <= mid && j <= right) {
        if (compare(arr[i], arr[j]) <= 0) {
            temp[k] = arr[i];
            i++;
        } else {
            temp[k] = arr[j];
            j++;
        }
        k++;
    }

    // Copy any remaining elements from the left sub-array
    while (i <= mid) {
        temp[k] = arr[i];
        i++;
        k++;
    }

    // Copy any remaining elements from the right sub-array
    while (j <= right) {
        temp[k] = arr[j];
        j++;
        k++;
    }

    // Copy the merged elements from the temp array back to the original array
    for (let l = 0; l < temp.length; l++) {
        arr[left + l] = temp[l];
    }
}

/**
 * Implements the iterative merge sort algorithm.
 * Sorts an array in-place using a bottom-up approach.
 *
 * @param arr The array to be sorted.
 * @param compare An optional comparison function. Defaults to a numeric comparison.
 * @returns The sorted array.
 */
function mergeSortIterative<T>(
    arr: T[],
    compare: (a: T, b: T) => number = (a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        // Fallback for non-numeric types if no custom comparator is provided
        // This might not work as expected for all T without a proper comparator
        if (String(a) < String(b)) return -1;
        if (String(a) > String(b)) return 1;
        return 0;
    }
): T[] {
    const n = arr.length;

    // An array with 0 or 1 element is already sorted
    if (n <= 1) {
        return arr;
    }

    // currentMergeSize: Controls the size of the sub-arrays to be merged.
    // It starts at 1 (merging individual elements) and doubles in each iteration.
    for (let currentMergeSize = 1; currentMergeSize < n; currentMergeSize *= 2) {
        // leftStart: Iterates through the array, marking the start of the left sub-array
        // for each merge operation. It advances by 2 * currentMergeSize each time.
        for (let leftStart = 0; leftStart < n - currentMergeSize; leftStart += 2 * currentMergeSize) {
            const mid = leftStart + currentMergeSize - 1;
            // Calculate the end of the right sub-array, ensuring it doesn't go beyond array bounds.
            const rightEnd = Math.min(leftStart + 2 * currentMergeSize - 1, n - 1);

            // Perform the merge operation for the current pair of sub-arrays
            merge(arr, leftStart, mid, rightEnd, compare);
        }
    }

    return arr;
}

// --- Example Usage ---

// 1. Sorting an array of numbers
const numbers = [38, 27, 43, 3, 9, 82, 10];
console.log("Original numbers:", numbers);
mergeSortIterative(numbers);
console.log("Sorted numbers (iterative):", numbers); // Output: [3, 9, 10, 27, 38, 43, 82]

// 2. Sorting an array of strings (using default comparator, which will convert to string)
const strings = ["banana", "apple", "cherry", "date"];
console.log("Original strings:", strings);
mergeSortIterative(strings);
console.log("Sorted strings (iterative):", strings); // Output: ["apple", "banana", "cherry", "date"]

// 3. Sorting an array of objects with a custom comparator
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
];

console.log("Original people:", people);

// Sort by age, then by name for ties
mergeSortIterative(people, (a, b) => {
    if (a.age !== b.age) {
        return a.age - b.age;
    }
    return a.name.localeCompare(b.name);
});
console.log("Sorted people (iterative, by age then name):", people);
/* Output:
[
  { name: 'Bob', age: 25 },
  { name: 'David', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Charlie', age: 35 }
]
*/

// 4. Test with an empty array
const emptyArray: number[] = [];
console.log("Original empty array:", emptyArray);
mergeSortIterative(emptyArray);
console.log("Sorted empty array:", emptyArray); // Output: []

// 5. Test with a single-element array
const singleElementArray = [42];
console.log("Original single-element array:", singleElementArray);
mergeSortIterative(singleElementArray);
console.log("Sorted single-element array:", singleElementArray); // Output: [42]
