/**
 * Recursively searches for `target` inside a sorted array.
 *
 * @param arr  The sorted array to search.
 * @param target The value we're looking for.
 * @param left  The leftmost index to consider (inclusive).
 * @param right The rightmost index to consider (inclusive).
 * @returns The index of `target`, or `-1` if it isn’t present.
 */
function binarySearchRecursive(
    arr: number[],
    target: number,
    left: number = 0,
    right: number = arr.length - 1
): number {
    if (left > right) {          // Base case: empty search window
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
        return mid;              // Found the target
    } else if (arr[mid] > target) {
        // Target is in the left half
        return binarySearchRecursive(arr, target, left, mid - 1);
    } else {
        // Target is in the right half
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
}
const sorted = [3, 7, 11, 15, 23, 42, 56];

console.log(binarySearchRecursive(sorted, 15)); // → 3
console.log(binarySearchRecursive(sorted, 1));  // → -1
