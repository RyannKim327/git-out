/**
 * Returns the majority element of a non‑empty array
 * or null if no majority exists.
 */
function majorityElement(nums: number[]): number | null {
  let candidate: number | null = null;
  let count = 0;

  // 1️⃣ first pass – find a candidate
  for (const x of nums) {
    if (count === 0) {
      candidate = x;
      count = 1;
    } else if (x === candidate) {
      count++;
    } else {
      count--;
    }
  }

  // 2️⃣ optional second pass – verify the candidate
  if (candidate !== null) {
    count = 0;
    for (const x of nums) if (x === candidate) count++;

    return count > Math.floor(nums.length / 2) ? candidate : null;
  }

  return null;
}
const arr = [1, 2, 3, 1, 1];
console.log(majorityElement(arr)); // 1

const noMajority = [1, 2, 3, 4];
console.log(majorityElement(noMajority)); // null
function majorityWithMap(nums: number[]): number | null {
  const freq = new Map<number, number>();
  const half = Math.floor(nums.length / 2);

  for (const x of nums) {
    const newCount = (freq.get(x) || 0) + 1;
    freq.set(x, newCount);
    if (newCount > half) return x;
  }
  return null;
}
