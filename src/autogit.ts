function findMajorityElementMap<T>(arr: T[]): T | undefined {
    const n = arr.length;
    if (n === 0) {
        return undefined;
    }
    if (n === 1) {
        return arr[0];
    }

    const counts = new Map<T, number>();
    const threshold = Math.floor(n / 2); // Calculate n/2

    for (const item of arr) {
        counts.set(item, (counts.get(item) || 0) + 1);
        // Optimization: If a count exceeds threshold early, we can return
        // This only works if a majority element is GUARANTEED to exist
        // or if we're certain no other element could possibly catch up.
        // For robustness, it's safer to check after all counts are tallied.
    }

    // Now, iterate through the map to find the majority element
    for (const [element, count] of counts.entries()) {
        if (count > threshold) {
            return element;
        }
    }

    return undefined; // No majority element found
}

// --- Examples ---
console.log("--- Using Hash Map ---");
console.log("Numbers:", findMajorityElementMap([3, 2, 3])); // Output: 3
console.log("Numbers:", findMajorityElementMap([2, 2, 1, 1, 1, 2, 2])); // Output: 2
console.log("Numbers:", findMajorityElementMap([1, 2, 3])); // Output: undefined
console.log("Numbers:", findMajorityElementMap([])); // Output: undefined
console.log("Numbers:", findMajorityElementMap([7])); // Output: 7
console.log("Strings:", findMajorityElementMap(["apple", "banana", "apple", "apple", "orange"])); // Output: apple
function findMajorityElementBoyerMoore<T>(arr: T[]): T | undefined {
    const n = arr.length;
    if (n === 0) {
        return undefined;
    }
    if (n === 1) {
        return arr[0];
    }

    let candidate: T | undefined = undefined;
    let count = 0;

    // First pass: Find a potential candidate
    for (const item of arr) {
        if (count === 0) {
            candidate = item;
            count = 1;
        } else if (item === candidate) { // Use '===' for strict equality
            count++;
        } else {
            count--;
        }
    }

    // Second pass: Verify if the candidate is indeed the majority element
    // This step is necessary if the problem doesn't guarantee a majority element exists.
    let actualCount = 0;
    for (const item of arr) {
        if (item === candidate) {
            actualCount++;
        }
    }

    if (actualCount > Math.floor(n / 2)) {
        return candidate;
    } else {
        return undefined; // No majority element found or candidate wasn't truly majority
    }
}

// --- Examples ---
console.log("\n--- Using Boyer-Moore Voting Algorithm ---");
console.log("Numbers:", findMajorityElementBoyerMoore([3, 2, 3])); // Output: 3
console.log("Numbers:", findMajorityElementBoyerMoore([2, 2, 1, 1, 1, 2, 2])); // Output: 2
console.log("Numbers:", findMajorityElementBoyerMoore([1, 2, 3])); // Output: undefined
console.log("Numbers:", findMajorityElementBoyerMoore([])); // Output: undefined
console.log("Numbers:", findMajorityElementBoyerMoore([7])); // Output: 7
console.log("Strings:", findMajorityElementBoyerMoore(["apple", "banana", "apple", "apple", "orange"])); // Output: apple
function findMajorityElementSorting<T>(arr: T[]): T | undefined {
    const n = arr.length;
    if (n === 0) {
        return undefined;
    }
    if (n === 1) {
        return arr[0];
    }

    // Create a shallow copy to avoid modifying the original array
    // .sort() works for numbers directly if they are primitives.
    // For custom objects or complex sorting, a compare function is needed.
    const sortedArr = [...arr].sort();

    // The element at the middle index will be the majority element if one exists.
    const candidate = sortedArr[Math.floor(n / 2)];

    // Verification step (crucial if a majority element isn't guaranteed)
    let actualCount = 0;
    for (const item of arr) { // Iterate through the original array or sortedArr
        if (item === candidate) {
            actualCount++;
        }
    }

    if (actualCount > Math.floor(n / 2)) {
        return candidate;
    } else {
        return undefined; // No majority element found
    }
}

// --- Examples ---
console.log("\n--- Using Sorting ---");
console.log("Numbers:", findMajorityElementSorting([3, 2, 3])); // Output: 3
console.log("Numbers:", findMajorityElementSorting([2, 2, 1, 1, 1, 2, 2])); // Output: 2
console.log("Numbers:", findMajorityElementSorting([1, 2, 3])); // Output: undefined
console.log("Numbers:", findMajorityElementSorting([])); // Output: undefined
console.log("Numbers:", findMajorityElementSorting([7])); // Output: 7
console.log("Strings:", findMajorityElementSorting(["apple", "banana", "apple", "apple", "orange"])); // Output: apple
