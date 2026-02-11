/**
 * Returns the majority element if it exists.
 * If no element occurs > n/2 times, it returns undefined.
 */
function majorityElement<T>(arr: T[]): T | undefined {
  let candidate: T | undefined;
  let count = 0;

  // Step 1 – find a candidate
  for (const value of arr) {
    if (count === 0) {
      candidate = value;
      count = 1;
    } else if (value === candidate) {
      count++;
    } else {
      count--;
    }
  }

  // Step 2 – optional verification pass
  // (often omitted if you’re sure the input guarantees a majority)
  if (candidate !== undefined) {
    let occurrences = 0;
    for (const v of arr) {
      if (v === candidate) occurrences++;
    }
    if (occurrences > Math.floor(arr.length / 2)) {
      return candidate;
    }
  }

  return undefined; // no majority
}
function majorityUsingMap<T>(arr: T[]): T | undefined {
  const freq = new Map<T, number>();
  const threshold = Math.floor(arr.length / 2) + 1;

  for (const val of arr) {
    const newCount = (freq.get(val) ?? 0) + 1;
    if (newCount >= threshold) return val;
    freq.set(val, newCount);
  }
  return undefined;
}
