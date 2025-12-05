/**
 * Finds the maximum sum of a contiguous subarray using Kadane's Algorithm.
 *
 * @param arr The input array of numbers.
 * @returns The maximum sum of a contiguous subarray.
 *          Returns 0 if the array is empty.
 */
function maxSubArraySum(arr: number[]): number {
    // Handle the edge case of an empty array
    if (arr.length === 0) {
        return 0;
    }

    // Initialize currentMax and globalMax with the first element
    // currentMax: Maximum sum of subarray ending at the current position
    // globalMax: Overall maximum sum found so far
    let currentMax: number = arr[0];
    let globalMax: number = arr[0];

    // Iterate through the array starting from the second element
    for (let i = 1; i < arr.length; i++) {
        const num = arr[i];

        // For each element, decide whether to extend the previous subarray
        // or start a new one.
        // If currentMax + num is greater than num itself, it means
        // adding num to the previous subarray sum is beneficial.
        // Otherwise, num itself is a better start for a new subarray.
        currentMax = Math.max(num, currentMax + num);

        // Update globalMax if currentMax is greater
        if (currentMax > globalMax) {
            globalMax = currentMax;
        }
    }

    return globalMax;
}

// --- Examples ---

// Example 1: Standard case with positive and negative numbers
const arr1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(`Array: [${arr1}]`);
console.log(`Maximum Subarray Sum: ${maxSubArraySum(arr1)}`); // Expected output: 6 (subarray: [4, -1, 2, 1])

// Example 2: All positive numbers
const arr2 = [1, 2, 3, 4, 5];
console.log(`\nArray: [${arr2}]`);
console.log(`Maximum Subarray Sum: ${maxSubArraySum(arr2)}`); // Expected output: 15

// Example 3: All negative numbers
const arr3 = [-1, -2, -3, -4, -5];
console.log(`\nArray: [${arr3}]`);
console.log(`Maximum Subarray Sum: ${maxSubArraySum(arr3)}`); // Expected output: -1 (subarray: [-1])

// Example 4: Mixed numbers, starting with a large positive
const arr4 = [5, 4, -1, 7, 8];
console.log(`\nArray: [${arr4}]`);
console.log(`Maximum Subarray Sum: ${maxSubArraySum(arr4)}`); // Expected output: 23

// Example 5: Single element array
const arr5 = [7];
console.log(`\nArray: [${arr5}]`);
console.log(`Maximum Subarray Sum: ${maxSubArraySum(arr5)}`); // Expected output: 7

// Example 6: Empty array
const arr6: number[] = [];
console.log(`\nArray: [${arr6}]`);
console.log(`Maximum Subarray Sum: ${maxSubArraySum(arr6)}`); // Expected output: 0
