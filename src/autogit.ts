/**
 * Returns the k‑th smallest element (1‑based) using Array.sort().
 * Throws if k is out of bounds.
 */
function kthSmallestSort(arr: number[], k: number): number {
  if (!Number.isInteger(k) || k < 1 || k > arr.length) {
    throw new RangeError('k must be an integer between 1 and arr.length');
  }

  // Clone if you don’t want to mutate the original array
  const copy = [...arr];
  copy.sort((a, b) => a - b);          // numeric ascending
  return copy[k - 1];
}
/**
 * In‑place Quick‑Select.
 * Returns the k‑th smallest element (1‑based) from `arr`.
 * The input array is mutated; pass a copy if you need the original.
 */
function kthSmallestQuickSelect(arr: number[], k: number): number {
  if (!Number.isInteger(k) || k < 1 || k > arr.length) {
    throw new RangeError('k must be an integer between 1 and arr.length');
  }

  // Helper: Lomuto partition (simpler) – you can swap for Hoare if you like.
  function partition(left: number, right: number, pivotIdx: number): number {
    const pivotValue = arr[pivotIdx];
    // Move pivot to end
    [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];
    let storeIdx = left;

    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        [arr[storeIdx], arr[i]] = [arr[i], arr[storeIdx]];
        storeIdx++;
      }
    }
    // Move pivot to its final place
    [arr[right], arr[storeIdx]] = [arr[storeIdx], arr[right]];
    return storeIdx;
  }

  // Recursive (or iterative) selection
  function select(left: number, right: number, targetIdx: number): number {
    while (true) {
      if (left === right) return arr[left]; // only one element left

      // Random pivot to avoid pathological O(n²) cases
      const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
      const pivotNewIdx = partition(left, right, pivotIdx);

      if (targetIdx === pivotNewIdx) {
        return arr[pivotNewIdx];
      } else if (targetIdx < pivotNewIdx) {
        right = pivotNewIdx - 1;
      } else {
        left = pivotNewIdx + 1;
      }
    }
  }

  // Convert 1‑based k to 0‑based index
  return select(0, arr.length - 1, k - 1);
}
const data = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestQuickSelect([...data], 3)); // → 7 (the 3rd smallest)
class MinHeap {
  private heap: number[] = [];

  size(): number { return this.heap.length; }

  peek(): number | undefined { return this.heap[0]; }

  push(val: number): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(idx: number): void {
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (element >= parent) break;
      this.heap[parentIdx] = element;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
  }

  private bubbleDown(idx: number): void {
    const length = this.heap.length;
    const element = this.heap[idx];

    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swapIdx: number | null = null;

      if (leftIdx < length) {
        const left = this.heap[leftIdx];
        if (left < element) swapIdx = leftIdx;
      }
      if (rightIdx < length) {
        const right = this.heap[rightIdx];
        if ((swapIdx === null && right < element) ||
            (swapIdx !== null && right < this.heap[swapIdx])) {
          swapIdx = rightIdx;
        }
      }
      if (swapIdx === null) break;
      this.heap[idx] = this.heap[swapIdx];
      this.heap[swapIdx] = element;
      idx = swapIdx;
    }
  }
}

/**
 * Returns the k‑th smallest element using a min‑heap of size k.
 * Time: O(n log k), Space: O(k)
 */
function kthSmallestHeap(arr: number[], k: number): number {
  if (!Number.isInteger(k) || k < 1 || k > arr.length) {
    throw new RangeError('k must be an integer between 1 and arr.length');
  }

  const heap = new MinHeap();

  // Insert first k elements
  for (let i = 0; i < k; i++) heap.push(arr[i]);

  // For the rest, keep only the k smallest values
  for (let i = k; i < arr.length; i++) {
    if (arr[i] < heap.peek()!) {
      heap.pop();          // discard the current largest among the k smallest
      heap.push(arr[i]);   // insert the new smaller value
    }
  }

  // At this point the heap contains the k smallest elements,
  // and the largest among them (the root) is the k‑th smallest overall.
  return heap.peek()!;
}
const kth = (arr: number[], k: number) => [...arr].sort((a,b)=>a-b)[k-1];
type Comparator<T> = (a: T, b: T) => number;

/**
 * Generic Quick‑Select that works with any type T.
 * The array is mutated; pass a copy if you need the original.
 */
function kthSmallest<T>(arr: T[], k: number, compare: Comparator<T> = (a, b) => (a as any) - (b as any)): T {
  if (!Number.isInteger(k) || k < 1 || k > arr.length) {
    throw new RangeError('k must be an integer between 1 and arr.length');
  }

  function partition(left: number, right: number, pivotIdx: number): number {
    const pivotVal = arr[pivotIdx];
    [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];
    let storeIdx = left;
    for (let i = left; i < right; i++) {
      if (compare(arr[i], pivotVal) < 0) {
        [arr[storeIdx], arr[i]] = [arr[i], arr[storeIdx]];
        storeIdx++;
      }
    }
    [arr[storeIdx], arr[right]] = [arr[right], arr[storeIdx]];
    return storeIdx;
  }

  let left = 0, right = arr.length - 1, target = k - 1;
  while (true) {
    if (left === right) return arr[left];
    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    const pivotNewIdx = partition(left, right, pivotIdx);
    if (target === pivotNewIdx) return arr[pivotNewIdx];
    if (target < pivotNewIdx) right = pivotNewIdx - 1;
    else left = pivotNewIdx + 1;
  }
}

// Example with objects:
interface Person { name: string; age: number; }
const people: Person[] = [
  {name: 'Alice', age: 34},
  {name: 'Bob',   age: 22},
  {name: 'Cara',  age: 29},
  {name: 'Dan',   age: 22},
];

const secondYoungest = kthSmallest(people, 2, (a, b) => a.age - b.age);
console.log(secondYoungest); // { name: 'Cara', age: 29 } (since ages 22,22,29,34)
function test() {
  const cases: Array<{arr: number[]; k: number; expected: number}> = [
    {arr: [3, 1, 2, 5, 4], k: 1, expected: 1},
    {arr: [3, 1, 2, 5, 4], k: 3, expected: 3},
    {arr: [3, 1, 2, 5, 4], k: 5, expected: 5},
    {arr: [7, 10, 4, 3, 20, 15], k: 4, expected: 10},
    {arr: [5, 5, 5, 5], k: 2, expected: 5},
  ];

  for (const {arr, k, expected} of cases) {
    const s = kthSmallestSort(arr, k);
    const q = kthSmallestQuickSelect([...arr], k);
    const h = kthSmallestHeap(arr, k);
    if (s !== expected || q !== expected || h !== expected) {
      console.error('FAIL', {arr, k, expected, s, q, h});
      return;
    }
  }
  console.log('All tests passed ✅');
}
test();
// 1️⃣ If you just need a one‑liner and performance isn’t a concern:
const kth = (arr: number[], k: number) => [...arr].sort((a,b)=>a-b)[k-1];

// 2️⃣ For large arrays and guaranteed linear‑average time:
function kthSmallestQuickSelect(arr: number[], k: number): number { /* …code from section 2… */ }

// 3️⃣ If k is tiny compared to n and you want worst‑case O(n log k):
function kthSmallestHeap(arr: number[], k: number): number { /* …code from section 3… */ }
