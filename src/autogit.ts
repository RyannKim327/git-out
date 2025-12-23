/**
 * Returns the kth smallest element (1-based index) in `nums`.
 *平均 O(n) 时间，最坏 O(n²)（极少见）。
 */
function kthSmallest(nums: number[], k: number): number {
  if (k < 1 || k > nums.length) throw new Error('k out of range');

  const a = nums.slice();          // work on a copy so caller’s array is untouched
  let left = 0;
  let right = a.length - 1;
  k = k - 1;                       // convert to 0-based

  while (true) {
    const pivotIndex = partition(a, left, right);
    if (pivotIndex === k) return a[pivotIndex];
    if (pivotIndex > k)  right = pivotIndex - 1;
    else                 left  = pivotIndex + 1;
  }
}

/* Lomuto partition: returns final index of pivot */
function partition(a: number[], left: number, right: number): number {
  const pivot = a[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (a[j] < pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }
  [a[i], a[right]] = [a[right], a[i]];
  return i;
}

/* ---------- demo ---------- */
console.log(kthSmallest([7, 10, 4, 3, 20, 15], 3)); // → 7
import { MaxHeap } from 'heap-js';   // npm i heap-js

function kthSmallestHeap(nums: number[], k: number): number {
  if (k < 1 || k > nums.length) throw new Error('k out of range');
  const heap = new MaxHeap<number>();
  for (const n of nums) {
    if (heap.size() < k) {
      heap.push(n);
    } else if (n < heap.peek()!) {
      heap.pop();
      heap.push(n);
    }
  }
  return heap.peek()!;
}

/* ---------- demo ---------- */
console.log(kthSmallestHeap([7, 10, 4, 3, 20, 15], 3)); // → 7
