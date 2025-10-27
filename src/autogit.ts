/**
 * Gnome Sort (also called Stupid Sort) is a simple sorting algorithm 
 * that works by moving elements one position at a time to their correct places.
 * It's similar to how a gardener sorts flower pots by comparing adjacent ones.
 * @param arr - The array to be sorted
 * @returns The sorted array
 */
function gnomeSort(arr: number[]): number[] {
    // Start at index 0
    let index = 0;
    
    while (index < arr.length) {
        if (index === 0 || arr[index] >= arr[index - 1]) {
            // Move forward if elements are in order
            index++;
        } else {
            // Swap elements if they're out of order
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            // Move backward to check previous pair
            index--;
        }
    }
    
    return arr;
}

// Example usage
const unsortedArray = [5, 2, 9, 1, 5, 6];
console.log('Unsorted array:', unsortedArray);

const sortedArray = gnomeSort([...unsortedArray]);
console.log('Sorted array:', sortedArray);
Unsorted array: [5, 2, 9, 1, 5, 6]
Sorted array: [1, 2, 5, 5, 6, 9]
