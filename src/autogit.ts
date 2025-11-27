/**
 * Sorts an array of non-negative integers using the Counting Sort algorithm.
 *
 * @param arr The input array of non-negative integers.
 * @returns A new array containing the sorted elements.
 * @throws Error if the input array contains negative numbers.
 */
function countingSort(arr: number[]): number[] {
    const n = arr.length;

    // 1. Handle edge cases
    if (n === 0) {
        return [];
    }

    // 2. Find the maximum element in the input array
    // Also, validate that all numbers are non-negative
    let max = arr[0];
    for (let i = 0; i < n; i++) {
        if (arr[i] < 0) {
            throw new Error("Counting Sort does not support negative numbers in this implementation.");
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    // Alternative for finding max (less error handling for negatives here):
    // const max = Math.max(...arr);
    // if (max < 0) { throw new Error(...) } // if all are negative

    // 3. Create a count array of size (max + 1) and initialize with zeros
    // This array will store the frequency of each element.
    const count: number[] = new Array(max + 1).fill(0);

    // 4. Populate the count array
    // count[i] will contain the number of times i appears in arr.
    for (const num of arr) {
        count[num]++;
    }

    // 5. Modify the count array to store cumulative frequencies
    // count[i] will now contain the number of elements less than or equal to i.
    // This gives us the correct position for each element in the output array.
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // 6. Create the output array
    // This array will store the sorted elements.
    const output: number[] = new Array(n);

    // 7. Build the output array by placing elements into their sorted positions
    // Iterate from right to left (n-1 down to 0) to ensure stability.
    // Stability means elements with the same value retain their relative order from the input array.
    for (let i = n - 1; i >= 0; i--) {
        const num = arr[i];
        // The correct position for 'num' is count[num] - 1
        output[count[num] - 1] = num;
        // Decrement count[num] because we've placed one instance of 'num'
        count[num]--;
    }

    // 8. Return the sorted output array
    return output;
}

// --- Example Usage ---

// Example 1: Basic Array
const arr1 = [4, 2, 2, 8, 3, 3, 1];
console.log("Original array 1:", arr1);
const sortedArr1 = countingSort(arr1);
console.log("Sorted array 1:", sortedArr1); // Expected: [1, 2, 2, 3, 3, 4, 8]

// Example 2: Array with zeros
const arr2 = [0, 5, 1, 0, 3];
console.log("\nOriginal array 2:", arr2);
const sortedArr2 = countingSort(arr2);
console.log("Sorted array 2:", sortedArr2); // Expected: [0, 0, 1, 3, 5]

// Example 3: Already sorted array
const arr3 = [1, 2, 3, 4, 5];
console.log("\nOriginal array 3:", arr3);
const sortedArr3 = countingSort(arr3);
console.log("Sorted array 3:", sortedArr3); // Expected: [1, 2, 3, 4, 5]

// Example 4: Array with duplicate maximums
const arr4 = [7, 2, 9, 4, 9, 1];
console.log("\nOriginal array 4:", arr4);
const sortedArr4 = countingSort(arr4);
console.log("Sorted array 4:", sortedArr4); // Expected: [1, 2, 4, 7, 9, 9]

// Example 5: Empty array
const arr5: number[] = [];
console.log("\nOriginal array 5:", arr5);
const sortedArr5 = countingSort(arr5);
console.log("Sorted array 5:", sortedArr5); // Expected: []

// Example 6: Single element array
const arr6 = [42];
console.log("\nOriginal array 6:", arr6);
const sortedArr6 = countingSort(arr6);
console.log("Sorted array 6:", sortedArr6); // Expected: [42]

// Example 7: Array with negative numbers (will throw an error)
try {
    const arr7 = [4, -2, 1];
    console.log("\nOriginal array 7:", arr7);
    const sortedArr7 = countingSort(arr7);
    console.log("Sorted array 7:", sortedArr7);
} catch (error: any) {
    console.error("\nError for array with negatives:", error.message);
}
