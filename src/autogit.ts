/**
 * Selection sort – O(n²) time, O(1) additional space.
 *
 * Works on any array of items that can be compared with < and >.
 */
function selectionSort<T>(arr: T[]): T[] {
    const n = arr.length;
    // Work in place – the original array is mutated
    for (let i = 0; i < n - 1; i++) {
        // Assume the smallest is at i
        let minIdx = i;

        // Search for a smaller element in the rest of the array
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        // If a smaller element was found, swap it into place
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}
const nums = [64, 25, 12, 22, 11];
console.log(selectionSort(nums));   // [11, 12, 22, 25, 64]
function selectionSortCopy<T>(arr: T[]): T[] {
    return selectionSort([...arr]); // spread creates a shallow copy
}
