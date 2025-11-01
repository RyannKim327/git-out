/**
 * Finds the majority element in an array using a hash map (frequency counter).
 * A majority element appears more than n/2 times.
 *
 * @param arr The input array.
 * @returns The majority element, or null if no majority element exists or the array is empty.
 */
function findMajorityElementHashMap<T>(arr: T[]): T | null {
    if (arr.length === 0) {
        return null;
    }
    if (arr.length === 1) {
        return arr[0];
    }

    const counts = new Map<T, number>();
    for (const item of arr) {
        counts.set(item, (counts.get(item) || 0) + 1);
    }

    const majorityThreshold = arr.length / 2;
    for (const [item, count] of counts.entries()) {
        if (count > majorityThreshold) {
            return item;
        }
    }

    // No majority element found
    return null;
}

// --- Examples ---
console.log("--- Hash Map Method ---");
console.log("[3,2,3]", findMajorityElementHashMap([3, 2, 3])); // Output: 3
console.log("[2,2,1,1,1,2,2]", findMajorityElementHashMap([2, 2, 1, 1, 1, 2, 2])); // Output: 2
console.log("[1]", findMajorityElementHashMap([1])); // Output: 1
console.log("[]", findMajorityElementHashMap([])); // Output: null
console.log("[1,2,3,4]", findMajorityElementHashMap([1, 2, 3, 4])); // Output: null (no majority)
console.log("[1,1,2,2]", findMajorityElementHashMap([1, 1, 2, 2])); // Output: null (no majority, 2/4 not > 4/2)
console.log("[A, B, A, C, A]", findMajorityElementHashMap(['A', 'B', 'A', 'C', 'A'])); // Output: 'A'

// Works with objects too, but compares by reference
const obj1 = { id: 1 };
const obj2 = { id: 2 };
console.log("[obj1, obj2, obj1, obj1]", findMajorityElementHashMap([obj1, obj2, obj1, obj1])); // Output: { id: 1 }
/**
 * Finds the majority element using the Boyer-Moore Voting Algorithm.
 * This algorithm is efficient (O(n) time, O(1) space).
 * It requires a second pass to verify the candidate if a majority element is not guaranteed to exist.
 *
 * @param arr The input array.
 * @returns The majority element, or null if no majority element exists or the array is empty.
 */
function findMajorityElementBoyerMoore<T>(arr: T[]): T | null {
    if (arr.length === 0) {
        return null;
    }
    if (arr.length === 1) {
        return arr[0];
    }

    let candidate: T | null = null;
    let count = 0;

    // First pass: Find a potential candidate
    for (const item of arr) {
        if (count === 0) {
            candidate = item;
            count = 1;
        } else if (item === candidate) { // Use === for comparison
            count++;
        } else {
            count--;
        }
    }

    // Second pass: Verify if the candidate is truly the majority element
    // This pass is crucial if the problem doesn't guarantee a majority element exists.
    if (candidate === null) {
        return null; // Should not happen if arr.length > 0
    }

    let actualCount = 0;
    for (const item of arr) {
        if (item === candidate) {
            actualCount++;
        }
    }

    if (actualCount > arr.length / 2) {
        return candidate;
    } else {
        return null; // Candidate was not a true majority element
    }
}

// --- Examples ---
console.log("\n--- Boyer-Moore Method ---");
console.log("[3,2,3]", findMajorityElementBoyerMoore([3, 2, 3])); // Output: 3
console.log("[2,2,1,1,1,2,2]", findMajorityElementBoyerMoore([2, 2, 1, 1, 1, 2, 2])); // Output: 2
console.log("[1]", findMajorityElementBoyerMoore([1])); // Output: 1
console.log("[]", findMajorityElementBoyerMoore([])); // Output: null
console.log("[1,2,3,4]", findMajorityElementBoyerMoore([1, 2, 3, 4])); // Output: null
console.log("[1,1,2,2]", findMajorityElementBoyerMoore([1, 1, 2, 2])); // Output: null
console.log("[A, B, A, C, A]", findMajorityElementBoyerMoore(['A', 'B', 'A', 'C', 'A'])); // Output: 'A'
/**
 * Finds the majority element by sorting the array.
 * If a majority element exists, it will be at the middle index after sorting.
 *
 * @param arr The input array.
 * @param compareFn An optional comparison function for sorting (e.g., `(a,b) => a-b` for numbers).
 * @returns The majority element, or null if no majority element exists or the array is empty.
 */
function findMajorityElementSorting<T>(
    arr: T[],
    compareFn?: (a: T, b: T) => number
): T | null {
    if (arr.length === 0) {
        return null;
    }
    if (arr.length === 1) {
        return arr[0];
    }

    // Create a shallow copy to avoid modifying the original array
    // Use `compareFn` for proper sorting of numbers or custom objects
    const sortedArr = [...arr].sort(compareFn);

    // The element at the middle index is the potential majority element
    const potentialMajority = sortedArr[Math.floor(sortedArr.length / 2)];

    // Verify if the potential majority element actually appears > n/2 times
    // We iterate the original array to count, which is safer if `compareFn` has side effects or alters references.
    // However, for typical sorting, iterating `sortedArr` would also work.
    let count = 0;
    for (const item of arr) {
        // This comparison assumes `potentialMajority` is referentially or primitively equal
        // for complex objects, you might need a custom equality check here too.
        if (item === potentialMajority) {
            count++;
        }
    }

    if (count > arr.length / 2) {
        return potentialMajority;
    } else {
        return null; // The middle element was not a true majority
    }
}

// --- Examples ---
console.log("\n--- Sorting Method ---");
console.log("[3,2,3]", findMajorityElementSorting([3, 2, 3], (a, b) => a - b)); // Output: 3
console.log("[2,2,1,1,1,2,2]", findMajorityElementSorting([2, 2, 1, 1, 1, 2, 2], (a, b) => a - b)); // Output: 2
console.log("[1]", findMajorityElementSorting([1], (a, b) => a - b)); // Output: 1
console.log("[]", findMajorityElementSorting([], (a, b) => a - b)); // Output: null
console.log("[1,2,3,4]", findMajorityElementSorting([1, 2, 3, 4], (a, b) => a - b)); // Output: null
console.log("[A, B, A, C, A]", findMajorityElementSorting(['A', 'B', 'A', 'C', 'A'])); // Output: 'A' (default string sort works)
