/**
 * Returns the k-th smallest element (1-based) in `nums`.
 * Average time  O(n)
 * Worst time    O(n²)  (rare if pivot is randomised)
 * Space         O(1)   (in-place)
 */
function kthSmallest(nums: number[], k: number): number {
  if (k < 1 || k > nums.length) throw new RangeError('k out of range');

  const lo = 0;
  const hi = nums.length - 1;
  const target = k - 1;          // convert to 0-based index

  while (true) {
    const p = partition(nums, lo, hi);
    if (p === target) return nums[p];
    if (p > target)  hi = p - 1; // look in left part
    else             lo = p + 1; // look in right part
  }
}

/* Lomuto partition with random pivot */
function partition(a: number[], lo: number, hi: number): number {
  const pivotIdx = lo + Math.floor(Math.random() * (hi - lo + 1));
  [a[pivotIdx], a[hi]] = [a[hi], a[pivotIdx]]; // move pivot to end
  const pivot = a[hi];

  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) [a[i++], a[j]] = [a[j], a[i]];
  }
  [a[i], a[hi]] = [a[hi], a[i]]; // place pivot in final spot
  return i;
}

/* ---------- demo ---------- */
console.log(kthSmallest([7, 10, 4, 3, 20, 15], 3)); // → 7
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';

function kthSmallestHeap(nums: number[], k: number): number {
  if (k < 1 || k > nums.length) throw new RangeError('k out of range');

  const pq = new MaxPriorityQueue<number>();
  for (const n of nums) {
    pq.enqueue(n);
    if (pq.size() > k) pq.dequeue(); // drop the largest
  }
  return pq.front().element;
}
const kth = (arr: number[], k: number) => [...arr].sort((a, b) => a - b)[k - 1];
