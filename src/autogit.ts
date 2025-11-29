/**
 * Heap Sort – TypeScript
 * Time:  O(n log n)
 * Space: O(1)  (in-place)
 */

type Comparable = number | string | { valueOf(): number };

/** Swap two indices in an array (in-place). */
function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/** Turn sub-tree rooted at `i` into a max-heap. */
function maxHeapify<T extends Comparable>(
  arr: T[],
  i: number,
  heapSize: number
): void {
  const cmp = (a: T, b: T) => (a > b ? 1 : a < b ? -1 : 0);

  while (true) {
    const left  = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left  < heapSize && cmp(arr[left],  arr[largest]) > 0) largest = left;
    if (right < heapSize && cmp(arr[right], arr[largest]) > 0) largest = right;

    if (largest === i) break;
    swap(arr, i, largest);
    i = largest;
  }
}

/** Build a max-heap from an arbitrary array. */
function buildMaxHeap<T extends Comparable>(arr: T[]): void {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; --i) {
    maxHeapify(arr, i, n);
  }
}

/** In-place heap sort. */
export function heapSort<T extends Comparable>(arr: T[]): T[] {
  buildMaxHeap(arr);
  let heapSize = arr.length;

  // Extract elements one by one
  for (let i = arr.length - 1; i > 0; --i) {
    swap(arr, 0, i);        // move current max to the end
    heapSize -= 1;            // shrink heap
    maxHeapify(arr, 0, heapSize);
  }
  return arr;
}

/* ------------------ Demo ------------------ */
if (require.main === module) {
  const data = [5, 1, 9, 3, 7, 2, 8, 4, 6];
  console.log('before:', data.join(' '));
  heapSort(data);
  console.log('after: ', data.join(' '));
}
import { heapSort } from './heapSort';

const nums = [12, -3, 4, 15, 0, 1];
heapSort(nums);
console.log(nums); // [-3, 0, 1, 4, 12, 15]
