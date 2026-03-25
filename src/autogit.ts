/**
 * Returns the majority element if it exists,
 * otherwise returns null.
 */
function majorityElement(arr: number[]): number | null {
  if (arr.length === 0) return null;

  // 1st pass – find a candidate
  let candidate = arr[0];
  let count = 0;

  for (const num of arr) {
    if (count === 0) {
      candidate = num;
      count = 1;
    } else {
      count += num === candidate ? 1 : -1;
    }
  }

  // 2nd pass – confirm candidate (optional but safe)
  count = 0;
  for (const num of arr) {
    if (num === candidate) count++;
  }

  return count > Math.floor(arr.length / 2) ? candidate : null;
}
/**
 * Returns the majority element if it exists,
 * otherwise returns null.
 */
function majorityElementMap(arr: number[]): number | null {
  const freq = new Map<number, number>();

  for (const num of arr) {
    freq.set(num, (freq.get(num) ?? 0) + 1);
  }

  const n = arr.length;
  for (const [num, count] of freq.entries()) {
    if (count > Math.floor(n / 2)) {
      return num;
    }
  }
  return null;
}
/**
 * Returns the majority element if it exists,
 * otherwise returns null.
 */
function majorityElementSorted(arr: number[]): number | null {
  if (arr.length === 0) return null;

  // Make a copy so we don’t mutate the caller’s array
  const sorted = [...arr].sort((a, b) => a - b);
  const candidate = sorted[Math.floor(sorted.length / 2)];
  let count = 0;

  for (const num of sorted) {
    if (num === candidate) count++;
  }

  return count > Math.floor(arr.length / 2) ? candidate : null;
}
const testArray = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(testArray));      // 2
console.log(majorityElementMap(testArray));   // 2
console.log(majorityElementSorted(testArray)); // 2
