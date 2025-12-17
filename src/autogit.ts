export function findMajority<T>(arr: T[]): T | null {
  let candidate: T | undefined;
  let count = 0;

  // 1st pass: find a candidate
  for (const x of arr) {
    if (count === 0) candidate = x;
    if (candidate === x) {
      count++;
    } else {
      count--;
    }
  }

  // 2nd pass: verify the candidate actually appears more than n/2 times
  if (candidate !== undefined) {
    let occurrences = 0;
    for (const x of arr) {
      if (x === candidate) occurrences++;
    }
    if (occurrences > Math.floor(arr.length / 2)) {
      return candidate;
    }
  }

  return null;
}
export function findMajorityWithMap<T>(arr: T[]): T | null {
  const freq = new Map<T, number>();
  const half = Math.floor(arr.length / 2);

  for (const x of arr) {
    const c = (freq.get(x) ?? 0) + 1;
    freq.set(x, c);
    if (c > half) return x;
  }
  return null;
}
const a = [3, 1, 3, 3, 2];
console.log(findMajority(a)); // 3

const b = [1, 2, 3, 4];
console.log(findMajority(b)); // null
