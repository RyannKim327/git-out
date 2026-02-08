/**
 * Returns true if the array is in strictly ascending order (each element ≤ the next one).
 * Works for numbers, strings, or any type that can be compared with < / >.
 */
export function isAscending<T>(arr: T[], comparator?: (a: T, b: T) => number): boolean {
  // If the user passes a custom comparator, use it; otherwise fall back to natural order.
  const cmp = comparator ?? ((a: T, b: T) => a < b ? -1 : a > b ? 1 : 0);

  // Iterate until we find a pair that violates the ascending rule.
  for (let i = 1; i < arr.length; i++) {
    if (cmp(arr[i - 1], arr[i]) > 0) {
      return false; // arr[i-1] > arr[i], not ascending
    }
  }
  return true;          // All pairs passed the test
}
// Numbers (default comparator)
console.log(isAscending([1, 2, 3, 4])); // true
console.log(isAscending([1, 3, 2, 4])); // false

// Strings (lexicographic order)
console.log(isAscending(['apple', 'banana', 'cherry'])); // true

// Custom comparison – e.g., sort by string length
const byLength = (a: string, b: string) => a.length - b.length;
console.log(isAscending(['a', 'bb', 'ccc'], byLength)); // true
