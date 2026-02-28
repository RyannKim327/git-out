/**
 * Returns the second largest number in `arr`.
 * If the array has fewer than two distinct numbers, returns `undefined`.
 */
function secondLargest(arr: number[]): number | undefined {
  if (arr.length < 2) return undefined;

  let first: number | null = null;
  let second: number | null = null;

  for (const x of arr) {
    if (first === null || x > first) {
      // New maximum found – push the old maximum down to second
      second = first;
      first = x;
    } else if (x !== first && (second === null || x > second)) {
      // Candidate for second maximum
      second = x;
    }
  }

  return second ?? undefined;
}
console.log(secondLargest([1, 3, 5, 7])); // 5
console.log(secondLargest([10, 9]));      // 9
console.log(secondLargest([4]));          // undefined
console.log(secondLargest([2, 2, 2]));    // undefined
