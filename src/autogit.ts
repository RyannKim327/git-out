/**
 * Utility function to swap two elements in an array.
 * @param arr The array to modify.
 * @param i Index of the first element.
 * @param j Index of the second element.
 */
function swap<T>(arr: T[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Partitions the array around a pivot element.
 * Elements smaller than the pivot are moved to its left, and larger elements to its right.
 * The pivot itself is placed in its final sorted position.
 *
 * @param arr The array (or sub-array) to partition.
 * @param low The starting index of the sub-array.
 * @param high The ending index of the sub-array (inclusive), also where the pivot is initially chosen.
 * @returns The final index of the pivot element.
 */
function partition(arr: number[], low: number, high: number): number {
    // Choose the last element as the pivot
    const pivot = arr[high];
    
    // i will be the index of the last element smaller than the pivot
    // It also acts as the "wall" between smaller and larger elements
    let i = low - 1; 

    // Iterate through the sub-array from 'low' to 'high - 1'
    for (let j = low; j < high; j++) {
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
            i++; // Move the wall one step to the right
            swap(arr, i, j); // Swap current element with the element at the wall
        }
    }

    // After the loop, all elements smaller than pivot are on the left of 'i'
    // and elements greater are on the right of 'i'.
    // Now, place the pivot itself in its correct sorted position
    swap(arr, i + 1, high);
    
    // Return the final index of the pivot
    return i + 1;
}

/**
 * The main recursive Quicksort function.
 * Sorts the sub-array from 'low' to 'high' in-place.
 *
 * @param arr The array to be sorted.
 * @param low The starting index of the sub-array.
 * @param high The ending index of the sub-array.
 */
function _quicksort(arr: number[], low: number, high: number): void {
    // Base case: If the sub-array has 0 or 1 elements, it's already sorted.
    if (low < high) {
        // Partition the array and get the pivot's final index
        const pi = partition(arr, low, high);

        // Recursively sort the sub-array to the left of the pivot
        _quicksort(arr, low, pi - 1);
        
        // Recursively sort the sub-array to the right of the pivot
        _quicksort(arr, pi + 1, high);
    }
}

/**
 * Public function to perform Quicksort on an array of numbers.
 * Sorts the array in-place.
 *
 * @param arr The array of numbers to be sorted.
 * @returns The sorted array (same reference as input).
 */
export function quicksort(arr: number[]): number[] {
    // Handle edge cases: empty or single-element arrays are already sorted
    if (!arr || arr.length <= 1) {
        return arr;
    }

    // Start the recursive quicksort process for the entire array
    _quicksort(arr, 0, arr.length - 1);
    
    return arr;
}
import { quicksort } from './quicksort'; // Assuming you save the above code in 'quicksort.ts'

const numbers1 = [3, 7, 8, 5, 2, 1, 9, 5, 4];
console.log("Original array 1:", numbers1);
quicksort(numbers1);
console.log("Sorted array 1:", numbers1); // Output: [1, 2, 3, 4, 5, 5, 7, 8, 9]

const numbers2 = [10, -5, 0, 100, -20, 50];
console.log("Original array 2:", numbers2);
quicksort(numbers2);
console.log("Sorted array 2:", numbers2); // Output: [-20, -5, 0, 10, 50, 100]

const emptyArray: number[] = [];
console.log("Original empty array:", emptyArray);
quicksort(emptyArray);
console.log("Sorted empty array:", emptyArray); // Output: []

const singleElementArray = [42];
console.log("Original single element array:", singleElementArray);
quicksort(singleElementArray);
console.log("Sorted single element array:", singleElementArray); // Output: [42]

const alreadySorted = [1, 2, 3, 4, 5];
console.log("Already sorted array:", alreadySorted);
quicksort(alreadySorted);
console.log("Sorted (already sorted) array:", alreadySorted); // Output: [1, 2, 3, 4, 5]

const reverseSorted = [5, 4, 3, 2, 1];
console.log("Reverse sorted array:", reverseSorted);
quicksort(reverseSorted);
console.log("Sorted (reverse sorted) array:", reverseSorted); // Output: [1, 2, 3, 4, 5]
