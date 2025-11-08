/**
 * Sorts an array using the Shell Sort algorithm.
 * This is an in-place sort that uses decreasing gaps to improve on insertion sort.
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array (in-place).
 */
function shellSort(arr: number[]): number[] {
    const n = arr.length;

    // Start with a large gap (half the array length) and reduce it by half each iteration
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Perform insertion sort for elements at each gap interval
        for (let i = gap; i < n; i++) {
            // Store the current element to be inserted
            const temp = arr[i];
            let j: number;

            // Shift earlier gap-sorted elements up until correct position is found
            for (
                j = i;
                j >= gap && arr[j - gap] > temp;
                j -= gap
            ) {
                arr[j] = arr[j - gap];
            }

            // Insert the stored element at its correct position
            arr[j] = temp;
        }
    }
    
    return arr;
}

// Example usage:
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Unsorted array:", unsortedArray);
console.log("Sorted array:", shellSort(unsortedArray));
Unsorted array: [64, 34, 25, 12, 22, 11, 90]
Sorted array: [11, 12, 22, 25, 34, 64, 90]
