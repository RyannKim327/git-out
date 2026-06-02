/**
 * A heap‑like swap utility that keeps the array indices aligned.
 */
function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Returns the index of the left child of the node at `idx`.
 */
function leftChild(idx: number): number {
  return 2 * idx + 1;
}

/**
 * Returns the index of the right child of the node at `idx`.
 */
function rightChild(idx: number): number {
  return 2 * idx + 2;
}
/**
 * Restores the max‑heap property by percolating the node at `idx` downward.
 * 
 * @param heap The array representing the heap.
 * @param idx The starting index.
 * @param heapSize The number of elements that are still part of the heap.
 * @param compare (a, b) => true if a > b
 */
function siftDown<T>(
  heap: T[],
  idx: number,
  heapSize: number,
  compare: (a: T, b: T) => boolean
): void {
  let largest = idx;

  while (true) {
    const leftIdx = leftChild(idx);
    const rightIdx = rightChild(idx);

    if (leftIdx < heapSize && compare(heap[leftIdx], heap[largest])) {
      largest = leftIdx;
    }
    if (rightIdx < heapSize && compare(heap[rightIdx], heap[largest])) {
      largest = rightIdx;
    }

    // If idx is the largest, we're done.
    if (largest === idx) break;

    swap(heap, idx, largest);
    idx = largest; // Continue sinking the element
  }
}

/**
 * Turns an unsorted array into a max‑heap in place.
 */
function buildMaxHeap<T>(
  arr: T[],
  compare: (a: T, b: T) => boolean
): void {
  // Start from the last internal node and sift down each.
  const startIdx = Math.floor(arr.length / 2) - 1;
  for (let i = startIdx; i >= 0; i--) {
    siftDown(arr, i, arr.length, compare);
  }
}
/**
 * Heap sort – sorts an array *in place*.
 * 
 * @param arr  The array to sort.
 * @param compare (a, b) => true if a > b. For numbers you can pass
 *                (a, b) => a > b; for strings (a, b) => a.localeCompare(b) > 0; …
 */
export function heapSort<T>(
  arr: T[],
  compare: (a: T, b: T) => boolean = (a, b) => (a as any) > (b as any)
): void {
  if (arr.length <= 1) return;

  // 1️⃣ Build the max‑heap
  buildMaxHeap(arr, compare);

  // 2️⃣ Repeatedly extract the max
  for (let heapSize = arr.length; heapSize > 1; heapSize--) {
    // Swap the current root (max) to its final spot.
    swap(arr, 0, heapSize - 1);
    // Restore heap property on the reduced heap.
    siftDown(arr, 0, heapSize - 1, compare);
  }
}
const data = [12, 4, 7, 1, 9, 3, 22, 10];

heapSort(data);
// data is now [1, 3, 4, 7, 9, 10, 12, 22]
console.log(data);
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'Ada', age: 35 },
  { name: 'Bob', age: 20 },
  { name: 'Clara', age: 27 },
];

heapSort(
  people,
  (a, b) => a.age > b.age          // sort by age asc
);

console.log(people); // sorted by age
