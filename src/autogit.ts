pos = low + ((high - low) / (arr[high] - arr[low])) * (target - arr[low])
/**
 * Performs an interpolation search on a sorted array to find the index of a target value.
 * Best suited for uniformly distributed data.
 *
 * @param arr The sorted array of numbers to search within.
 * @param target The number to search for.
 * @returns The index of the target value if found, otherwise -1.
 */
function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    // Continue searching as long as:
    // 1. The search space is valid (low <= high).
    // 2. The target is potentially within the current bounds (target >= arr[low] && target <= arr[high]).
    //    This second condition is crucial for interpolation search to avoid out-of-bounds calculations
    //    and to quickly exit if the target is outside the current segment.
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Handle the edge case where all remaining elements are the same.
        // This prevents division by zero if arr[high] - arr[low] is 0.
        if (arr[high] === arr[low]) {
            return arr[low] === target ? low : -1;
        }

        // Calculate the interpolated position.
        // This formula estimates where the target might be based on its value
        // relative to arr[low] and arr[high].
        // The Math.floor ensures we get an integer index.
        let pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (target - arr[low]));

        if (arr[pos] === target) {
            return pos; // Target found!
        } else if (arr[pos] < target) {
            // Target is in the upper part of the array
            low = pos + 1;
        } else {
            // Target is in the lower part of the array
            high = pos - 1;
        }
    }

    // If the loop finishes, the target was not found.
    return -1;
}

// --- Example Usage ---

const sortedArray1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Uniformly distributed
const sortedArray2 = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50];      // Somewhat less uniform
const emptyArray: number[] = [];
const singleElementArray = [42];

console.log("--- Test Cases ---");

// Test 1: Target found in uniformly distributed array
console.log(`Searching for 70 in ${JSON.stringify(sortedArray1)}:`);
console.log(`Expected: 6, Got: ${interpolationSearch(sortedArray1, 70)}`); // Expected: 6

// Test 2: Target at the beginning
console.log(`Searching for 10 in ${JSON.stringify(sortedArray1)}:`);
console.log(`Expected: 0, Got: ${interpolationSearch(sortedArray1, 10)}`); // Expected: 0

// Test 3: Target at the end
console.log(`Searching for 100 in ${JSON.stringify(sortedArray1)}:`);
console.log(`Expected: 9, Got: ${interpolationSearch(sortedArray1, 100)}`); // Expected: 9

// Test 4: Target not found (outside range)
console.log(`Searching for 5 in ${JSON.stringify(sortedArray1)}:`);
console.log(`Expected: -1, Got: ${interpolationSearch(sortedArray1, 5)}`); // Expected: -1

// Test 5: Target not found (inside range but not present)
console.log(`Searching for 75 in ${JSON.stringify(sortedArray1)}:`);
console.log(`Expected: -1, Got: ${interpolationSearch(sortedArray1, 75)}`); // Expected: -1

// Test 6: Less uniformly distributed array
console.log(`Searching for 30 in ${JSON.stringify(sortedArray2)}:`);
console.log(`Expected: 7, Got: ${interpolationSearch(sortedArray2, 30)}`); // Expected: 7

// Test 7: Empty array
console.log(`Searching for 5 in ${JSON.stringify(emptyArray)}:`);
console.log(`Expected: -1, Got: ${interpolationSearch(emptyArray, 5)}`); // Expected: -1

// Test 8: Single element array - found
console.log(`Searching for 42 in ${JSON.stringify(singleElementArray)}:`);
console.log(`Expected: 0, Got: ${interpolationSearch(singleElementArray, 42)}`); // Expected: 0

// Test 9: Single element array - not found
console.log(`Searching for 10 in ${JSON.stringify(singleElementArray)}:`);
console.log(`Expected: -1, Got: ${interpolationSearch(singleElementArray, 10)}`); // Expected: -1

// Test 10: Array with duplicate values (might affect performance but should still be correct)
const duplicateArray = [10, 10, 20, 30, 30, 30, 40];
console.log(`Searching for 30 in ${JSON.stringify(duplicateArray)}:`);
console.log(`Expected: 3 (or 4, 5 depending on logic, but first 30 is at 3), Got: ${interpolationSearch(duplicateArray, 30)}`);
// Note: It will return one of the indices where 30 is found, not necessarily the first or last.
// In this case, it's likely to find 3, 4 or 5. Let's trace it for 30:
// low=0, high=6, arr[low]=10, arr[high]=40, target=30
// pos = 0 + floor((6-0)/(40-10)) * (30-10) = 0 + floor((6/30)*20) = 0 + floor(0.2 * 20) = floor(4) = 4
// arr[4] is 30. Returns 4. Correct.
