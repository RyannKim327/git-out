/**
 * A binary heap backed priority queue.
 *
 * The heap stores elements in a 0‑based array. For a node at index i:
 *   left child   → 2*i + 1
 *   right child  → 2*i + 2
 *   parent       → Math.floor((i - 1) / 2)
 */
export class BinaryPriorityQueue<T> {
  private data: T[] = [];
  private readonly compare: (a: T, b: T) => number; // negative if a < b

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  /** Number of elements in the queue */
  size(): number {
    return this.data.length;
  }

  /** Peek the element with the highest priority (root of the heap) */
  peek(): T | undefined {
    return this.data[0];
  }

  /** Insert a new element */
  push(value: T): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  /**
   * Remove and return the element with the highest priority.
   * Returns undefined if the queue is empty.
   */
  pop(): T | undefined {
    if (!this.data.length) return undefined;

    const root = this.data[0];
    const last = this.data.pop()!; // safe because we checked length

    if (this.data.length) {
      this.data[0] = last;
      this.sinkDown(0);
    }

    return root;
  }

  /** Remove all elements */
  clear(): void {
    this.data.length = 0;
  }

  /* --- Internals --- */

  private bubbleUp(index: number): void {
    const elem = this.data[index];
    while (index > 0) {
      const parentIdx = (index - 1) >> 1;
      const parent = this.data[parentIdx];
      if (this.compare(elem, parent) >= 0) break;
      this.data[index] = parent;
      index = parentIdx;
    }
    this.data[index] = elem;
  }

  private sinkDown(index: number): void {
    const length = this.data.length;
    const elem = this.data[index];

    while (true) {
      const leftIdx = (index << 1) + 1;
      const rightIdx = leftIdx + 1;
      let swapIdx = -1;

      if (leftIdx < length) {
        const left = this.data[leftIdx];
        if (this.compare(left, elem) < 0) swapIdx = leftIdx;
      }
      if (rightIdx < length) {
        const right = this.data[rightIdx];
        const compareRight = this.compare(right, elem);
        if (
          (swapIdx === -1 && compareRight < 0) ||
          (swapIdx !== -1 && compareRight < this.compare(this.data[swapIdx], elem))
        ) {
          swapIdx = rightIdx;
        }
      }

      if (swapIdx === -1) break;
      this.data[index] = this.data[swapIdx];
      index = swapIdx;
    }
    this.data[index] = elem;
  }
}
// Example: priority queue of numbers (min‑heap)
const pq = new BinaryPriorityQueue<number>((a, b) => a - b);

pq.push(5);
pq.push(1);
pq.push(3);

console.log(pq.peek()); // 1
console.log(pq.pop());  // 1
console.log(pq.pop());  // 3
console.log(pq.pop());  // 5
interface Task { id: number; priority: number; }

const taskQueue = new BinaryPriorityQueue<Task>((a, b) => a.priority - b.priority);
