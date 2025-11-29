/**
 * Returns the majority element if it exists, otherwise undefined.
 * @param nums Array of numbers
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

  const occurrences = nums.filter(n => n === candidate).length;
  return occurrences > Math.floor(nums.length / 2) ? candidate : undefined;
}

/* ---------- Usage ---------- */
const a = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(a)); // → 2

const b = [3, 3, 4, 2, 4, 4, 2, 4, 4];
console.log(majorityElement(b)); // → 4

const c = [1, 2, 3];
console.log(majorityElement(c)); // → undefined (no majority)
