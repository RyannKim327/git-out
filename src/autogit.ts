/**
 * A simple implementation of the Bubble Sort algorithm in TypeScript.
 * It sorts an array of numbers in ascending order.
 *
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array.
 */
function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean;

    // Loop through all elements in the array
    for (let i = 0; i < n - 1; i++) {
        swapped = false; // Reset swapped flag for this iteration
        
        // Last i elements are already sorted, no need to check them
        for (let j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap if they are in the wrong order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true; // Set the swapped flag to true
            }
        }

        // If no two elements were swapped, the array is sorted
        if (!swapped) {
            break; // Optimization: stop if the array is sorted early
        }
    }

    return arr;
}

// Example usage
const unsortedArray: number[] = [64, 34, 25, 12, 22, 11, 90];
console.log("Unsorted Array:", unsortedArray);
const sortedArray = bubbleSort(unsortedArray);
console.log("Sorted Array:", sortedArray);
