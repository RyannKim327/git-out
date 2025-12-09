/**
 * Implements the Fibonacci search algorithm to find an element in a sorted array.
 *
 * @param arr The sorted array of numbers to search within.
 * @param target The number to search for.
 * @returns The index of the target if found, otherwise -1.
 */
function fibonacciSearch(arr: number[], target: number): number {
    const n = arr.length;

    // Edge case: empty array
    if (n === 0) {
        return -1;
    }

    // 1. Initialize Fibonacci numbers
    // fibMMm2 stores F(k-2)
    // fibMMm1 stores F(k-1)
    // fibM stores F(k)
    let fibMMm2 = 0; // F(0)
    let fibMMm1 = 1; // F(1)
    let fibM = fibMMm1 + fibMMm2; // F(2) initially 1

    // 2. Find the smallest Fibonacci number fibM that is greater than or equal to n
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm1 + fibMMm2;
    }

    // 3. Mark the eliminated range from the front.
    // This variable helps in narrowing down the search space.
    let offset = -1;

    // 4. Main search loop: while there are elements to be inspected
    // (fibM will be > 1 as long as there's a segment larger than 1 element)
    while (fibM > 1) {
        // Calculate the index 'i' to check.
        // This index divides the array based on Fibonacci numbers.
        // Math.min ensures 'i' does not exceed the array bounds.
        const i = Math.min(offset + fibMMm2, n - 1);

        // If target is greater than the value at index i,
        // it means the target is in the right segment.
        if (arr[i] < target) {
            // Cut the array from arr[0] to i (inclusive).
            // Update Fibonacci numbers for the remaining right segment:
            // F(k) becomes F(k-1)
            // F(k-1) becomes F(k-2)
            // F(k-2) becomes F(k-3)
            fibM = fibMMm1;      // F(k) = F(k-1)
            fibMMm1 = fibMMm2;    // F(k-1) = F(k-2)
            fibMMm2 = fibM - fibMMm1; // F(k-2) = F(k-3) (old fibM - old fibMMm1)
            offset = i;           // Update offset to the new start of the segment.
        }
        // If target is less than the value at index i,
        // it means the target is in the left segment.
        else if (arr[i] > target) {
            // Cut the array from i (inclusive) to the end.
            // Update Fibonacci numbers for the remaining left segment:
            // F(k) becomes F(k-2)
            // F(k-1) becomes F(k-3)
            // F(k-2) becomes F(k-4)
            fibM = fibMMm2;      // F(k) = F(k-2)
            fibMMm1 = fibMMm1 - fibMMm2; // F(k-1) = F(k-3) (F(k-1) - F(k-2))
            fibMMm2 = fibM - fibMMm1;   // F(k-2) = F(k-4) (F(k-2) - F(k-3))
            // offset remains unchanged as the start of the segment is the same.
        }
        // If arr[i] is equal to target, we found it!
        else {
            return i;
        }
    }

    // 5. Compare the last remaining element (if fibM becomes 1)
    // After the loop, if fibMMm1 is 1, there might be one element left to check:
    // This check is for arr[offset + 1] which would be the last element if Fk=2 and Fk-1=1.
    if (fibMMm1 === 1 && offset + 1 < n && arr[offset + 1] === target) {
        return offset + 1;
    }

    // 6. Element not found
    return -1;
}

// --- Example Usage ---

const sortedArray1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log(`Array: ${sortedArray1}`);

console.log(`Searching for 70: ${fibonacciSearch(sortedArray1, 70)} (Expected: 6)`);
console.log(`Searching for 10: ${fibonacciSearch(sortedArray1, 10)} (Expected: 0)`);
console.log(`Searching for 100: ${fibonacciSearch(sortedArray1, 100)} (Expected: 9)`);
console.log(`Searching for 55: ${fibonacciSearch(sortedArray1, 55)} (Expected: -1)`);
console.log(`Searching for 1: ${fibonacciSearch(sortedArray1, 1)} (Expected: -1)`);
console.log(`Searching for 110: ${fibonacciSearch(sortedArray1, 110)} (Expected: -1)`);

const sortedArray2 = [1, 2, 3, 4, 5, 6, 7];
console.log(`\nArray: ${sortedArray2}`);
console.log(`Searching for 4: ${fibonacciSearch(sortedArray2, 4)} (Expected: 3)`);
console.log(`Searching for 1: ${fibonacciSearch(sortedArray2, 1)} (Expected: 0)`);
console.log(`Searching for 7: ${fibonacciSearch(sortedArray2, 7)} (Expected: 6)`);
console.log(`Searching for 0: ${fibonacciSearch(sortedArray2, 0)} (Expected: -1)`);

const singleElementArray = [42];
console.log(`\nArray: ${singleElementArray}`);
console.log(`Searching for 42: ${fibonacciSearch(singleElementArray, 42)} (Expected: 0)`);
console.log(`Searching for 10: ${fibonacciSearch(singleElementArray, 10)} (Expected: -1)`);

const emptyArray: number[] = [];
console.log(`\nArray: ${emptyArray}`);
console.log(`Searching for 5: ${fibonacciSearch(emptyArray, 5)} (Expected: -1)`);
