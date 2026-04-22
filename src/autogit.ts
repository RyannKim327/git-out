// --------------------------------------------
// Binary‑heap priority queue (generic)
// --------------------------------------------

type Comparator<T> = (a: T, b: T) => number;

/**
 * A priority queue that stores values in a binary heap.
 * The heap property is maintained by `comparator`.
 *
 * Examples:
 *  - new PriorityQueue<number>()          // min‑heap (default)
 *  - new PriorityQueue<number>((a,b)=>b-a) // max‑heap
 *  - new PriorityQueue<string>((a,b)=>a.localeCompare(b))
 */
export class PriorityQueue<T> {
  /** underlying array is 0‑based; the parent of index i is (i - 1) >> 1 */
  private heap: T[] = [];

  /** comparison function that must return negative if a < b */
  private readonly comparator: Comparator<T>;

  constructor(comparator?: Comparator<T>) {
    // default is a min‑heap for natural order
    this.comparator = comparator ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  /* ------------------------------------------------------------------ */
  /* Public API                                                          */
  /* ------------------------------------------------------------------ */

  /** Returns true if there are no elements. */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /** Returns the element with the highest priority without removing it. */
  peek(): T | undefined {
    return this.heap[0];
  }

  /** Insert a new element. */
  push(value: T): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Remove & return the element with the highest priority.
   * Throws an error if the queue is empty.
   */
  pop(): T {
    if (this.heap.length === 0) throw new Error('Pop from an empty priority queue');

    const top = this.heap[0];
    const last = this.heap.pop()!; // array non‑empty, so pop is safe

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  /** Remove all items. */
  clear(): void {
    this.heap = [];
  }

  /** Current size of the queue. */
  size(): number {
    return this.heap.length;
  }

  /* ------------------------------------------------------------------ */
  /* Internal helpers                                                   */
  /* ------------------------------------------------------------------ */

  /** Move the element at idx up until the heap property holds. */
  private bubbleUp(idx: number): void {
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1;
      const parent = this.heap[parentIdx];

      // For min‑heap: bubble up when element < parent
      if (this.comparator(element, parent) >= 0) break;

      // swap
      this.heap[idx] = parent;
      idx = parentIdx;
    }
    this.heap[idx] = element;
  }

  /** Move the element at idx down until the heap property holds. */
  private bubbleDown(idx: number): void {
    const length = this.heap.length;
    const element = this.heap[idx];

    while (true) {
      const leftIdx = (idx << 1) + 1;
      const rightIdx = leftIdx + 1;
      let swapIdx = -1;

      if (leftIdx < length) {
        const left = this.heap[leftIdx];
        if (this.comparator(left, element) < 0) swapIdx = leftIdx;
      }

      if (rightIdx < length) {
        const right = this.heap[rightIdx];
        const betterChild = swapIdx === -1 ? element : this.heap[swapIdx];

        if (this.comparator(right, betterChild) < 0) swapIdx = rightIdx;
      }

      if (swapIdx === -1) break;

      this.heap[idx] = this.heap[swapIdx];
      idx = swapIdx;
    }

    this.heap[idx] = element;
  }
}

/* ------------------------------------------------------------------ */
/* Example usage */
/* ------------------------------------------------------------------ */

const pq = new PriorityQueue<number>(); // min‑heap

pq.push(5);
pq.push(3);
pq.push(8);
pq.push(1);

console.log(pq.pop()); // 1
console.log(pq.pop()); // 3
console.log([...Array(pq.size()).keys()].map(() => pq.pop())); // [5, 8]
