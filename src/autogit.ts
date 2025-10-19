/**
 * Extremely inefficient sorting algorithm that randomly shuffles the array
 * until it is sorted. Average time complexity: O(n!) (yes, factorial!).
 * Use only for educational purposes (or pure amusement)!
 */
function bogoSort<T>(arr: T[]): T[] {
    // Helper to check if the array is sorted
    const isSorted = (arr: T[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    };

    // Random shuffle using Fisher-Yates algorithm
    const shuffle = (arr: T[]): T[] => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]]; // Swap elements
        }
        return copy;
    };

    // Keep shuffling until sorted (might take 10 years - pentium warned!)
    while (!isSorted(arr)) {
        arr = shuffle(arr);
    }

    return arr;
}

// Example usage with a small array (don't try this with large arrays!)
const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("Unsorted:", unsortedArray);

console.time("BogoSort");
const sortedArray = bogoSort(unsortedArray);
console.timeEnd("BogoSort");

console.log("Sorted:", sortedArray);
Unsorted: [3, 1, 4, 1, 5, 9, 2, 6]
BogoSort: 1327.827ms  ← Whoa, it actually finished quickly!
Sorted: [1, 1, 2, 3, 4, 5, 6, 9]
