/**
 * Returns the second largest value in an array.
 * Uses a single pass – O(n) time, O(1) extra space.
 *
 * @param nums – numeric array
 * @returns second largest number, or `undefined` if it can’t be determined
 */
function secondLargest(nums: number[]): number | undefined {
  if (nums.length < 2) return undefined;

  let largest = -Infinity;
  let second = -Infinity;

  for (const n of nums) {
    if (n > largest) {
      second = largest;   // old largest becomes second
      largest = n;
    } else if (n > second && n !== largest) {
      // n is between largest and second – update second
      second = n;
    }
  }

  return second === -Infinity ? undefined : second;
}

// quick demo
console.log(secondLargest([3, 1, 4, 1, 5, 9, 2, 6, 5])); // 8
console.log(secondLargest([42]));                         // undefined
console.log(secondLargest([7, 7, 7]));                     // undefined – no distinct second value
