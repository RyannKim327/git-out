/**
 * Return the second largest distinct value in an array.
 * @param arr – numeric array
 * @returns The second largest number or `undefined` if it doesn’t exist
 */
function secondLargest(arr: number[]): number | undefined {
  if (arr.length < 2) return undefined;  // not enough elements

  let max = -Infinity;
  let second = -Infinity;

  for (const x of arr) {
    if (x > max) {
      second = max;   // previous max becomes second
      max = x;
    } else if (x < max && x > second) {
      second = x;     // distinct candidate for second
    }
    // values equal to max are ignored – we want distinct numbers
  }

  return second === -Infinity ? undefined : second;
}

// Example:
console.log(secondLargest([5, 1, 5, 7, 3])); // → 5
function secondLargestSorted(arr: number[]): number | undefined {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique[1];           // undefined if not enough distinct values
}
