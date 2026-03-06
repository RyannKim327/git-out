/**
 * Return the intersection of two arrays.
 *
 * @param a First array
 * @param b Second array
 * @returns Array containing only the values that appear in both `a` and `b`
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  // Turn the second array into a Set for O(1) look‑ups.
  const lookup = new Set(b);

  // Keep every element of `a` that also exists in the Set.
  return a.filter(item => lookup.has(item));
}

// Example usage:
const colors1 = ['red', 'green', 'blue', 'green'];
const colors2 = ['cyan', 'green', 'red', 'yellow'];

const commonColors = intersection(colors1, colors2);
console.log(commonColors); // → ['red', 'green', 'green']
