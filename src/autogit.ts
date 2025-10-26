/**
 * Recursively searches for a target value in a sorted array.
 *
 * @param arr The sorted array of numbers to search within.
 * @param target The number to search for.
 * @param low The starting index of the current search interval (default: 0).
 * @param high The ending index of the current search interval (default: arr.length - 1).
 * @returns The index of the target if found, otherwise -1.
 */
function binarySearchRecursive(
    arr: number[],
    target: number,
    low: number = 0, // Default to the start of the array
    high: number = arr.length - 1 // Default to the end of the array
): number {
    // Base Case 1: If the search interval is invalid (low has crossed high),
    // the target is not in the array.
    if (low > high) {
        return -1;
    }

    // Calculate the middle index of the current interval.
    // Using Math.floor to ensure an integer index.
    const mid = Math.floor((low + high) / 2);

    // Case 1: Target found at the middle.
    if (arr[mid] === target) {
        return mid;
    } 
    // Case 2: Target is in the left half.
    // The middle element is greater than the target, so search the left subarray.
    else if (arr[mid] > target) {
        // Recursive call: search in the left half (from low to mid - 1).
        return binarySearchRecursive(arr, target, low, mid - 1);
    } 
    // Case 3: Target is in the right half.
    // The middle element is less than the target, so search the right subarray.
    else { // arr[mid] < target
        // Recursive call: search in the right half (from mid + 1 to high).
        return binarySearchRecursive(arr, target, mid + 1, high);
    }
}

// --- OR (A slightly cleaner approach using a helper function for the initial call) ---

/**
 * Recursively searches for a target value in a sorted array using a helper function.
 * This separates the initial call from the recursive calls, which often looks cleaner.
 *
 * @param arr The sorted array of numbers to search within.
 * @param target The number to search for.
 * @returns The index of the target if found, otherwise -1.
 */
function binarySearchRecursiveWithHelper(arr: number[], target: number): number {
    // Handle empty array case upfront
    if (arr.length === 0) {
        return -1;
    }

    // Define the recursive helper function internally
    function search(low: number, high: number): number {
        // Base Case 1: If the search interval is invalid, target not found.
        if (low > high) {
            return -1;
        }

        const mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) {
            return mid; // Target found
        } else if (arr[mid] > target) {
            return search(low, mid - 1); // Search left
        } else { // arr[mid] < target
            return search(mid + 1, high); // Search right
        }
    }

    // Initial call to the helper function with the full array range
    return search(0, arr.length - 1);
}

// --- Usage Examples ---

const sortedArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

console.log("--- Using binarySearchRecursive ---");
console.log(`Searching for 23: ${binarySearchRecursive(sortedArray, 23)} (Expected: 5)`);
console.log(`Searching for 5: ${binarySearchRecursive(sortedArray, 5)} (Expected: 1)`);
console.log(`Searching for 91: ${binarySearchRecursive(sortedArray, 91)} (Expected: 9)`);
console.log(`Searching for 2: ${binarySearchRecursive(sortedArray, 2)} (Expected: 0)`);
console.log(`Searching for 30 (not present): ${binarySearchRecursive(sortedArray, 30)} (Expected: -1)`);
console.log(`Searching for 1 (not present): ${binarySearchRecursive(sortedArray, 1)} (Expected: -1)`);
console.log(`Searching for 100 (not present): ${binarySearchRecursive(sortedArray, 100)} (Expected: -1)`);
console.log(`Searching in empty array: ${binarySearchRecursive([], 5)} (Expected: -1)`);
console.log(`Searching in single element array [7] for 7: ${binarySearchRecursive([7], 7)} (Expected: 0)`);
console.log(`Searching in single element array [7] for 10: ${binarySearchRecursive([7], 10)} (Expected: -1)`);


const singleElementArray = [42];
console.log(`\n--- Using binarySearchRecursiveWithHelper ---`);
console.log(`Searching for 42: ${binarySearchRecursiveWithHelper(singleElementArray, 42)} (Expected: 0)`);
console.log(`Searching for 100 (not present): ${binarySearchRecursiveWithHelper(sortedArray, 100)} (Expected: -1)`);
console.log(`Searching for 8: ${binarySearchRecursiveWithHelper(sortedArray, 8)} (Expected: 2)`);
console.log(`Searching in empty array: ${binarySearchRecursiveWithHelper([], 5)} (Expected: -1)`);
