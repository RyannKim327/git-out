/**
 * Merges two sorted arrays into a single sorted array.
 * This is the "conquer" step of the Merge Sort algorithm.
 *
 * @param left The left sorted array.
 * @param right The right sorted array.
 * @returns A new array containing all elements from `left` and `right` in sorted order.
 */
function merge<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from both arrays and add the smaller one to the result
    // until one of the arrays is exhausted.
    while (leftIndex < left.length && rightIndex < right.length) {
        // We assume elements are directly comparable (numbers, strings, etc.)
        // For custom objects, you would pass a comparator function here.
        if (left[leftIndex] < right[rightIndex]) {
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

    return result;

    // A more concise way to handle remaining elements using spread syntax:
    // return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

/**
 * Implements the Merge Sort algorithm to sort an array.
 * This is the "divide" step, which recursively breaks down the array.
 *
 * @param arr The array to be sorted.
 * @returns A new array that is a sorted version of the input array.
 */
function mergeSort<T>(arr: T[]): T[] {
    // Base case: An array with 0 or 1 element is already sorted.
    if (arr.length <= 1) {
        return arr;
    }

    // Divide the array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);      // Elements from index 0 up to (but not including) mid
    const right = arr.slice(mid);        // Elements from mid up to the end

    // Recursively sort the two halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Merge the sorted halves back together
    return merge(sortedLeft, sortedRight);
}

// --- Example Usage ---

// Example 1: Sorting numbers
const numbers = [38, 27, 43, 3, 9, 82, 10];
console.log("Original numbers:", numbers);
const sortedNumbers = mergeSort(numbers);
console.log("Sorted numbers:", sortedNumbers); // Output: [3, 9, 10, 27, 38, 43, 82]

// Example 2: Sorting strings
const words = ["banana", "apple", "cherry", "date", "grape"];
console.log("\nOriginal words:", words);
const sortedWords = mergeSort(words);
console.log("Sorted words:", sortedWords); // Output: ["apple", "banana", "cherry", "date", "grape"]

// Example 3: Empty array
const emptyArray: number[] = [];
console.log("\nOriginal empty array:", emptyArray);
console.log("Sorted empty array:", mergeSort(emptyArray)); // Output: []

// Example 4: Single element array
const singleElement = [5];
console.log("\nOriginal single element array:", singleElement);
console.log("Sorted single element array:", mergeSort(singleElement)); // Output: [5]
