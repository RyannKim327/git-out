/**
 * Returns one longest increasing subsequence and its length.
 * Runs in O(n²) time and O(n) extra space.
 *
 * @param arr - input array of numbers (or any comparable type)
 * @returns { length: number; subsequence: number[] }
 */
export function lisDP<T>(arr: T[], compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
  const n = arr.length;
  if (n === 0) return { length: 0, subsequence: [] };

  const dp = new Array<number>(n).fill(1);   // dp[i] = length of LIS ending at i
  const prev = new Array<number>(n).fill(-1); // predecessor index for reconstruction

  let bestLen = 1;
  let bestIdx = 0;

  for (let i = 1; i < n; ++i) {
    for (let j = 0; j < i; ++j) {
      if (compare(arr[j], arr[i]) < 0 && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > bestLen) {
      bestLen = dp[i];
      bestIdx = i;
    }
  }

  // Reconstruct the subsequence by walking backwards through `prev`
  const subsequence: T[] = [];
  for (let cur = bestIdx; cur !== -1; cur = prev[cur]) {
    subsequence.push(arr[cur]);
  }
  subsequence.reverse(); // we collected it backwards

  return { length: bestLen, subsequence };
}
import { lisDP } from "./lis";

const arr = [10, 9, 2, 5, 3, 7, 101, 18];
const { length, subsequence } = lisDP(arr);
console.log(length);      // 4
console.log(subsequence); // [2, 3, 7, 101] (one of the possible LIS)
/**
 * O(n log n) LIS using patience sorting + binary search.
 * Returns both the length and one concrete longest increasing subsequence.
 *
 * @param arr - input array of numbers (or any comparable type)
 * @param compare - optional comparator (default works for numbers, strings, etc.)
 * @returns { length: number; subsequence: T[] }
 */
export function lisPatience<T>(arr: T[], compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
  const n = arr.length;
  if (n === 0) return { length: 0, subsequence: [] };

  // tails[k] = smallest possible tail value of an increasing subsequence of length k+1
  const tails: T[] = [];
  // tailsIdx[k] = original index of that tail value
  const tailsIdx: number[] = [];

  // prevIdx[i] = index of predecessor of arr[i] in the LIS that ends at i
  const prevIdx = new Array<number>(n).fill(-1);

  for (let i = 0; i < n; ++i) {
    const x = arr[i];

    // binary search for the first tails[pos] >= x
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (compare(tails[mid], x) < 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    const pos = lo; // position where x will go

    // Update predecessor link
    if (pos > 0) {
      prevIdx[i] = tailsIdx[pos - 1];
    }

    // Insert / replace
    if (pos === tails.length) {
      tails.push(x);
      tailsIdx.push(i);
    } else {
      tails[pos] = x;
      tailsIdx[pos] = i;
    }
  }

  // Reconstruct the subsequence
  const lisLength = tails.length;
  const subsequence: T[] = new Array<T>(lisLength);
  let curIdx = tailsIdx[lisLength - 1];
  for (let k = lisLength - 1; k >= 0; --k) {
    subsequence[k] = arr[curIdx];
    curIdx = prevIdx[curIdx];
  }

  return { length: lisLength, subsequence };
}
import { lisPatience } from "./lis";

const data = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
const { length, subsequence } = lisPatience(data);
console.log(length);      // 6
console.log(subsequence); // [0, 2, 6, 9, 11, 15] (one possible LIS)
// lis.ts --------------------------------------------------------------
export function lisDP<T>(arr: T[], compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
  const n = arr.length;
  if (n === 0) return { length: 0, subsequence: [] };

  const dp = new Array<number>(n).fill(1);
  const prev = new Array<number>(n).fill(-1);

  let bestLen = 1;
  let bestIdx = 0;

  for (let i = 1; i < n; ++i) {
    for (let j = 0; j < i; ++j) {
      if (compare(arr[j], arr[i]) < 0 && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > bestLen) {
      bestLen = dp[i];
      bestIdx = i;
    }
  }

  const subsequence: T[] = [];
  for (let cur = bestIdx; cur !== -1; cur = prev[cur]) subsequence.push(arr[cur]);
  subsequence.reverse();

  return { length: bestLen, subsequence };
}

// --------------------------------------------------------------
export function lisPatience<T>(arr: T[], compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
  const n = arr.length;
  if (n === 0) return { length: 0, subsequence: [] };

  const tails: T[] = [];
  const tailsIdx: number[] = [];
  const prevIdx = new Array<number>(n).fill(-1);

  for (let i = 0; i < n; ++i) {
    const x = arr[i];
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (compare(tails[mid], x) < 0) lo = mid + 1;
      else hi = mid;
    }
    const pos = lo;

    if (pos > 0) prevIdx[i] = tailsIdx[pos - 1];

    if (pos === tails.length) {
      tails.push(x);
      tailsIdx.push(i);
    } else {
      tails[pos] = x;
      tailsIdx[pos] = i;
    }
  }

  const lisLength = tails.length;
  const subsequence: T[] = new Array<T>(lisLength);
  let curIdx = tailsIdx[lisLength - 1];
  for (let k = lisLength - 1; k >= 0; --k) {
    subsequence[k] = arr[curIdx];
    curIdx = prevIdx[curIdx];
  }

  return { length: lisLength, subsequence };
}

// --------------------------------------------------------------
/* Example usage (uncomment to test):
const a = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lisDP(a));
console.log(lisPatience(a));
*/
