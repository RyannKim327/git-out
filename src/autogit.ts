/**
 * Returns the intersection of two arrays.
 * @param a  First array.
 * @param b  Second array.
 * @returns  Array containing elements that are present in **both** a and b.
 */
function intersection<T>(a: T[], b: T[]): T[] {
  // Turn the first array into a Set for O(1) look‑ups.
  const aSet = new Set(a);

  // Keep only the items from `b` that are also in `aSet`.
  const result: T[] = [];
  for (const item of b) {
    if (aSet.has(item)) {
      result.push(item);
      // Optional: remove the item so we don’t collect duplicates if
      // `a` or `b` contains repeated entries
      aSet.delete(item);
    }
  }
  return result;
}
console.log(intersection([1, 2, 3, 4], [3, 4, 5, 6])); // → [3, 4]

console.log(intersection(['foo', 'bar'], ['bar', 'baz', 'foo'])); // → ['bar', 'foo']

// With duplicates
console.log(intersection([1, 2, 2], [2, 2, 3])); // → [2]
const intersection = (a: any[], b: any[]) => a.filter(x => b.includes(x));
