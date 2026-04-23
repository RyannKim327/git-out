// O(n) time, O(1) space – the classic Boyer‑Moore vote‑count algorithm
function majorityElement(nums: number[]): number | null {
  if (nums.length === 0) return null;  // no data

  // 1️⃣ First pass: find a candidate
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = nums[i];
        count = 1;
      }
    }
  }

  // 2️⃣ Second pass: verify that the candidate really is the majority
  count = 0;
  for (const v of nums) if (v === candidate) count++;

  return count > Math.floor(nums.length / 2) ? candidate : null;
}
function majorityElementUsingMap(nums: number[]): number | null {
  const freq = new Map<number, number>();
  const threshold = Math.floor(nums.length / 2);

  for (const n of nums) {
    freq.set(n, (freq.get(n) ?? 0) + 1);
    if (freq.get(n)! > threshold) {
      return n;            // early win
    }
  }
  return null;              // nothing crossed threshold
}
console.log(majorityElement([3, 3, 4, 2, 3]));          // 3
console.log(majorityElement([1, 2, 3, 4]));             // null (no majority)
console.log(majorityElementUsingMap([1, 1, 2, 1, 3]));  // 1
function majorityString<T>(arr: T[]): T | null { /* same logic, just generic */ }
