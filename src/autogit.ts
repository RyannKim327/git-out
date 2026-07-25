/**
 * Interpolation search returns the index of `target` in `arr`,
 * or –1 if the target is not present.
 *
 * @param arr   – sorted array of numbers (must be monotonic increasing)
 * @param target – key we’re trying to locate
 * @returns the array index of target or -1
 */
export function interpolationSearch(arr: number[], target: number): number {
    if (arr.length === 0) return -1;

    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Avoid division by zero when the sub‑array contains equal numbers
        if (arr[high] === arr[low]) {
            return arr[low] === target ? low : -1;
        }

        // Estimate the likely position of `target` within [low, high]
        const pos = low + Math.floor(
            ((high - low) * (target - arr[low])) / (arr[high] - arr[low])
        );

        const val = arr[pos];

        if (val === target) return pos;
        if (val < target) low = pos + 1;
        else high = pos - 1;
    }

    return -1; // not found
}
import { interpolationSearch } from "./interpolationSearch";

const data = [3, 7, 15, 23, 42, 57, 88, 99, 123, 158];

console.log(interpolationSearch(data, 42));   // → 4
console.log(interpolationSearch(data, 100));  // → -1
