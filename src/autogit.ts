/**
 * A generic priority queue backed by a binary heap.
 *
 * The heap stores its elements in an array `data` where
 * the parent of node at index `i` is at `Math.floor((i - 1) / 2)`.
 * The comparator decides whether an element has higher priority.
 *
 * By default the queue is a **min‑heap** (smallest element has highest priority)
 * because the default comparator returns `a - b`. Pass a custom comparator to
 * get a max‑heap or any other ordering you need.
 */
export class PriorityQueue<T> {
  /** The underlying array that holds the heap. */
  private data: T[] = [];
  /** Comparator: negative → a < b, zero → equal, positive → a > b */
  private readonly cmp: (a: T, b: T) => number;

  constructor(cmp?: (a: T, b: T) => number) {
    // If no comparator supplied, we assume a min‑heap and expect T to be
    // compatible with subtraction (e.g. numbers). For generic types provide
    // a comparator.
    this.cmp = cmp || ((a: any, b: any) => a - b);
  }

  /** Return number of elements in the queue. */
  get size(): number {
    return this.data.length;
  }

  /** Peek at the element with highest priority without removing it. */
  peek(): T | undefined {
    return this.data[0];
  }

  /** Insert a new element into the queue. */
  push(value: T): void {
    this.data.push(value);
    this.heapifyUp(this.data.length - 1);
  }

  /**
   * Remove and return the element with highest priority.
   * Returns undefined if the queue is empty.
   */
  pop(): T | undefined {
    const length = this.data.length;
    if (length === 0) return undefined;

    const root = this.data[0];
    const last = this.data.pop()!; // pop() can't return undefined because length > 0

    if (length > 1) {
      this.data[0] = last;
      this.heapifyDown(0);
    }
    return root;
  }

  /** Completely clear the queue. */
  clear(): void {
    this.data = [];
  }

  // --------------------
  // Internal helpers
  // --------------------

  /** Restore the heap property moving the element at `idx` upward. */
  private heapifyUp(idx: number): void {
    let child = idx;
    while (child > 0) {
      const parent = (child - 1) >> 1; // floor((child-1)/2)
      if (this.cmp(this.data[child], this.data[parent]) < 0) {
        [this.data[child], this.data[parent]] = [this.data[parent], this.data[child]];
        child = parent;
      } else {
        break;
      }
    }
  }

  /** Restore the heap property moving the element at `idx` downward. */
  private heapifyDown(idx: number): void {
    const length = this.data.length;
    let root = idx;

    while (true) {
      const left = (root << 1) + 1;   // 2*root+1
      const right = left + 1;         // 2*root+2
      let candidate = root;

      if (left < length && this.cmp(this.data[left], this.data[candidate]) < 0) {
        candidate = left;
      }
      if (right < length && this.cmp(this.data[right], this.data[candidate]) < 0) {
        candidate = right;
      }

      if (candidate === root) break;

      [this.data[root], this.data[candidate]] = [this.data[candidate], this.data[root]];
      root = candidate;
    }
  }
}
// A priority queue that keeps the largest number on top (max‑heap)
const maxPQ = new PriorityQueue<number>((a, b) => b - a);

maxPQ.push(5);
maxPQ.push(1);
maxPQ.push(3);
console.log(maxPQ.peek()); // 5
console.log(maxPQ.pop());  // 5
console.log(maxPQ.pop());  // 3
interface Job {
  id: string;
  priority: number; // lower is “earlier” / higher priority
}

const jobPQ = new PriorityQueue<Job>((a, b) => a.priority - b.priority);

jobPQ.push({ id: "A", priority: 10 });
jobPQ.push({ id: "B", priority: 3 });

console.log(jobPQ.pop()?.id); // "B"
