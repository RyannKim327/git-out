/**
 * Interpolation Search Algorithm (TypeScript)
 * 
 * Performs an interpolation search on a sorted array to find the index of a target value.
 * 
 * Prerequisites:
 * - The input array must be sorted in ascending order
 * - The elements should be uniformly distributed for optimal performance
 * 
 * Time Complexity:
 * - Best case: O(log log n)
 * - Worst case: O(n) (non-uniform distributions)
 * 
 * @param arr Sorted array of numbers (ascending order)
 * @param target The value to search for
 * @returns Index of the target if found, otherwise -1
 */
function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    // Early exit for empty array or invalid range
    if (arr.length === 0 || target < arr[low] || target > arr[high]) {
        return -1;
    }

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Handle the case where remaining elements are all equal
        if (arr[low] === arr[high]) {
            return arr[low] === target ? low : -1;
        }

        // Calculate position using interpolation formula
        const position = Math.floor(
            low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        // Boundary check to prevent array overflow
        if (position < low || position > high) {
            break;
        }

        if (arr[position] === target) {
            return position;
        } else if (arr[position] < target) {
            low = position + 1;
        } else {
            high = position - 1;
        }
    }

    return -1;
}
// Sorted array with uniform distribution
const sortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const target = 60;

const result = interpolationSearch(sortedArray, target);

if (result !== -1) {
    console.log(`Found at index ${result}`); // Output: Found at index 5
} else {
    console.log("Value not found");
}
