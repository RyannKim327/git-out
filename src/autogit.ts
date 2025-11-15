function countingSort(arr: number[]): number[] {
    // 1. Handle edge cases: empty or single-element array is already sorted
    if (arr.length <= 1) {
        return [...arr]; // Return a copy to maintain immutability
    }

    // 2. Find the maximum element in the input array.
    // This determines the size of our 'count' array.
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < 0) {
            // Counting sort typically assumes non-negative integers.
            // For negative numbers, you'd need to adapt by finding min and shifting.
            throw new Error("Counting sort as implemented here does not support negative numbers.");
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // 3. Create a 'count' array (frequency array) and initialize with zeros.
    // Its size will be (max + 1) to accommodate numbers from 0 to max.
    const countArray: number[] = new Array(max + 1).fill(0);

    // 4. Populate the 'count' array.
    // For each number in the input array, increment its corresponding count.
    for (const num of arr) {
        countArray[num]++;
    }

    // 5. Modify the 'count' array to store cumulative sums.
    // This step is crucial. After this, countArray[i] will store the actual position
    // (index + 1) of the last occurrence of number 'i' in the sorted output array.
    for (let i = 1; i < countArray.length; i++) {
        countArray[i] += countArray[i - 1];
    }

    // 6. Create an 'output' array to store the sorted elements.
    // It will have the same length as the input array.
    const outputArray: number[] = new Array(arr.length);

    // 7. Populate the 'output' array.
    // Iterate through the input array in reverse order to ensure stability
    // (elements with the same value maintain their relative order).
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        // The sorted position for 'num' is countArray[num] - 1.
        // We subtract 1 because array indices are 0-based.
        outputArray[countArray[num] - 1] = num;
        // Decrement the count for 'num' as we've placed one instance of it.
        countArray[num]--;
    }

    // 8. Return the sorted output array.
    return outputArray;
}

// --- Example Usage ---

const unsortedArray1 = [4, 2, 2, 8, 3, 3, 1];
console.log("Original array 1:", unsortedArray1);
console.log("Sorted array 1:", countingSort(unsortedArray1)); // Expected: [1, 2, 2, 3, 3, 4, 8]

const unsortedArray2 = [10, 4, 1, 4, 1, 7, 5, 0, 9];
console.log("Original array 2:", unsortedArray2);
console.log("Sorted array 2:", countingSort(unsortedArray2)); // Expected: [0, 1, 1, 4, 4, 5, 7, 9, 10]

const unsortedArray3 = [5];
console.log("Original array 3:", unsortedArray3);
console.log("Sorted array 3:", countingSort(unsortedArray3)); // Expected: [5]

const unsortedArray4: number[] = [];
console.log("Original array 4:", unsortedArray4);
console.log("Sorted array 4:", countingSort(unsortedArray4)); // Expected: []

// Example with negative numbers (will throw an error as per implementation)
try {
    const unsortedArrayNegative = [3, 1, -5, 2];
    console.log("Original array (with negative):", unsortedArrayNegative);
    console.log("Sorted array (with negative):", countingSort(unsortedArrayNegative));
} catch (error: any) {
    console.error("Error for negative numbers:", error.message);
}
