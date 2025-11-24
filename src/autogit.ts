/**
 * Bogo Sort (also known as Stupid Sort or Monkey Sort)
 * Randomly shuffles the array until it's sorted.
 * Time Complexity: O(n!) average case, O(1) best case
 */
function bogoSort(arr: number[]): number[] {
    // Helper function to check if array is sorted
    const isSorted = (arr: number[]): boolean => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) return false;
        }
        return true;
    };

    // Fisher-Yates shuffle algorithm
    const shuffle = (arr: number[]): number[] => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    // Keep shuffling until sorted (with a safety limit)
    let attempts = 0;
    const maxAttempts = 100_000; // Prevent infinite loops
    
    while (!isSorted(arr)) {
        arr = shuffle([...arr]);
        attempts++;
        
        // Safety check for practical use
        if (attempts > maxAttempts) {
            throw new Error(`BogoSort failed after ${maxAttempts} attempts`);
        }
    }

    return arr;
}

// Example usage
const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6];
console.log('Unsorted:', unsortedArray);

try {
    const sortedArray = bogoSort(unsortedArray);
    console.log('Sorted:', sortedArray);
} catch (error) {
    console.error(error.message);
}
