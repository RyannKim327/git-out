/**
 * Performs interpolation search on a sorted array to find the target value.
 * 
 * @param arr - The sorted array to search in (ascending order)
 * @param target - The value to search for
 * @returns The index of the target if found, otherwise -1
 */
function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Handle the case when all remaining elements are equal
        if (arr[low] === arr[high]) {
            return arr[low] === target ? low : -1;
        }

        // Calculate position using interpolation formula
        const pos = Math.floor(
            low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        // Safety check to ensure position stays within bounds
        if (pos < low || pos > high) {
            break;
        }

        // Check found position
        if (arr[pos] === target) {
            return pos;
        }

        // Adjust search boundaries
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    return -1;  // Target not found
}
const sortedArray = [10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47];
const target = 33;
const index = interpolationSearch(sortedArray, target);

console.log(index); // Output: 11 (index of 33 in the array)
