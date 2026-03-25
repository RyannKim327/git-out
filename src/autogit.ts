/**
 * Returns the second largest number in an array.
 * If the array has fewer than 2 distinct numbers, returns `undefined`.
 */
function secondLargest(nums: number[]): number | undefined {
  let max = -Infinity;
  let second = -Infinity;

  for (const n of nums) {
    if (n > max) {
      second = max;   // old max becomes second
      max = n;        // new max
    } else if (n > second && n < max) {
      // distinct value that’s between max and second
      second = n;
    }
  }

  return second === -Infinity ? undefined : second;
}
console.log(secondLargest([1, 3, 5, 7, 9]));   // 7
console.log(secondLargest([4, 4, 4, 4]));      // undefined (no distinct second)
console.log(secondLargest([10, 9, 9, 8]));     // 9 (if duplicates count)
console.log(secondLargest([2]));               // undefined
function secondLargestSorted(nums: number[]): number | undefined {
  const sorted = [...nums].sort((a, b) => b - a); // descending
  const uniq = [...new Set(sorted)];             // drop duplicates
  return uniq[1];                                // second element if exists
}
