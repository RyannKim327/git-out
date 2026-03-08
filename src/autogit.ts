if a[j] < a[i] → candidate to extend the sequence ending at j
/**
 * Returns the LIS of the input array.
 * O(n²) time, O(n) extra space.
 */
function longestIncreasingSubsequenceDP(arr: number[]): number[] {
  const n = arr.length;
  if (n === 0) return [];

  // `len[i]` – length of LIS ending at i
  const len = new Array(n).fill(1);
  // `prev[i]` – the previous index in the LIS that ends at i
  const prev = new Array(n).fill(-1);

  let bestIdx = 0;          // index of the overall best LIS

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i] && len[j] + 1 > len[i]) {
        len[i] = len[j] + 1;
        prev[i] = j;
      }
    }
    if (len[i] > len[bestIdx]) bestIdx = i;
  }

  /* ---------- reconstruct the sequence ---------- */
  const result: number[] = [];
  for (let k = bestIdx; k !== -1; k = prev[k]) {
    result.push(arr[k]);
  }
  return result.reverse();
}
const source = [3, 4, -1, 0, 6, 2, 3];
console.log(longestIncreasingSubsequenceDP(source));
// → [ -1, 0, 2, 3 ]   (length 4)
/**
 * Returns the LIS of the input array.
 * O(n log n) time, O(n) space.
 */
function longestIncreasingSubsequenceFast(arr: number[]): number[] {
  const n = arr.length;
  if (n === 0) return [];

  // `tails[len]` – smallest tail value of an inc. subsequence of length len+1
  const tails: number[] = [];
  // `prevIdx[i]` – index of the predecessor element for arr[i] in the LIS
  const prevIdx: number[] = new Array(n).fill(-1);
  // `posInTails[i]` – position in tails where arr[i] ends up
  const posInTails: number[] = new Array(n);

  for (let i = 0; i < n; i++) {
    const x = arr[i];

    // binary search: find first tails[idx] ≥ x
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (tails[mid] < x) left = mid + 1;
      else right = mid;
    }

    if (left === 0) {
      // new smallest element
      prevIdx[i] = -1;
    } else {
      // predecessor is the element that ended the subsequence of length left
      prevIdx[i] = posInTails[left - 1];
    }

    // update tails & helper arrays
    if (left === tails.length) {
      tails.push(x);
      posInTails[left] = i;
    } else if (x < tails[left]) {
      tails[left] = x;
      posInTails[left] = i;
    }
  }

  /* ---------- reconstruct the sequence ---------- */
  const result: number[] = [];
  let k = posInTails[tails.length - 1];
  while (k !== -1) {
    result.push(arr[k]);
    k = prevIdx[k];
  }
  return result.reverse();
}
const arr = [10, 22, 9, 33, 21, 50, 41, 60, 80];
console.log(longestIncreasingSubsequenceFast(arr));
// → [10, 22, 33, 50, 60, 80]  (length 6)
