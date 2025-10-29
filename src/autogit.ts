function findCommonElementsSet<T>(arr1: T[], arr2: T[]): T[] {
    // Create a Set from the first array for O(1) average time lookups
    const set1 = new Set(arr1);

    // Filter the second array, keeping only elements present in set1
    const commonElements = arr2.filter(item => set1.has(item));

    // If you need strictly unique common elements (even if arr2 had duplicates),
    // convert the result to a Set and back to an Array.
    return Array.from(new Set(commonElements));
}

// --- Examples ---
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
console.log("Numbers (Set method):", findCommonElementsSet(numbers1, numbers2)); // Output: [3, 4, 5]

const strings1 = ["apple", "banana", "orange"];
const strings2 = ["banana", "grape", "apple", "kiwi"];
console.log("Strings (Set method):", findCommonElementsSet(strings1, strings2)); // Output: ["banana", "apple"]

const mixed1 = [1, "hello", 3, null];
const mixed2 = ["hello", 5, null, undefined];
console.log("Mixed (Set method):", findCommonElementsSet(mixed1, mixed2)); // Output: ["hello", null]

const withDuplicates1 = [1, 2, 2, 3, 4];
const withDuplicates2 = [2, 4, 4, 5];
console.log("With Duplicates (Set method):", findCommonElementsSet(withDuplicates1, withDuplicates2)); // Output: [2, 4]
// Note: If you want [2, 4, 4] (maintaining duplicates from the second array),
// simply return `commonElements` without `Array.from(new Set(...))`
// e.g., `return arr2.filter(item => set1.has(item));`
function findCommonElementsFilter<T>(arr1: T[], arr2: T[]): T[] {
    const commonElements = arr1.filter(item => arr2.includes(item));
    
    // If you want strictly unique common elements, convert to a Set and back:
    return Array.from(new Set(commonElements));
}

// --- Examples ---
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
console.log("Numbers (Filter method):", findCommonElementsFilter(numbers1, numbers2)); // Output: [3, 4, 5]

const withDuplicates1 = [1, 2, 2, 3, 4];
const withDuplicates2 = [2, 4, 4, 5];
console.log("With Duplicates (Filter method):", findCommonElementsFilter(withDuplicates1, withDuplicates2)); // Output: [2, 4]
// Note: If you want [2, 2, 4] (maintaining duplicates from the first array),
// simply return `commonElements` without `Array.from(new Set(...))`
// e.g., `return arr1.filter(item => arr2.includes(item));`
