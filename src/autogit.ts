/**
 * Merges two sorted sub-arrays into a single sorted array.
 * This is the core utility function for both recursive and iterative merge sort.
 *
 * @param arr The array containing the sub-arrays to be merged.
 * @param left The starting index of the first sub-array.
 * @param mid The ending index of the first sub-array.
 * @param right The ending index of the second sub-array.
 */
function merge(arr: number[], left: number, mid: number, right: number): void {
    const n1 = mid - left + 1; // Length of the left sub-array
    const n2 = right - mid;     // Length of the right sub-array

    // Create temporary arrays to hold the left and right sub-arrays
    const L: number[] = new Array(n1);
    const R: number[] = new Array(n2);

    // Copy data to temporary arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }

    // Merge the temporary arrays back into arr[left..right]
    let i = 0; // Initial index of first sub-array
    let j = 0; // Initial index of second sub-array
    let k = left; // Initial index of merged sub-array

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

/**
 * Implements the Merge Sort algorithm iteratively (bottom-up).
 * Sorts an array of numbers in ascending order.
 *
 * @param arr The array of numbers to be sorted. This array will be modified in place.
 * @returns The sorted array.
 */
function iterativeMergeSort(arr: number[]): number[] {
    const n = arr.length;

    // A merge sort needs at least 2 elements to sort.
    // An array of 0 or 1 element is already sorted.
    if (n <= 1) {
        return arr;
    }

    // Outer loop: `currentSize` determines the length of sub-arrays we are merging.
    // It starts with 1 (merging single elements into pairs), then 2 (merging pairs into quads), etc.
    // It doubles in each iteration.
    for (let currentSize = 1; currentSize < n; currentSize *= 2) {
        // Inner loop: iterates through the array, merging sub-arrays of `currentSize`.
        // `leftStart` is the starting index of the left sub-array to be merged.
        // Each merge operation processes 2 * `currentSize` elements.
        for (let leftStart = 0; leftStart < n - currentSize; leftStart += 2 * currentSize) {
            // Calculate the end index of the left sub-array.
            const mid = leftStart + currentSize - 1;

            // Calculate the end index of the right sub-array.
            // Ensure `rightEnd` does not exceed the array bounds.
            const rightEnd = Math.min(leftStart + 2 * currentSize - 1, n - 1);

            // Perform the merge operation on the two sub-arrays
            merge(arr, leftStart, mid, rightEnd);
        }
    }

    return arr;
}

// --- Example Usage ---

// Test case 1: Basic array
const arr1 = [38, 27, 43, 3, 9, 82, 10];
console.log("Original array 1:", arr1);
iterativeMergeSort(arr1); // Modifies arr1 in place
console.log("Sorted array 1 (iterative):", arr1); // Expected: [3, 9, 10, 27, 38, 43, 82]

// Test case 2: Already sorted array
const arr2 = [1, 2, 3, 4, 5];
console.log("Original array 2:", arr2);
iterativeMergeSort(arr2);
console.log("Sorted array 2 (iterative):", arr2); // Expected: [1, 2, 3, 4, 5]

// Test case 3: Reverse sorted array
const arr3 = [5, 4, 3, 2, 1];
console.log("Original array 3:", arr3);
iterativeMergeSort(arr3);
console.log("Sorted array 3 (iterative):", arr3); // Expected: [1, 2, 3, 4, 5]

// Test case 4: Array with duplicate elements
const arr4 = [4, 2, 1, 3, 4, 2, 5];
console.log("Original array 4:", arr4);
iterativeMergeSort(arr4);
console.log("Sorted array 4 (iterative):", arr4); // Expected: [1, 2, 2, 3, 4, 4, 5]

// Test case 5: Empty array
const arr5: number[] = [];
console.log("Original array 5:", arr5);
iterativeMergeSort(arr5);
console.log("Sorted array 5 (iterative):", arr5); // Expected: []

// Test case 6: Single element array
const arr6 = [7];
console.log("Original array 6:", arr6);
iterativeMergeSort(arr6);
console.log("Sorted array 6 (iterative):", arr6); // Expected: [7]

// Test case 7: Even length array
const arr7 = [64, 34, 25, 12];
console.log("Original array 7:", arr7);
iterativeMergeSort(arr7);
console.log("Sorted array 7 (iterative):", arr7); // Expected: [12, 25, 34, 64]
