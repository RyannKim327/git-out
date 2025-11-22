/**
 * Performs interpolation search on a sorted array of numbers
 * @param arr - Sorted array (ascending order) to search in
 * @param target - Target value to search for
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
        // Prevent division by zero when low == high
        if (arr[low] === arr[high]) {
            return arr[low] === target ? low : -1;
        }

        // Calculate position using interpolation formula
        const pos = Math.floor(
            low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        // Bounds check to prevent out-of-range access
        if (pos < low || pos > high) {
            break;
        }

        if (arr[pos] === target) {
            return pos; // Target found
        } else if (arr[pos] < target) {
            low = pos + 1; // Search right subarray
        } else {
            high = pos - 1; // Search left subarray
        }
    }

    return -1; // Target not found
}
const sortedArray = [10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47];
const target = 18;

const index = interpolationSearch(sortedArray, target);
console.log(index); // Output: 4
