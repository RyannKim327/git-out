const arr = [10, 9, 2, 5, 3, 7, 101, 18];
/**
 * Returns one longest increasing subsequence of the given array.
 * Works for any type that can be compared with < (e.g. number, string).
 *
 * @param arr - input array
 * @returns the LIS as a new array
 */
export function lisDP<T>(arr: T[]): T[] {
  const n = arr.length;
  if (n === 0) return [];

  // dp[i] = length of LIS ending at i
  const dp = new Array<number>(n).fill(1);
  // prev[i] = index of previous element in the LIS ending at i
  const prev = new Array<number>(n).fill(-1);

  let maxLen = 1;
  let maxIdx = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      maxIdx = i;
    }
  }

  // Reconstruct the subsequence
  const lis: T[] = [];
  for (let cur = maxIdx; cur !== -1; cur = prev[cur]) {
    lis.push(arr[cur]);
  }
  lis.reverse(); // we built it backwards
  return lis;
}
import { lisDP } from "./lis";

const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lisDP(arr)); // → [2, 3, 7, 101]
/**
 * O(n log n) longest increasing subsequence.
 * Returns one LIS (any one, not necessarily unique).
 *
 * @param arr - input array of comparable values
 * @returns the LIS as a new array
 */
export function lisPatience<T>(arr: T[]): T[] {
  const n = arr.length;
  if (n === 0) return [];

  // tails[i] = index of the smallest possible tail of an LIS of length i+1
  const tails: number[] = [];
  // prevIdx[i] = index of the predecessor of arr[i] in the LIS ending at i
  const prevIdx = new Array<number>(n).fill(-1);
  // pos[i] = length of the LIS ending at i (1‑based)
  const pos = new Array<number>(n).fill(0);

  // Helper: binary search for the first element >= target in tails (by value)
  const lowerBound = (target: T): number => {
    let lo = 0;
    let hi = tails.length; // exclusive
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[tails[mid]] < target) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };

  for (let i = 0; i < n; i++) {
    const idx = lowerBound(arr[i]); // length-1 where arr[i] fits
    if (idx > 0) prevIdx[i] = tails[idx - 1];
    tails[idx] = i;
    pos[i] = idx + 1; // store length (1‑based)
  }

  // Reconstruct LIS from the last index stored in tails
  const lisLength = tails.length;
  const lis: T[] = new Array<T>(lisLength);
  let k = tails[tails.length - 1];
  for (let i = lisLength - 1; i >= 0; i--) {
    lis[i] = arr[k];
    k = prevIdx[k];
  }
  return lis;
}
import { lisPatience } from "./lis";

const arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lisPatience(arr)); // → [2, 3, 7, 101]
import { lisDP, lisPatience } from "./lis";

function benchmark<T>(fn: (arr: T[]) => T[], arr: T[], label: string) {
  const start = performance.now();
  const result = fn(arr);
  const end = performance.now();
  console.log(`${label}: length=${result.length}, time=${(end - start).toFixed(2)}ms`);
}

// Small test
const small = [10, 9, 2, 5, 3, 7, 101, 18];
console.log("DP:", lisDP(small));
console.log("Patience:", lisPatience(small));

// Larger random test (size 100 000)
const large = Array.from({ length: 100_000 }, () => Math.floor(Math.random() * 1_000_000));

benchmark(lisDP, large, "DP (O(n²))");          // will be slow for 100k, just for demo
benchmark(lisPatience, large, "Patience (O(n log n))");
// O(n log n) LIS in TypeScript
export const lis = (a: number[]) => {
  const tails: number[] = [], prev = new Array<number>(a.length).fill(-1);
  const lower = (x: number) => {
    let l = 0, r = tails.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (a[tails[m]] < x) l = m + 1; else r = m;
    }
    return l;
  };
  for (let i = 0; i < a.length; i++) {
    const p = lower(a[i]);
    if (p) prev[i] = tails[p - 1];
    tails[p] = i;
  }
  const res: number[] = [];
  for (let i = tails[tails.length - 1]; i !== -1; i = prev[i]) res.push(a[i]);
  return res.reverse();
};
