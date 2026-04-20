/**
 * Binary search – recursive version
 *
 * @param arr   Sorted array (ascending order)
 * @param target Value you’re looking for
 * @param low   Left boundary (inclusive) – do **not** pass this on the first call
 * @param high  Right boundary (inclusive) – do **not** pass this on the first call
 * @returns Index of target, or -1 if absent
 */
function binarySearch<T extends number | string>(
    arr: readonly T[],
    target: T,
    low = 0,
    high = arr.length - 1
): number {
    // Base case: empty range → not found
    if (low > high) return -1;

    const mid = Math.floor((low + high) / 2);
    const midVal = arr[mid];

    if (midVal === target) {
        return mid;                     // found
    } else if (midVal < target) {
        // search right half
        return binarySearch(arr, target, mid + 1, high);
    } else {
        // left half
        return binarySearch(arr, target, low, mid - 1);
    }
}
const nums = [1, 4, 7, 12, 19, 31, 55];
const idx  = binarySearch(nums, 19);
console.log(idx);   // 4
function binarySearchIter<T extends number | string>(
    arr: readonly T[],
    target: T
): number {
    return binarySearch(arr, target);
}
