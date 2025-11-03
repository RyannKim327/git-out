function findCommonElements<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => array2.includes(item));
}

// Example usage:
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const common = findCommonElements(arr1, arr2); // Output: [3, 4]
function findCommonElements<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  return array1.filter(item => set2.has(item));
}

// Example usage:
// Same result as above but more efficient O(n + m)
function findUniqueCommonElements<T>(array1: T[], array2: T[]): T[] {
  const set1 = new Set(array1);
  const set2 = new Set(array2);
  return [...set1].filter(item => set2.has(item));
}

// Example: 
// findUniqueCommonElements([2, 2, 3], [2, 3]) => [2, 3] (no duplicates)
// Empty array checks
const empty = findCommonElements([], [1, 2]); // Returns []

// Mixed types (TypeScript will error if incompatible types are passed)
const numbers = [1, 2, 3];
const strings = ["1", "2"];
findCommonElements(numbers, strings); // ❌ TypeScript compilation error
