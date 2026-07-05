/**
 * Returns the majority element of the array if one exists,
 * otherwise returns undefined.
 *
 * @param arr an array of comparable values (number, string, …)
 */
export function findMajority<T extends number | string | boolean>(
  arr: T[]
): T | undefined {
  // 1️⃣ find a candidate
  let candidate: T | undefined;
  let count = 0;

  for (const val of arr) {
    if (count === 0) {
      candidate = val;
      count = 1;
    } else if (val === candidate) {
      count++;
    } else {
      count--;
    }
  }

  // 2️⃣ verify that the candidate is actually a majority
  if (candidate === undefined) return undefined;

  let freq = 0;
  for (const v of arr) if (v === candidate) freq++;

  return freq > Math.floor(arr.length / 2) ? candidate : undefined;
}
console.log(findMajority([3, 3, 4, 2, 3]));      // → 3
console.log(findMajority([1, 2, 3, 4]));          // → undefined (no majority)
console.log(findMajority(['a', 'a', 'b']));       // → 'a'
export function findMajorityWithMap<T>(
  arr: T[]
): T | undefined {
  const map = new Map<T, number>();
  const threshold = Math.floor(arr.length / 2);

  for (const v of arr) {
    const newCount = (map.get(v) ?? 0) + 1;
    map.set(v, newCount);
    if (newCount > threshold) return v;
  }
  return undefined;
}
