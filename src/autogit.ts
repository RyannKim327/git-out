/**
 * Performs interpolation search on a sorted array to find the target value.
 * @param arr - Sorted array of numbers
 * @param target - Value to search for
 * @returns Index of the target if found, otherwise -1
 */
function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        // Check if target is within current array bounds
        if (target < arr[low] || target > arr[high]) break;
        
        // Handle case where remaining elements are identical
        if (arr[low] === arr[high]) {
            return arr[low] === target ? low : -1;
        }

        // Calculate position using interpolation formula
        const pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        // Safety check to prevent index out-of-bounds
        if (pos < low || pos > high) break;

        if (arr[pos] === target) {
            return pos;  // Target found
        } else if (arr[pos] < target) {
            low = pos + 1;  // Search right subarray
        } else {
            high = pos - 1;  // Search left subarray
        }
    }

    return -1;  // Target not found
}
// Sorted array with uniform distribution
const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

console.log(interpolationSearch(data, 50));   // Output: 4
console.log(interpolationSearch(data, 75));   // Output: -1
console.log(interpolationSearch(data, 100));  // Output: 9
