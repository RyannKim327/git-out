/**
 * Sorts an array of numbers (or any comparable type) in place
 * using the classic selection‑sort algorithm.
 *
 * @param arr – the array to sort
 * @returns the same array reference, now sorted
 */
export function selectionSort<T>(arr: T[]): T[] {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // Assume the smallest element starts at i
        let minIndex = i;

        // Scan the unsorted suffix to find the real minimum
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // If the minimum isn’t already in position i, swap
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}
const unsorted = [64, 25, 12, 22, 11];
console.log('Before:', unsorted);
selectionSort(unsorted);
console.log('After :', unsorted);
