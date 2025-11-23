/**
 * Returns the majority element (if any) in O(n) time and O(1) space.
 * If no majority exists → undefined.
 */
function majorityElement<T>(nums: T[]): T | undefined {
  /* ---------- 1. Voting phase ---------- */
  let candidate: T | undefined;
  let count = 0;

  for (const val of nums) {
    if (count === 0) candidate = val;   // pick new candidate
    count += (val === candidate) ? 1 : -1;
  }

  /* ---------- 2. Verification phase ---------- */
  if (candidate === undefined) return undefined;

  let occurs = 0;
  for (const val of nums) if (val === candidate) ++occurs;

  return occurs > Math.floor(nums.length / 2) ? candidate : undefined;
}

/* ---------- 3. Quick checks ---------- */
console.log(majorityElement([2, 2, 1, 2, 2])); // 2
console.log(majorityElement([3, 3, 4, 2, 4, 4, 2, 4, 4])); // 4
console.log(majorityElement([1, 2, 3]));        // undefined
