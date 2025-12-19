/**
 * Returns the k‑th smallest element (1‑based) using Array.sort().
 * Throws if k is out of bounds.
 */
function kthSmallestSort(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new RangeError('k is out of bounds');
  }

  // Clone if you don’t want to mutate the original array
  const copy = [...arr];
  copy.sort((a, b) => a - b);   // numeric ascending

  return copy[k - 1];           // 1‑based index → 0‑based array
}

// Example
const data = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestSort(data, 3)); // → 7
/**
 * In‑place Quick‑Select.
 * Returns the k‑th smallest element (1‑based).
 */
function kthSmallestQuickSelect(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new RangeError('k is out of bounds');
  }

  // Helper: Lomuto partition (simpler to read)
  function partition(left: number, right: number, pivotIdx: number): number {
    const pivot = arr[pivotIdx];
    // Move pivot to end
    [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];
    let storeIdx = left;

    for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
        [arr[i], arr[storeIdx]] = [arr[storeIdx], arr[i]];
        storeIdx++;
      }
    }
    // Move pivot to its final place
    [arr[storeIdx], arr[right]] = [arr[right], arr[storeIdx]];
    return storeIdx;
  }

  // Recursive (or iterative) selection
  function select(left: number, right: number, targetIdx: number): number {
    while (true) {
      // If the segment contains only one element, that's the answer
      if (left === right) return arr[left];

      // Choose a random pivot to avoid worst‑case O(n²)
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

// Example
const data2 = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestQuickSelect(data2, 3)); // → 7
// npm install heap-js   // or any other heap library
import { MaxHeap } from 'heap-js';

/**
 * Returns the k‑th smallest element using a max‑heap of size k.
 * O(n log k) time, O(k) extra space.
 */
function kthSmallestHeap(arr: number[], k: number): number {
  if (k < 1 || k > arr.length) {
    throw new RangeError('k is out of bounds');
  }

  const heap = new MaxHeap<number>((a, b) => a - b); // max‑heap

  for (const val of arr) {
    if (heap.size() < k) {
      heap.push(val);
    } else if (val < heap.peek()!) {
      heap.pop();          // discard the current largest among the k
      heap.push(val);      // insert the new, smaller candidate
    }
  }

  // After processing all elements, the heap root is the k‑th smallest
  return heap.peek()!;
}

// Example
const data3 = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestHeap(data3, 3)); // → 7
type SelectionAlgorithm = 'sort' | 'quickselect' | 'heap';

function kthSmallest<T>(
  arr: T[],
  k: number,
  options?: {
    /** 'sort' | 'quickselect' | 'heap' (default: 'quickselect') */
    algorithm?: SelectionAlgorithm;
    /** If true, the original array will NOT be mutated (default: true) */
    copy?: boolean;
    /** Comparator for generic types (defaults to numeric) */
    compare?: (a: T, b: T) => number;
  }
): T {
  const { algorithm = 'quickselect', copy = true, compare } = options ?? {};

  // Basic validation
  if (!Number.isInteger(k) || k < 1 || k > arr.length) {
    throw new RangeError('k is out of bounds');
  }

  // Default numeric comparator
  const cmp = compare ?? ((a: any, b: any) => a - b);

  // Helper to clone only when needed
  const data = copy ? [...arr] : arr;

  // ---------- 1️⃣ Sort ----------
  if (algorithm === 'sort') {
    data.sort(cmp);
    return data[k - 1];
  }

  // ---------- 2️⃣ Quick‑Select ----------
  if (algorithm === 'quickselect') {
    // Partition using the supplied comparator
    function partition(left: number, right: number, pivotIdx: number): number {
      const pivot = data[pivotIdx];
      [data[pivotIdx], data[right]] = [data[right], data[pivotIdx]];
      let storeIdx = left;
      for (let i = left; i < right; i++) {
        if (cmp(data[i], pivot) < 0) {
          [data[i], data[storeIdx]] = [data[storeIdx], data[i]];
          storeIdx++;
        }
      }
      [data[storeIdx], data[right]] = [data[right], data[storeIdx]];
      return storeIdx;
    }

    function select(left: number, right: number, targetIdx: number): T {
      while (true) {
        if (left === right) return data[left];
        const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
        const pivotNewIdx = partition(left, right, pivotIdx);
        if (targetIdx === pivotNewIdx) return data[pivotNewIdx];
        if (targetIdx < pivotNewIdx) right = pivotNewIdx - 1;
        else left = pivotNewIdx + 1;
      }
    }

    return select(0, data.length - 1, k - 1);
  }

  // ---------- 3️⃣ Heap ----------
  if (algorithm === 'heap') {
    // Simple binary max‑heap implementation (no external lib)
    class MaxHeap {
      private heap: T[] = [];
      constructor(private readonly cmp: (a: T, b: T) => number) {}
      size() { return this.heap.length; }
      peek() { return this.heap[0]; }
      push(val: T) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
      }
      pop(): T | undefined {
        if (!this.heap.length) return undefined;
        const top = this.heap[0];
        const end = this.heap.pop()!;
        if (this.heap.length) {
          this.heap[0] = end;
          this.sinkDown(0);
        }
        return top;
      }
      private bubbleUp(idx: number) {
        const element = this.heap[idx];
        while (idx > 0) {
          const parentIdx = Math.floor((idx - 1) / 2);
          if (this.cmp(this.heap[parentIdx], element) >= 0) break;
          this.heap[idx] = this.heap[parentIdx];
          idx = parentIdx;
        }
        this.heap[idx] = element;
      }
      private sinkDown(idx: number) {
        const length = this.heap.length;
        const element = this.heap[idx];
        while (true) {
          let leftIdx = 2 * idx + 1;
          let rightIdx = 2 * idx + 2;
          let swapIdx: number | null = null;

          if (leftIdx < length) {
            if (this.cmp(this.heap[leftIdx], element) > 0) swapIdx = leftIdx;
          }
          if (rightIdx < length) {
            if (
              (swapIdx === null && this.cmp(this.heap[rightIdx], element) > 0) ||
              (swapIdx !== null && this.cmp(this.heap[rightIdx], this.heap[leftIdx]!) > 0)
            ) {
              swapIdx = rightIdx;
            }
          }
          if (swapIdx === null) break;
          this.heap[idx] = this.heap[swapIdx];
          idx = swapIdx;
        }
        this.heap[idx] = element;
      }
    }

    const heap = new MaxHeap(cmp);
    for (const v of data) {
      if (heap.size() < k) heap.push(v);
      else if (cmp(v, heap.peek()!) < 0) {
        heap.pop();
        heap.push(v);
      }
    }
    return heap.peek()!;
  }

  // Should never reach here
  throw new Error(`Unsupported algorithm: ${algorithm}`);
}

// ---- Demo ----
const nums = [7, 10, 4, 3, 20, 15];
console.log(kthSmallest(nums, 3)); // quickselect (default) → 7
console.log(kthSmallest(nums, 3, { algorithm: 'sort' })); // → 7
console.log(kthSmallest(nums, 3, { algorithm: 'heap' })); // → 7
