/**
 * Return the k‑th smallest element of an array (1‑based k).
 *
 * @param arr - the input array of comparable values
 * @param k   - which element to find (1 <= k <= arr.length)
 * @returns   the k‑th smallest element
 */
function kthSmallest<T>(arr: T[], k: number): T {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error('Array must not be empty');
  if (k < 1 || k > arr.length)
    throw new RangeError('k is out of bounds');

  // Work on a copy so the caller’s array stays untouched
  const a = arr.slice();

  // 0‑based index for quickselect
  const target = k - 1;

  // Classic partition (Hoare’s scheme)
  const partition = (lo: number, hi: number): number => {
    const pivot = a[(lo + hi) >> 1];
    let i = lo - 1;
    let j = hi + 1;
    while (true) {
      do i++; while (a[i] < pivot);
      do j--; while (a[j] > pivot);
      if (i >= j) return j;
      [a[i], a[j]] = [a[j], a[i]];
    }
  };

  // Recursive quickselect
  const quickselect = (lo: number, hi: number): T => {
    if (lo === hi) return a[lo];

    const pivotIndex = partition(lo, hi);
    if (target <= pivotIndex) {
      return quickselect(lo, pivotIndex);
    } else if (target > pivotIndex + 1) {
      return quickselect(pivotIndex + 1, hi);
    } else {
      // target lands between the two partitions
      return a[pivotIndex + 1];
    }
  };

  return quickselect(0, a.length - 1);
}
const data = [7, 2, 9, 4, 3, 1, 5, 8, 6];

console.log(kthSmallest(data, 1)); // 1
console.log(kthSmallest(data, 3)); // 3
console.log(kthSmallest(data, 9)); // 9

// Sorting the whole array for comparison
console.log([...data].sort((a, b) => a - b)[2]); // 3
class MinHeap<T> {
  private data: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    this.compare = compareFn;
  }

  push(item: T) {
    this.data.push(item);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length && last !== undefined) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  size() { return this.data.length; }

  private bubbleUp(idx: number) {
    const item = this.data[idx];
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.compare(item, this.data[parent]) >= 0) break;
      this.data[idx] = this.data[parent];
      idx = parent;
    }
    this.data[idx] = item;
  }

  private bubbleDown(idx: number) {
    const length = this.data.length;
    const item = this.data[idx];
    while (true) {
      let left = idx * 2 + 1;
      if (left >= length) break;
      let right = left + 1;
      let smallest = left;
      if (right < length && this.compare(this.data[right], this.data[left]) < 0)
        smallest = right;
      if (this.compare(this.data[smallest], item) >= 0) break;
      this.data[idx] = this.data[smallest];
      idx = smallest;
    }
    this.data[idx] = item;
  }
}

// Usage: keep only k smallest
function kthSmallestHeap<T>(arr: T[], k: number, cmp: (a: T, b: T) => number): T {
  const heap = new MinHeap<T>(cmp);
  for (const v of arr) heap.push(v);
  let kth = heap.pop()!;
  for (let i = 1; i < k; i++) kth = heap.pop()!;
  return kth;
}
