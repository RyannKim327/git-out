/**
 * Return the majority element (> n/2) if it exists, or null otherwise.
 * @param arr array of numbers (or any comparable type)
 */
export function majorityElement<T>(arr: T[]): T | null {
  if (!arr.length) return null;

  /* ---------- 1st pass: find candidate ---------- */
  let candidate = arr[0];
  let count = 0;

  for (const num of arr) {
    if (count === 0) {
      candidate = num;
      count = 1;
    } else {
      count += (num === candidate) ? 1 : -1;
    }
  }

  /* ---------- 2nd pass: verify candidate ---------- */
  let freq = 0;
  for (const num of arr) {
    if (num === candidate) freq++;
  }

  return (freq > Math.floor(arr.length / 2)) ? candidate : null;
}
const nums = [3, 1, 3, 3, 2, 3, 3];
const majority = majorityElement(nums);
console.log(majority); // → 3
export function majorityElementMap<T>(arr: T[]): T | null {
  const counts = new Map<T, number>();
  
  for (const val of arr) {
    counts.set(val, (counts.get(val) ?? 0) + 1);
  }

  const threshold = Math.floor(arr.length / 2);
  for (const [val, cnt] of counts) {
    if (cnt > threshold) return val;
  }
  return null;
}
