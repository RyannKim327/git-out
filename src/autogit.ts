function findSecondLargestSorted(arr: number[]): number | undefined {
    if (arr.length < 2) {
        return undefined; // Not enough elements
    }

    // Create a copy to avoid modifying the original array
    const sortedArr = [...arr].sort((a, b) => a - b);

    return sortedArr[sortedArr.length - 2];
}

// Examples:
console.log("--- Sorted (potentially not distinct) ---");
console.log(findSecondLargestSorted([10, 5, 20, 8, 15])); // Output: 15
console.log(findSecondLargestSorted([5, 5, 5]));          // Output: 5 (might not be desired for "second largest")
console.log(findSecondLargestSorted([1, 2]));             // Output: 1
console.log(findSecondLargestSorted([7]));                // Output: undefined
console.log(findSecondLargestSorted([]));                 // Output: undefined
function findSecondLargestDistinctSorted(arr: number[]): number | undefined {
    if (arr.length < 2) {
        return undefined; // Not enough elements to have a second distinct largest
    }

    // 1. Remove duplicates using a Set
    const uniqueArr = Array.from(new Set(arr));

    // 2. Check if enough unique elements remain
    if (uniqueArr.length < 2) {
        return undefined; // After removing duplicates, there's no second distinct largest
    }

    // 3. Sort the unique elements
    uniqueArr.sort((a, b) => a - b);

    // 4. Return the second-to-last element
    return uniqueArr[uniqueArr.length - 2];
}

// Examples:
console.log("\n--- Sorted (distinct) ---");
console.log(findSecondLargestDistinctSorted([10, 5, 20, 8, 15])); // Output: 15
console.log(findSecondLargestDistinctSorted([5, 5, 5]));          // Output: undefined (no second *distinct* largest)
console.log(findSecondLargestDistinctSorted([1, 5, 5, 2]));       // Output: 2
console.log(findSecondLargestDistinctSorted([1, 2]));             // Output: 1
console.log(findSecondLargestDistinctSorted([7]));                // Output: undefined
console.log(findSecondLargestDistinctSorted([]));                 // Output: undefined
function findSecondLargestIterative(arr: number[]): number | undefined {
    if (arr.length < 2) {
        return undefined; // Not enough elements
    }

    // Initialize largest and secondLargest to a very small number
    // to ensure any number in the array will be greater.
    let largest = Number.MIN_SAFE_INTEGER;
    let secondLargest = Number.MIN_SAFE_INTEGER;

    for (const num of arr) {
        if (num > largest) {
            // If current number is greater than largest,
            // the previous largest becomes the secondLargest,
            // and current number becomes the new largest.
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num < largest) {
            // If current number is between largest and secondLargest,
            // and distinct from largest, it becomes the new secondLargest.
            secondLargest = num;
        }
        // If num is equal to largest, or less than secondLargest, do nothing.
    }

    // After iterating, if secondLargest is still MIN_SAFE_INTEGER,
    // it means there was no distinct second largest element (e.g., all elements were the same).
    if (secondLargest === Number.MIN_SAFE_INTEGER) {
        return undefined;
    }

    return secondLargest;
}

// Examples:
console.log("\n--- Iterative (distinct) ---");
console.log(findSecondLargestIterative([10, 5, 20, 8, 15])); // Output: 15
console.log(findSecondLargestIterative([5, 5, 5]));          // Output: undefined
console.log(findSecondLargestIterative([1, 5, 5, 2]));       // Output: 2
console.log(findSecondLargestIterative([1, 2]));             // Output: 1
console.log(findSecondLargestIterative([7]));                // Output: undefined
console.log(findSecondLargestIterative([]));                 // Output: undefined
console.log(findSecondLargestIterative([-10, -5, -20, -8])); // Output: -8
