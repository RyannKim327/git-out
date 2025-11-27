/**
 * Implements the Fibonacci search algorithm to find a target value in a sorted array.
 *
 * @param arr The sorted array of numbers to search.
 * @param target The number to search for.
 * @returns The index of the target value if found, otherwise -1.
 */
function fibonacciSearch(arr: number[], target: number): number {
    const n = arr.length;

    // Handle empty array or invalid input
    if (n === 0) {
        return -1;
    }

    // 1. Initialize Fibonacci numbers
    // fibMMm2 is F(k-2), fibMMm1 is F(k-1), fibM is F(k)
    let fibMMm2 = 0; // F(0)
    let fibMMm1 = 1; // F(1)
    let fibM = fibMMm2 + fibMMm1; // F(2) which is 1

    // 2. Find the smallest Fibonacci number F(k) that is greater than or equal to n
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    // 3. Mark the eliminated range from the front
    // This variable helps in tracking the start of the current search segment.
    let offset = -1;

    // 4. While there are elements to be inspected
    // fibM will become 1 when we are left with 0 or 1 elements.
    while (fibM > 1) {
        // Calculate the index to check.
        // It's the `offset` (start of current segment) plus `fibMMm2` (F(k-2))
        // We take `Math.min` to ensure the index doesn't go out of bounds of the original array.
        const i = Math.min(offset + fibMMm2, n - 1);

        // Compare arr[i] with the target
        if (arr[i] < target) {
            // Target is in the right sub-array `arr[i+1 ... end]`
            // The search space becomes the remaining part,
            // so we shift our Fibonacci numbers to effectively consider
            // a subproblem of size F(k-1) relative to the new `offset`.
            fibM = fibMMm1;           // F(k) becomes F(k-1)
            fibMMm1 = fibMMm2;         // F(k-1) becomes F(k-2)
            fibMMm2 = fibM - fibMMm1;  // F(k-2) becomes F(k-3)
            offset = i;                // Update offset to the new search segment start
        } else if (arr[i] > target) {
            // Target is in the left sub-array `arr[offset+1 ... i-1]`
            // The search space becomes the left part,
            // so we shift our Fibonacci numbers to effectively consider
            // a subproblem of size F(k-2).
            fibM = fibMMm2;            // F(k) becomes F(k-2)
            fibMMm1 = fibMMm1 - fibMMm2; // F(k-1) becomes F(k-3)
            fibMMm2 = fibM - fibMMm1;   // F(k-2) becomes F(k-4)
            // offset remains the same as the left part starts at the same offset
        } else {
            // Element found
            return i;
        }
    }

    // 5. After the loop, fibM is 1, meaning only one element might be left.
    // Check the last remaining element, if fibMMm1 is 1 (corresponds to F(1)).
    // This happens when fibM was 2 in the previous step, and then was reduced to 1.
    // The element to check is at `offset + 1`.
    if (fibMMm1 === 1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    // Target not found
    return -1;
}

// --- Example Usage ---

const sortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

console.log(`Searching for 50 in [${sortedArray}]`);
let index1 = fibonacciSearch(sortedArray, 50);
console.log(`Found at index: ${index1} (Expected: 4)`); // Expected: 4

console.log(`\nSearching for 10 in [${sortedArray}]`);
let index2 = fibonacciSearch(sortedArray, 10);
console.log(`Found at index: ${index2} (Expected: 0)`); // Expected: 0

console.log(`\nSearching for 100 in [${sortedArray}]`);
let index3 = fibonacciSearch(sortedArray, 100);
console.log(`Found at index: ${index3} (Expected: 9)`); // Expected: 9

console.log(`\nSearching for 45 (not in array) in [${sortedArray}]`);
let index4 = fibonacciSearch(sortedArray, 45);
console.log(`Found at index: ${index4} (Expected: -1)`); // Expected: -1

const smallArray = [5];
console.log(`\nSearching for 5 in [${smallArray}]`);
let index5 = fibonacciSearch(smallArray, 5);
console.log(`Found at index: ${index5} (Expected: 0)`); // Expected: 0

console.log(`\nSearching for 10 in [${smallArray}]`);
let index6 = fibonacciSearch(smallArray, 10);
console.log(`Found at index: ${index6} (Expected: -1)`); // Expected: -1

const emptyArray: number[] = [];
console.log(`\nSearching for 5 in [${emptyArray}]`);
let index7 = fibonacciSearch(emptyArray, 5);
console.log(`Found at index: ${index7} (Expected: -1)`); // Expected: -1

const twoElements = [10, 20];
console.log(`\nSearching for 20 in [${twoElements}]`);
let index8 = fibonacciSearch(twoElements, 20);
console.log(`Found at index: ${index8} (Expected: 1)`); // Expected: 1

console.log(`\nSearching for 10 in [${twoElements}]`);
let index9 = fibonacciSearch(twoElements, 10);
console.log(`Found at index: ${index9} (Expected: 0)`); // Expected: 0

console.log(`\nSearching for 15 in [${twoElements}]`);
let index10 = fibonacciSearch(twoElements, 15);
console.log(`Found at index: ${index10} (Expected: -1)`); // Expected: -1
