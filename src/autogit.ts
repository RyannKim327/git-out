/**
 * Implements the Fibonacci Search algorithm to find an element in a sorted array.
 *
 * @param arr The sorted array to search within.
 * @param target The element to search for.
 * @returns The index of the target element if found, otherwise -1.
 */
function fibonacciSearch<T>(arr: T[], target: T): number {
    const n = arr.length;

    if (n === 0) {
        return -1; // Empty array, target cannot be found
    }

    // 1. Initialize Fibonacci numbers
    // fibMm2 = F(m-2), fibMm1 = F(m-1), fibM = F(m)
    // Find the smallest Fibonacci number fibM that is greater than or equal to n.
    let fibMm2 = 0; // F(0)
    let fibMm1 = 1; // F(1)
    let fibM = fibMm2 + fibMm1; // F(2)

    while (fibM < n) {
        fibMm2 = fibMm1;
        fibMm1 = fibM;
        fibM = fibMm2 + fibMm1;
    }

    // 2. Initialize offset
    // This offset keeps track of the eliminated range from the front.
    // It's like 'low' in binary search, but adjusted by Fibonacci terms.
    let offset = -1; 

    // 3. Main search loop
    // While there are elements to be inspected
    while (fibM > 1) {
        // Calculate the index 'i' to check.
        // It's the minimum of (offset + F(m-2)) and (n-1) to ensure we don't go out of bounds.
        const i = Math.min(offset + fibMm2, n - 1);

        // Compare the target with the element at index 'i'
        if (arr[i] < target) {
            // Target is in the right part of the array segment.
            // Discard the segment from 'offset' up to 'i'.
            // The new search space effectively starts from 'i+1'.
            //
            // Recalculate Fibonacci numbers for the remaining (right) part:
            // The new 'fibM' becomes the old 'fibMm1' (F(m-1)).
            // The new 'fibMm1' becomes the old 'fibMm2' (F(m-2)).
            // The new 'fibMm2' becomes F(m-3), which is F(m-1) - F(m-2).
            fibM = fibMm1;     // fibM becomes F(m-1)
            fibMm1 = fibMm2;    // fibMm1 becomes F(m-2)
            fibMm2 = fibM - fibMm1; // fibMm2 becomes F(m-3) (F(m-1) - F(m-2))
            offset = i;         // Update offset to the new start of the search range
        } else if (arr[i] > target) {
            // Target is in the left part of the array segment.
            // Discard the segment from 'i' up to the end.
            // The new search space effectively ends at 'i-1'.
            //
            // Recalculate Fibonacci numbers for the remaining (left) part:
            // The new 'fibM' becomes the old 'fibMm2' (F(m-2)).
            // The new 'fibMm1' becomes F(m-3), which is F(m-1) - F(m-2).
            // The new 'fibMm2' becomes F(m-4), which is F(m-2) - F(m-3).
            fibM = fibMm2;      // fibM becomes F(m-2)
            fibMm1 = fibMm1 - fibMm2; // fibMm1 becomes F(m-3) (F(m-1) - F(m-2))
            fibMm2 = fibM - fibMm1; // fibMm2 becomes F(m-4) (F(m-2) - F(m-3))
            // offset remains the same as we are reducing the upper bound
        } else {
            // Target found!
            return i;
        }
    }

    // 4. Check the last remaining element (if any)
    // The loop terminates when fibM becomes 1 (meaning fibMm1 was 1 and fibMm2 was 0).
    // At this point, there might be one element left to check: arr[offset + 1].
    // This handles cases where the target is the very last element in the array,
    // or when only one element remains after successive reductions.
    if (fibMm1 === 1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    // 5. Target not found
    return -1;
}

// --- Examples ---
const sortedNumbers = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const sortedStrings = ["apple", "banana", "grape", "kiwi", "orange", "pear"];

console.log("--- Number Array ---");
console.log(`Searching for 25: ${fibonacciSearch(sortedNumbers, 25)} (Expected: 5)`);
console.log(`Searching for 1: ${fibonacciSearch(sortedNumbers, 1)} (Expected: 0)`);
console.log(`Searching for 50: ${fibonacciSearch(sortedNumbers, 50)} (Expected: 10)`);
console.log(`Searching for 17: ${fibonacciSearch(sortedNumbers, 17)} (Expected: -1)`); // Not found
console.log(`Searching for 0: ${fibonacciSearch(sortedNumbers, 0)} (Expected: -1)`);   // Not found (less than min)
console.log(`Searching for 100: ${fibonacciSearch(sortedNumbers, 100)} (Expected: -1)`); // Not found (greater than max)

const emptyArray: number[] = [];
console.log(`Searching in empty array for 5: ${fibonacciSearch(emptyArray, 5)} (Expected: -1)`);

const singleElementArray = [42];
console.log(`Searching in [42] for 42: ${fibonacciSearch(singleElementArray, 42)} (Expected: 0)`);
console.log(`Searching in [42] for 10: ${fibonacciSearch(singleElementArray, 10)} (Expected: -1)`);

console.log("\n--- String Array ---");
console.log(`Searching for "grape": ${fibonacciSearch(sortedStrings, "grape")} (Expected: 2)`);
console.log(`Searching for "apple": ${fibonacciSearch(sortedStrings, "apple")} (Expected: 0)`);
console.log(`Searching for "pear": ${fibonacciSearch(sortedStrings, "pear")} (Expected: 5)`);
console.log(`Searching for "mango": ${fibonacciSearch(sortedStrings, "mango")} (Expected: -1)`);
