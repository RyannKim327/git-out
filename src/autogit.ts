/**
 * Implements the Interpolation Search algorithm.
 *
 * Interpolation search is an improved variant of binary search. It works on the principle
 * of finding the value within a uniformly distributed sorted array by estimating the
 * position of the target value based on its value relative to the low and high elements.
 *
 * @param arr The sorted array of numbers to search within.
 * @param target The number to search for.
 * @returns The index of the target if found, otherwise -1.
 *
 * Time Complexity:
 *   - Average Case: O(log log n) for uniformly distributed data.
 *   - Worst Case: O(n) (e.g., for exponentially distributed data or when values are not uniform,
 *     or when the target is at an extreme end of the current search space).
 * Space Complexity: O(1)
 */
function interpolationSearch(arr: number[], target: number): number {
    if (!arr || arr.length === 0) {
        return -1; // Handle empty or null array
    }

    let low = 0;
    let high = arr.length - 1;

    // Continue searching while the target might be within the current bounds
    // and target is between arr[low] and arr[high]
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Special case: if low and high are the same, check if it's the target
        if (arr[low] === arr[high]) {
            return target === arr[low] ? low : -1;
        }

        // Calculate the probe position using the interpolation formula
        // This formula estimates where the target might be, based on its value
        // relative to the values at arr[low] and arr[high].
        const position = low + Math.floor(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        // Check if the target is found at the calculated position
        if (arr[position] === target) {
            return position;
        }

        // If the element at 'position' is less than the target,
        // search in the upper part of the array
        if (arr[position] < target) {
            low = position + 1;
        }
        // If the element at 'position' is greater than the target,
        // search in the lower part of the array
        else {
            high = position - 1;
        }
    }

    // If the loop finishes, the target was not found
    return -1;
}

// --- Example Usage ---

const sortedNumbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const anotherSortedNumbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
const smallArray = [5];
const duplicateArray = [10, 20, 20, 30, 40]; // Note: Behaves like first occurrence, but not guaranteed
const edgeCaseArray = [1, 2, 3, 4, 5, 100]; // Not perfectly uniform, still works

console.log("--- Searching in sortedNumbers ---");
console.log(`Index of 30: ${interpolationSearch(sortedNumbers, 30)} (Expected: 2)`);
console.log(`Index of 100: ${interpolationSearch(sortedNumbers, 100)} (Expected: 9)`);
console.log(`Index of 10: ${interpolationSearch(sortedNumbers, 10)} (Expected: 0)`);
console.log(`Index of 55: ${interpolationSearch(sortedNumbers, 55)} (Expected: -1)`);
console.log(`Index of 1: ${interpolationSearch(sortedNumbers, 1)} (Expected: -1)`);
console.log(`Index of 101: ${interpolationSearch(sortedNumbers, 101)} (Expected: -1)`);

console.log("\n--- Searching in anotherSortedNumbers ---");
console.log(`Index of 12: ${interpolationSearch(anotherSortedNumbers, 12)} (Expected: 5)`);
console.log(`Index of 1: ${interpolationSearch(anotherSortedNumbers, 1)} (Expected: -1)`);
console.log(`Index of 21: ${interpolationSearch(anotherSortedNumbers, 21)} (Expected: -1)`);

console.log("\n--- Searching in smallArray ---");
console.log(`Index of 5: ${interpolationSearch(smallArray, 5)} (Expected: 0)`);
console.log(`Index of 1: ${interpolationSearch(smallArray, 1)} (Expected: -1)`);

console.log("\n--- Searching in empty array ---");
console.log(`Index of 10 in []: ${interpolationSearch([], 10)} (Expected: -1)`);

console.log("\n--- Searching in duplicateArray (finds first '20') ---");
console.log(`Index of 20: ${interpolationSearch(duplicateArray, 20)} (Expected: 1)`); // Or 2 depending on specific probe

console.log("\n--- Searching in edgeCaseArray (non-uniform) ---");
console.log(`Index of 100: ${interpolationSearch(edgeCaseArray, 100)} (Expected: 5)`);
console.log(`Index of 2: ${interpolationSearch(edgeCaseArray, 2)} (Expected: 1)`);
console.log(`Index of 6: ${interpolationSearch(edgeCaseArray, 6)} (Expected: -1)`);
