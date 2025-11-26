/**
 * Recursively performs a binary search on a sorted array.
 *
 * @param arr The sorted array to search within.
 * @param target The value to search for.
 * @param low The starting index of the current search range (defaults to 0).
 * @param high The ending index of the current search range (defaults to arr.length - 1).
 * @returns The index of the target if found, otherwise -1.
 */
function binarySearchRecursive(
    arr: number[],
    target: number,
    low: number = 0,
    high: number = arr.length - 1
): number {
    // Base Case 1: If the search range is invalid (low > high),
    // it means the target is not in the array.
    if (low > high) {
        return -1;
    }

    // Calculate the middle index.
    // Using low + Math.floor((high - low) / 2) prevents potential
    // integer overflow if low and high were extremely large,
    // though less critical in JavaScript than languages like C++/Java.
    const mid = low + Math.floor((high - low) / 2);

    // Base Case 2: If the middle element is the target, we found it.
    if (arr[mid] === target) {
        return mid;
    }

    // Recursive Step: If the target is smaller than the middle element,
    // search in the left half of the array.
    if (arr[mid] > target) {
        return binarySearchRecursive(arr, target, low, mid - 1);
    }
    // Recursive Step: If the target is larger than the middle element,
    // search in the right half of the array.
    else { // arr[mid] < target
        return binarySearchRecursive(arr, target, mid + 1, high);
    }
}

// --- Usage Examples ---

const sortedArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

console.log(`Searching for 12: ${binarySearchRecursive(sortedArray, 12)} (Expected: 3)`);
console.log(`Searching for 2: ${binarySearchRecursive(sortedArray, 2)} (Expected: 0)`);
console.log(`Searching for 91: ${binarySearchRecursive(sortedArray, 91)} (Expected: 9)`);
console.log(`Searching for 16: ${binarySearchRecursive(sortedArray, 16)} (Expected: 4)`);
console.log(`Searching for 30: ${binarySearchRecursive(sortedArray, 30)} (Expected: -1)`); // Not found
console.log(`Searching for 1: ${binarySearchRecursive(sortedArray, 1)} (Expected: -1)`);   // Not found (less than min)
console.log(`Searching for 100: ${binarySearchRecursive(sortedArray, 100)} (Expected: -1)`); // Not found (greater than max)

const singleElementArray = [7];
console.log(`Searching for 7 in [7]: ${binarySearchRecursive(singleElementArray, 7)} (Expected: 0)`);
console.log(`Searching for 5 in [7]: ${binarySearchRecursive(singleElementArray, 5)} (Expected: -1)`);

const emptyArray: number[] = [];
console.log(`Searching for 5 in []: ${binarySearchRecursive(emptyArray, 5)} (Expected: -1)`);
