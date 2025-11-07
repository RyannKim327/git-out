/**
 * Merges two sorted sub-arrays into a single sorted sub-array.
 * This is a helper function for both recursive and iterative merge sort.
 * @param arr The array containing the sub-arrays to be merged.
 * @param left The starting index of the first sub-array.
 * @param mid The ending index of the first sub-array.
 * @param right The ending index of the second sub-array.
 */
function merge<T>(arr: T[], left: number, mid: number, right: number): void {
    const temp = new Array<T>(right - left + 1); // temporary array to hold merged elements
    let i = left;      // Pointer for the left sub-array (arr[left...mid])
    let j = mid + 1;   // Pointer for the right sub-array (arr[mid+1...right])
    let k = 0;         // Pointer for the temporary array

    // Compare elements from both sub-arrays and place the smaller one into temp
    while (i <= mid && j <= right) {
        // Assuming elements can be compared directly (e.g., numbers, strings)
        // For custom objects, you would need a custom comparison function here:
        // if (compareFn(arr[i], arr[j]) <= 0) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }

    // Copy any remaining elements from the left sub-array
    while (i <= mid) {
        temp[k++] = arr[i++];
    }

    // Copy any remaining elements from the right sub-array
    while (j <= right) {
        temp[k++] = arr[j++];
    }

    // Copy the merged elements from temp back into the original array
    for (let l = 0; l < temp.length; l++) {
        arr[left + l] = temp[l];
    }
}

/**
 * Sorts an array using the iterative (bottom-up) merge sort algorithm.
 *
 * @param arr The array to be sorted.
 * @returns The sorted array.
 */
function iterativeMergeSort<T>(arr: T[]): T[] {
    const n = arr.length;

    // Base case: an array with 0 or 1 element is already sorted
    if (n <= 1) {
        return arr;
    }

    // currentSize: Defines the size of the sub-arrays we are currently merging.
    // It starts at 1 (merging individual elements) and doubles in each iteration.
    for (let currentSize = 1; currentSize < n; currentSize *= 2) {
        // left: Defines the starting index of the first sub-array in the current merge operation.
        // We iterate through the array, merging consecutive sub-arrays of 'currentSize'.
        for (let left = 0; left < n - currentSize; left += 2 * currentSize) {
            // Calculate the middle index for the merge operation.
            // This is the end of the left sub-array.
            const mid = left + currentSize - 1;

            // Calculate the right index for the merge operation.
            // This is the end of the right sub-array.
            // Use Math.min to ensure 'right' does not exceed the array bounds.
            const right = Math.min(left + 2 * currentSize - 1, n - 1);

            // Perform the merge operation on the two sub-arrays:
            // arr[left...mid] and arr[mid+1...right]
            merge(arr, left, mid, right);
        }
    }

    return arr;
}

// --- Example Usage ---

// Numbers
const numbers = [38, 27, 43, 3, 9, 82, 10];
console.log("Original numbers:", numbers);
const sortedNumbers = iterativeMergeSort([...numbers]); // Use spread to avoid modifying original
console.log("Sorted numbers (iterative):", sortedNumbers); // Output: [3, 9, 10, 27, 38, 43, 82]

// Strings
const strings = ["banana", "apple", "cherry", "date", "fig"];
console.log("\nOriginal strings:", strings);
const sortedStrings = iterativeMergeSort([...strings]);
console.log("Sorted strings (iterative):", sortedStrings); // Output: ["apple", "banana", "cherry", "date", "fig"]

// Already sorted
const sortedArr = [1, 2, 3, 4, 5];
console.log("\nOriginal already sorted:", sortedArr);
const sortedSorted = iterativeMergeSort([...sortedArr]);
console.log("Sorted already sorted (iterative):", sortedSorted); // Output: [1, 2, 3, 4, 5]

// Reverse sorted
const reverseArr = [5, 4, 3, 2, 1];
console.log("\nOriginal reverse sorted:", reverseArr);
const sortedReverse = iterativeMergeSort([...reverseArr]);
console.log("Sorted reverse sorted (iterative):", sortedReverse); // Output: [1, 2, 3, 4, 5]

// Single element
const singleArr = [7];
console.log("\nOriginal single element:", singleArr);
const sortedSingle = iterativeMergeSort([...singleArr]);
console.log("Sorted single element (iterative):", sortedSingle); // Output: [7]

// Empty array
const emptyArr: number[] = [];
console.log("\nOriginal empty array:", emptyArr);
const sortedEmpty = iterativeMergeSort([...emptyArr]);
console.log("Sorted empty array (iterative):", sortedEmpty); // Output: []
