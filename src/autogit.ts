/**
 * Randomized QuickSort implementation in TypeScript
 * Sorts an array of numbers in ascending order
 * Average time complexity: O(n log n), Worst-case: O(n²) (but rare with randomization)
 */
function quickSort(arr: number[]): number[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Random pivot selection to avoid worst-case performance
    const pivotIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIndex];

    const left: number[] = [];
    const right: number[] = [];
    const equal: number[] = [];

    // Partition the array into three parts
    for (const num of arr) {
        if (num < pivot) {
            left.push(num);
        } else if (num > pivot) {
            right.push(num);
        } else {
            equal.push(num);
        }
    }

    // Recursively sort left and right partitions
    return [...quickSort(left), ...equal, ...quickSort(right)];
}

// Example usage:
const unsortedArray = [9, 3, 7, 4, 6, 1, 2, 8, 5];
const sortedArray = quickSort(unsortedArray);

console.log("Original array:", unsortedArray);
console.log("Sorted array:  ", sortedArray);
Original array: [9, 3, 7, 4, 6, 1, 2, 8, 5]
Sorted array:   [1, 2, 3, 4, 5, 6, 7, 8, 9]
