/**
 * Radix sort (Least–Significant‑digit first) for arrays of non‑negative integers.
 *
 * Time:  O(k * n)  where k = number of digits in the largest number
 * Space: O(n + B)  (B = 10 for base‑10)
 */
function radixSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums.slice();

  // Find the biggest value to know how many digits we need to process
  const maxVal = Math.max(...nums);
  const maxDigits = Math.floor(Math.log10(maxVal)) + 1;

  // Start from the least significant digit
  let divisor = 1;

  // We'll reuse these buckets in each pass to keep O(n) allocations
  const buckets: number[][] = Array.from({ length: 10 }, () => []);

  for (let d = 0; d < maxDigits; d++) {
    // Distribute
    for (const num of nums) {
      const bucketIndex = Math.floor(num / divisor) % 10;
      buckets[bucketIndex].push(num);
    }

    // Collect back into nums, empty buckets for the next pass
    let pos = 0;
    for (const bucket of buckets) {
      while (bucket.length) {
        nums[pos++] = bucket.pop() as number; // pop gives LIFO but we reverse order below
      }
      bucket.length = 0; // reset
    }

    divisor *= 10; // move to the next digit
  }

  return nums;
}
function radixSortStable(nums: number[]): number[] {
  if (nums.length <= 1) return nums.slice();

  const maxVal = Math.max(...nums);
  const maxDigits = Math.floor(Math.log10(maxVal)) + 1;

  let divisor = 1;
  const buckets: number[][] = Array.from({ length: 10 }, () => []);

  for (let d = 0; d < maxDigits; d++) {
    for (const n of nums) {
      const idx = Math.floor(n / divisor) % 10;
      buckets[idx].push(n);
    }

    let i = 0;
    for (const bucket of buckets) {
      while (bucket.length) {
        nums[i++] = bucket.shift() as number; // shift preserves order
      }
    }

    divisor *= 10;
  }

  return nums;
}
const data = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSortStable(data));
// → [2, 24, 45, 66, 75, 90, 170, 802]
