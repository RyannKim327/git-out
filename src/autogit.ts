function countingSort(arr: number[]): number[] {
    // 1. Handle edge cases: empty or single-element array
    if (arr.length <= 1) {
        return [...arr]; // Return a shallow copy
    }

    // 2. Find the minimum and maximum elements
    // This is crucial for determining the range and handling non-zero minimums (even negative ones).
    let minVal = arr[0];
    let maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minVal) {
            minVal = arr[i];
        }
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }

    // The range of values determines the size of the count array.
    // Example: If minVal = -5, maxVal = 5, range = 5 - (-5) + 1 = 11.
    // Indices in count array will be 0 to 10, mapping -5 to 0, 0 to 5, 5 to 10.
    const range = maxVal - minVal + 1;

    // 3. Create the count array and initialize with zeros
    const count: number[] = new Array(range).fill(0);

    // 4. Populate the count array with frequencies
    // For each number in the input array, increment its corresponding count.
    // We subtract `minVal` to map the number to a 0-based index in the `count` array.
    for (const num of arr) {
        count[num - minVal]++;
    }

    // 5. Modify the count array to store cumulative frequencies
    // Now, `count[i]` will store the actual position of the last occurrence of a value
    // that maps to index `i` (relative to minVal) in the sorted output array.
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // 6. Create the output array
    const output: number[] = new Array(arr.length);

    // 7. Populate the output array
    // Iterate through the original array in reverse order for stability.
    // Stability means that elements with equal values maintain their relative order from the input.
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        // The position is `count[num - minVal] - 1` because `count` stores 1-based indices
        // (how many elements are <= num), and array indices are 0-based.
        output[count[num - minVal] - 1] = num;
        // Decrement the count for this number, as we've placed one instance of it.
        count[num - minVal]--;
    }

    // 8. Return the sorted array
    return output;
}

// --- Example Usage ---

// Example 1: Positive Integers
const positiveNumbers = [4, 2, 2, 8, 3, 3, 1];
console.log("Original array (positive):", positiveNumbers);
console.log("Sorted array (positive):", countingSort(positiveNumbers)); // Expected: [1, 2, 2, 3, 3, 4, 8]

// Example 2: Integers with Zero
const zeroIncluded = [0, 5, 2, 0, 8, 1];
console.log("Original array (zero included):", zeroIncluded);
console.log("Sorted array (zero included):", countingSort(zeroIncluded)); // Expected: [0, 0, 1, 2, 5, 8]

// Example 3: Negative and Positive Integers
const mixedNumbers = [-5, -2, 0, 5, 2, 1, -1];
console.log("Original array (mixed):", mixedNumbers);
console.log("Sorted array (mixed):", countingSort(mixedNumbers)); // Expected: [-5, -2, -1, 0, 1, 2, 5]

// Example 4: Already Sorted
const sortedArr = [1, 2, 3, 4, 5];
console.log("Original array (sorted):", sortedArr);
console.log("Sorted array (sorted):", countingSort(sortedArr)); // Expected: [1, 2, 3, 4, 5]

// Example 5: Reverse Sorted
const reverseSortedArr = [5, 4, 3, 2, 1];
console.log("Original array (reverse sorted):", reverseSortedArr);
console.log("Sorted array (reverse sorted):", countingSort(reverseSortedArr)); // Expected: [1, 2, 3, 4, 5]

// Example 6: Single Element
const singleElement = [7];
console.log("Original array (single element):", singleElement);
console.log("Sorted array (single element):", countingSort(singleElement)); // Expected: [7]

// Example 7: Empty Array
const emptyArray: number[] = [];
console.log("Original array (empty):", emptyArray);
console.log("Sorted array (empty):", countingSort(emptyArray)); // Expected: []
