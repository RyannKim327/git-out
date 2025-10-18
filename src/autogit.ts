/**
 * Random QuickSort Implementation in TypeScript
 * 
 * This function sorts an array of numbers using a randomized pivot
 * selection to optimize performance and avoid worst-case O(n²) scenarios.
 */
function randomQuickSort(arr: number[]): number[] {
    // Base case: arrays with 0 or 1 elements are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Random pivot selection (avoids worst-case performance patterns)
    const pivotIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIndex];

    // Partition the array into three parts
    const less: number[] = [];
    const equal: number[] = [];
    const greater: number[] = [];

    for (const element of arr) {
        if (element < pivot) {
            less.push(element);
        } else if (element === pivot) {
            equal.push(element);
        } else {
            greater.push(element);
        }
    }

    // Recursively sort and combine partitions
    return [...randomQuickSort(less), ...equal, ...randomQuickSort(greater)];
}

// Example usage
const unsortedArray = [9, 3, 7, 4, 1, 6, 5, 2, 8];
const sortedArray = randomQuickSort(unsortedArray);

console.log('Original:', unsortedArray);
console.log('Sorted:', sortedArray);
Original: [9, 3, 7, 4, 1, 6, 5, 2, 8]
Sorted: [1, 2, 3, 4, 5, 6, 7, 8, 9]
