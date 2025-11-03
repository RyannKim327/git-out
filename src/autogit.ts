/**
 * In-place Shell sort (ascending order).
 * Uses Shell’s original gap sequence: N/2, N/4, …, 1
 * Time  : O(N²) worst case with this sequence
 * Space : O(1)
 */
function shellSort<T>(arr: T[]): void {
  const n = arr.length;
  // build gap sequence
  const gaps: number[] = [];
  for (let g = Math.floor(n / 2); g > 0; g = Math.floor(g / 2)) {
    gaps.push(g);
  }

  // h-sort for each gap
  for (const h of gaps) {
    // insertion sort but with stride h
    for (let i = h; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= h && arr[j - h] > temp) {
        arr[j] = arr[j - h];
        j -= h;
      }
      arr[j] = temp;
    }
  }
}

/* ---------- demo ---------- */
const nums = [64, 34, 25, 12, 22, 11, 90];
shellSort(nums);
console.log(nums); // [11, 12, 22, 25, 34, 64, 90]
function sedgewickGaps(n: number): number[] {
  const gaps: number[] = [];
  let k = 0, a, b;
  // 4^k + 3*2^(k-1) + 1  and  9*(4^k) - 9*2^k + 1
  while (true) {
    a = Math.pow(4, k) + 3 * Math.pow(2, k - 1) + 1;
    b = 9 * Math.pow(4, k) - 9 * Math.pow(2, k) + 1;
    if (a < n) gaps.unshift(a);
    if (b < n) gaps.unshift(b);
    if (a >= n && b >= n) break;
    k++;
  }
  return gaps;
}

// then call
const gaps = sedgewickGaps(n);
