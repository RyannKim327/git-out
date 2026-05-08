/**
 * Bubble‑sort a mutable array.
 *
 * @param arr   The array to sort.  It will be reordered in‑place.
 * @param cmp   Optional comparators.  If omitted, the default
 *              `> / <` operators are used for primitive values.
 *
 * @returns The sorted array (the same reference that was passed in).
 *
 * Complexity: O(n²) worst‑case, O(n) best‑case when the array is already
 * sorted (but we still make one full pass to check that).
 */
export function bubbleSort<T>(arr: T[], cmp?: (a: T, b: T) => number): T[] {
    const n = arr.length;
    if (n <= 1) return arr;          // Already sorted

    // Default comparator for primitive values (numbers, strings, etc.)
    const compare = cmp ?? ((a: T, b: T) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    let swapped: boolean;

    // One full outer loop pass guarantees sortedness,
    // but we abort early if no swaps occur in a pass.
    for (let i = 0; i < n; i++) {
        swapped = false;

        // After i iterations of the outer loop, the largest i elements
        // are bubbled to the end, so we don't need to touch them.
        for (let j = 0; j < n - i - 1; j++) {
            if (compare(arr[j], arr[j + 1]) > 0) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // If we made no swaps during this pass, array is sorted.
        if (!swapped) break;
    }

    return arr;
}
const nums = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(nums));  // → [11,12,22,25,34,64,90]

// Sorting strings
const words = ["apple", "banana", "cherry", "date"];
console.log(bubbleSort(words)); // → ["apple","banana","cherry","date"]

// Custom comparator (descending order)
bubbleSort(nums, (a, b) => b - a);
console.log(nums); // → [90,64,34,25,22,12,11]
