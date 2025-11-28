/**
 * Returns the k-th smallest element (1-based index) in `arr`.
 * Mutates the array in place (like quick-sort does).
 * Average time  O(n), worst-case O(n²) (rare if pivot is random).
 */
function kthSmallest(arr: number[], k: number): number {
  if (k < 1 || k > arr.length)
    throw new RangeError('k is out of bounds');

  let left = 0;
  let right = arr.length - 1;

  while (true) {
    const pivotIndex = partition(arr, left, right);

    const rank = pivotIndex + 1;          // 1-based position
    if (rank === k) return arr[pivotIndex];

    if (k < rank) {
      right = pivotIndex - 1;               // kth is in left part
    } else {
      left = pivotIndex + 1;                // kth is in right part
    }
  }
}

/* Lomuto partition with random pivot */
function partition(a: number[], left: number, right: number): number {
  const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
  const pivotVal = a[pivotIdx];
  [a[pivotIdx], a[right]] = [a[right], a[pivotIdx]]; // move pivot to end

  let store = left;
  for (let i = left; i < right; ++i) {
    if (a[i] < pivotVal) {
      [a[store], a[i]] = [a[i], a[store]];
      ++store;
    }
  }
  [a[right], a[store]] = [a[store], a[right]]; // pivot to final place
  return store;
}

/* ---------- usage ---------- */
const data = [7, 2, 1, 8, 5, 3];
console.log(kthSmallest(data, 3)); // → 5
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';

function kthSmallestHeap(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) throw new RangeError('k is out of bounds');

  const q = new MaxPriorityQueue<number>();
  for (const v of arr) {
    q.enqueue(v);
    if (q.size() > k) q.dequeue(); // keep only the k smallest seen so far
  }
  return q.front().element;
}
