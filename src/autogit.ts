/**
 * Random QuickSort implementation in TypeScript
 * Sorts an array of numbers in ascending order
 * @param arr - The array to be sorted
 * @returns The sorted array
 */
function quickSort(arr: number[]): number[] {
    // Base case: arrays with 0 or 1 element are already "sorted"
    if (arr.length <= 1) return arr;

    // Random pivot selection to improve average performance
    const pivotIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIndex];

    // Partition the array into three parts
    const less: number[] = [];
    const equal: number[] = [];
    const greater: number[] = [];

    for (const num of arr) {
        if (num < pivot) {
            less.push(num);
        } else if (num === pivot) {
            equal.push(num);
        } else {
            greater.push(num);
        }
    }

    // Recursively sort the partitions and combine results
    return [...quickSort(less), ...equal, ...quickSort(greater)];
}

// Example usage
const unsortedArray = [7, 2, 5, 1, 8, 3, 6, 4, 10, 9];
const sortedArray = quickSort(unsortedArray);

console.log("Original Array:", unsortedArray);
console.log("Sorted Array:  ", sortedArray);
Original Array: [7, 2, 5, 1, 8, 3, 6, 4, 10, 9]
Sorted Array:   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
