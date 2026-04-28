/**
 * Binary search for a sorted array.  
 * @param arr  The sorted array (or array‑like object).
 * @param target  The value you’re looking for.
 * @param low   Optional starting index (default 0).
 * @param high  Optional ending index (default arr.length – 1).
 * @returns index of target if found, otherwise -1.
 */
export function binarySearch<T extends number | string>(
    arr: ArrayLike<T>,
    target: T,
    low: number = 0,
    high: number = arr.length - 1
): number {
    while (low <= high) {
        // guard against overflow – works with big ints as well
        const mid = Math.floor((low + high) / 2);
        const midVal = arr[mid];

        if (midVal === target) {
            return mid;
        }

        // Type narrowing: if T is string we still compare interger‑wise
        if (midVal < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1; // not found
}
import { binarySearch } from "./binary-search.ts";

const nums = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(nums, 7));   // => 3
console.log(binarySearch(nums, 4));   // => -1
export function binarySearchRec<T extends number | string>(
    arr: ArrayLike<T>,
    target: T,
    low: number = 0,
    high: number = arr.length - 1
): number {
    if (low > high) return -1;

    const mid = Math.floor((low + high) / 2);
    const midVal = arr[mid];

    if (midVal === target) return mid;
    if (midVal < target) return binarySearchRec(arr, target, mid + 1, high);
    return binarySearchRec(arr, target, low, mid - 1);
}
