/**
 * Returns the majority element if it exists, otherwise `undefined`.
 * @param nums array of numbers
 */
function majorityElement(nums: number[]): number | undefined {
  // 1. Voting phase – find a candidate
  let candidate: number | undefined;
  let count = 0;

  for (const n of nums) {
    if (count === 0) candidate = n;
    count += (n === candidate) ? 1 : -1;
  }

  // 2. Verification phase – make sure it really is the majority
  if (candidate === undefined) return undefined;

  let freq = 0;
  for (const n of nums) if (n === candidate) ++freq;

  return freq > Math.floor(nums.length / 2) ? candidate : undefined;
}

/* ---------- Usage ---------- */
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(arr)); // → 2
