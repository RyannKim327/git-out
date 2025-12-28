/**
 * Returns the majority element (if it exists).
 * @throws If no majority element exists.
 */
function majorityElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error('Empty array has no majority element');
  }

  /* ---------- 1. Boyer–Moore Voting ---------- */
  let candidate: T | undefined;
  let count = 0;

  for (const x of arr) {
    if (count === 0) candidate = x;
    count += (x === candidate ? 1 : -1);
  }

  /* ---------- 2. Verify the candidate ---------- */
  // Type guard: candidate is definitely defined here
  const majority = candidate as T;
  let freq = 0;
  for (const x of arr) if (x === majority) freq++;
  if (freq > Math.floor(arr.length / 2)) return majority;

  throw new Error('No majority element in array');
}

/* ---------- Usage ---------- */
const nums = [2, 1, 2, 2, 3, 2, 2];
console.log(majorityElement(nums)); // 2
