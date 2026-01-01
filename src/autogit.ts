function kthSmallest(nums: number[], k: number): number {
  if (k < 1 || k > nums.length) throw new RangeError('k out of range');
  return [...nums].sort((a, b) => a - b)[k - 1];
}
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

function kthSmallest(nums: number[], k: number): number {
  if (k < 1 || k > nums.length) throw new RangeError('k out of range');

  const pq = new MinPriorityQueue<number>();
  nums.forEach(v => pq.enqueue(v));
  let ans = 0;
  for (let i = 0; i < k; ++i) ans = pq.dequeue().element;
  return ans;
}
function kthSmallest(nums: number[], k: number): number {
  if (k < 1 || k > nums.length) throw new RangeError('k out of range');

  const a = [...nums];          // work on a copy if you must keep original
  const target = k - 1;       // convert to 0-based index

  let left = 0, right = a.length - 1;
  while (true) {
    const pivotIdx = partition(a, left, right);
    if (pivotIdx === target) return a[pivotIdx];
    if (pivotIdx < target) left = pivotIdx + 1;
    else right = pivotIdx - 1;
  }

  function partition(arr: number[], l: number, r: number): number {
    // random pivot avoids worst-case on sorted input
    const idx = l + Math.floor(Math.random() * (r - l + 1));
    [arr[idx], arr[r]] = [arr[r], arr[idx]];
    const pivot = arr[r];

    let i = l;
    for (let j = l; j < r; ++j) {
      if (arr[j] < pivot) [arr[i++], arr[j]] = [arr[j], arr[i]];
    }
    [arr[i], arr[r]] = [arr[r], arr[i]];
    return i;
  }
}
const data = [7, 2, 1, 8, 5, 3];
console.log(kthSmallest(data, 3)); // → 5
