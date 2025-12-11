/**
 * Returns the k‑th smallest element (1‑based) using sorting.
 * Throws if k is out of bounds.
 */
function kthSmallestSort(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new RangeError('k is out of range');
  }

  // Slice creates a shallow copy so we don’t mutate the original array.
  const sorted = arr.slice().sort((a, b) => a - b);
  return sorted[k - 1];
}

/* Example */
const data = [7, 2, 5, 3, 9, 1];
console.log(kthSmallestSort(data, 3)); // → 3 (the 3rd smallest)
/**
 * In‑place QuickSelect that returns the k‑th smallest element (1‑based).
 * The original array is mutated; pass a copy if you need to keep it.
 */
function kthSmallestQuickSelect(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new RangeError('k is out of range');
  }

  // Convert to zero‑based index for internal work.
  const target = k - 1;

  // Helper: Lomuto partition (last element as pivot)
  function partition(left: number, right: number): number {
    const pivot = arr[right];
    let i = left; // place for the next smaller element

    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    // Move pivot to its final place
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
  }

  // Iterative version to avoid deep recursion on pathological inputs
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const pivotIdx = partition(left, right);

    if (pivotIdx === target) {
      return arr[pivotIdx];
    } else if (pivotIdx < target) {
      left = pivotIdx + 1; // look right side
    } else {
      right = pivotIdx - 1; // look left side
    }
  }

  // Should never reach here because k is validated.
  throw new Error('Unexpected state');
}

/* Example */
const data2 = [7, 2, 5, 3, 9, 1];
console.log(kthSmallestQuickSelect(data2.slice(), 3)); // → 3
function randomPartition(left: number, right: number): number {
  const randIdx = left + Math.floor(Math.random() * (right - left + 1));
  [arr[randIdx], arr[right]] = [arr[right], arr[randIdx]];
  return partition(left, right);
}
class MinHeap {
  private data: number[] = [];

  private parent(i: number) { return Math.floor((i - 1) / 2); }
  private left(i: number) { return 2 * i + 1; }
  private right(i: number) { return 2 * i + 2; }

  private swap(i: number, j: number) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  push(val: number) {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const p = this.parent(idx);
      if (this.data[p] <= this.data[idx]) break;
      this.swap(p, idx);
      idx = p;
    }
  }

  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const min = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return min;
  }

  private bubbleDown(idx: number) {
    const n = this.data.length;
    while (true) {
      const l = this.left(idx);
      const r = this.right(idx);
      let smallest = idx;

      if (l < n && this.data[l] < this.data[smallest]) smallest = l;
      if (r < n && this.data[r] < this.data[smallest]) smallest = r;

      if (smallest === idx) break;
      this.swap(idx, smallest);
      idx = smallest;
    }
  }
}

/**
 * Returns the k‑th smallest element using a min‑heap.
 * Time: O(n + k log n), Space: O(n)
 */
function kthSmallestHeap(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new RangeError('k is out of range');
  }

  const heap = new MinHeap();
  for (const v of arr) heap.push(v);

  let result = -Infinity;
  for (let i = 0; i < k; i++) {
    const popped = heap.pop();
    if (popped === undefined) break; // safety
    result = popped;
  }
  return result;
}

/* Example */
const data3 = [7, 2, 5, 3, 9, 1];
console.log(kthSmallestHeap(data3, 3)); // → 3
// kthSmallest.ts
export enum KthMethod {
  Sort = 'sort',
  QuickSelect = 'quickselect',
  Heap = 'heap',
}

/**
 * Returns the k‑th smallest element (1‑based) using the chosen algorithm.
 * @param arr   Input array (will **not** be mutated)
 * @param k     1‑based rank
 * @param method Which algorithm to use (default = QuickSelect)
 */
export function kthSmallest(
  arr: number[],
  k: number,
  method: KthMethod = KthMethod.QuickSelect
): number {
  // Defensive copy – all three implementations mutate the array.
  const copy = arr.slice();

  switch (method) {
    case KthMethod.Sort:
      return kthSmallestSort(copy, k);
    case KthMethod.QuickSelect:
      return kthSmallestQuickSelect(copy, k);
    case KthMethod.Heap:
      return kthSmallestHeap(copy, k);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

/* ---- internal helpers (same as above) ---- */
function kthSmallestSort(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new RangeError('k out of range');
  return arr.sort((a, b) => a - b)[k - 1];
}

/* QuickSelect implementation (same as earlier) */
function kthSmallestQuickSelect(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new RangeError('k out of range');
  const target = k - 1;

  function partition(l: number, r: number): number {
    const pivot = arr[r];
    let i = l;
    for (let j = l; j < r; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    [arr[i], arr[r]] = [arr[r], arr[i]];
    return i;
  }

  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    // Randomized pivot to improve average case
    const randIdx = left + Math.floor(Math.random() * (right - left + 1));
    [arr[randIdx], arr[right]] = [arr[right], arr[randIdx]];

    const p = partition(left, right);
    if (p === target) return arr[p];
    if (p < target) left = p + 1;
    else right = p - 1;
  }
  throw new Error('Logic error');
}

/* Heap implementation (same as earlier) */
class MinHeap {
  private data: number[] = [];
  private parent(i: number) { return (i - 1) >> 1; }
  private left(i: number) { return i * 2 + 1; }
  private right(i: number) { return i * 2 + 2; }
  private swap(i: number, j: number) { [this.data[i], this.data[j]] = [this.data[j], this.data[i]]; }

  push(v: number) {
    this.data.push(v);
    let i = this.data.length - 1;
    while (i > 0 && this.data[this.parent(i)] > this.data[i]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const min = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return min;
  }

  private bubbleDown(i: number) {
    const n = this.data.length;
    while (true) {
      const l = this.left(i);
      const r = this.right(i);
      let smallest = i;
      if (l < n && this.data[l] < this.data[smallest]) smallest = l;
      if (r < n && this.data[r] < this.data[smallest]) smallest = r;
      if (smallest === i) break;
      this.swap(i, smallest);
      i = smallest;
    }
  }
}

function kthSmallestHeap(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new RangeError('k out of range');
  const heap = new MinHeap();
  for (const v of arr) heap.push(v);
  let ans = -Infinity;
  for (let i = 0; i < k; i++) ans = heap.pop()!;
  return ans;
}
import { kthSmallest, KthMethod } from './kthSmallest';

const nums = [12, 3, 5, 7, 19, 1];
console.log(kthSmallest(nums, 4)); // QuickSelect (default) → 7
console.log(kthSmallest(nums, 4, KthMethod.Sort)); // → 7
console.log(kthSmallest(nums, 4, KthMethod.Heap)); // → 7
const kth = (arr: number[], k: number) => arr.slice().sort((a, b) => a - b)[k - 1];
