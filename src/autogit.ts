/**
 * Return the majority element of an array – the value that occurs
 * strictly more than half the time. If no such element exists the
 * function throws an Error.
 *
 * @param arr Array of comparable values (e.g. numbers, strings, etc.)
 */
export function majorityElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }

  // Phase 1 – Find a candidate
  let candidate = arr[0];
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === candidate) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = arr[i];
        count = 1;
      }
    }
  }

  // Phase 2 – Verify the candidate (optional if the problem guarantees a majority)
  count = 0;
  for (const v of arr) {
    if (v === candidate) count++;
  }

  if (count > Math.floor(arr.length / 2)) {
    return candidate;
  }

  throw new Error('No majority element found');
}
export function majorityElementWithMap<T>(arr: T[]): T {
  const freq = new Map<T, number>();

  // Count occurrences
  for (const v of arr) {
    freq.set(v, (freq.get(v) ?? 0) + 1);
  }

  // Find the element that tops the midway mark
  const threshold = Math.floor(arr.length / 2);
  for (const [val, count] of freq) {
    if (count > threshold) return val;
  }

  throw new Error('No majority element found');
}
export function majorityElementSorted<T>(arr: T[]): T {
  if (arr.length === 0) throw new Error('Array is empty');

  const sorted = [...arr].sort();  // shallow copy + in‑place sort
  const candidate = sorted[Math.floor(sorted.length / 2)];
  
  // Optional: verify the candidate
  let count = 0;
  for (const v of arr) if (v === candidate) count++;
  if (count > Math.floor(arr.length / 2)) return candidate;

  throw new Error('No majority element found');
}
console.log(majorityElement([1, 1, 2, 1, 3, 1]));          // → 1
console.log(majorityElementWithMap(['a', 'b', 'a', 'a']));  // → 'a'
console.log(majorityElementSorted([5, 5, 5, 5, 2]));        // → 5
