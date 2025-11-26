/**
 * Finds the maximum sum of a contiguous subarray using Kadane's Algorithm.
 *
 * @param numbers The input array of numbers (can be positive, negative, or zero).
 * @returns The maximum sum of a contiguous subarray. Returns 0 if the array is empty.
 */
function maxSubArraySum(numbers: number[]): number {
    // Handle the edge case of an empty array.
    // An empty array has no subarrays, so the sum can be considered 0.
    if (numbers.length === 0) {
        return 0;
    }

    // Initialize currentMax and globalMax with the first element.
    // If all numbers are negative, globalMax will correctly hold the largest negative number.
    let currentMax: number = numbers[0];
    let globalMax: number = numbers[0];

    // Iterate starting from the second element.
    for (let i = 1; i < numbers.length; i++) {
        const num = numbers[i];

        // Decide whether to extend the current subarray or start a new one.
        // If 'num' itself is greater than 'currentMax + num', it means adding
        // 'num' to the previous subarray sum makes it smaller, so we start fresh.
        currentMax = Math.max(num, currentMax + num);

        // Update globalMax if the current subarray sum is greater than the
        // maximum sum found so far.
        globalMax = Math.max(globalMax, currentMax);
    }

    return globalMax;
}

// --- Usage Examples ---

// Example 1: Standard case with positive and negative numbers
const arr1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(`Array: [${arr1}]`);
console.log(`Max Subarray Sum: ${maxSubArraySum(arr1)}`); // Expected output: 6 (from [4, -1, 2, 1])

// Example 2: All positive numbers
const arr2 = [1, 2, 3, 4, 5];
console.log(`\nArray: [${arr2}]`);
console.log(`Max Subarray Sum: ${maxSubArraySum(arr2)}`); // Expected output: 15 (from [1, 2, 3, 4, 5])

// Example 3: All negative numbers
const arr3 = [-1, -2, -3, -4, -5];
console.log(`\nArray: [${arr3}]`);
console.log(`Max Subarray Sum: ${maxSubArraySum(arr3)}`); // Expected output: -1 (from [-1])

// Example 4: Mixed numbers, some zeros
const arr4 = [5, 4, -1, 7, 8, 0, -10, 2];
console.log(`\nArray: [${arr4}]`);
console.log(`Max Subarray Sum: ${maxSubArraySum(arr4)}`); // Expected output: 23 (from [5, 4, -1, 7, 8, 0])

// Example 5: Single element array
const arr5 = [7];
console.log(`\nArray: [${arr5}]`);
console.log(`Max Subarray Sum: ${maxSubArraySum(arr5)}`); // Expected output: 7

// Example 6: Empty array
const arr6: number[] = [];
console.log(`\nArray: []`);
console.log(`Max Subarray Sum: ${maxSubArraySum(arr6)}`); // Expected output: 0
