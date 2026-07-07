/**
 * A binary‑heap based priority queue.
 *
 * @template T - The type of the heap elements.
 */
export class PriorityQueue<T> {
  /** Array representation of the heap.  Root is at index 0. */
  private heap: T[] = [];

  /**
   * Comparator that decides heap order.
   *
   *   - If it returns a negative number → a precedes b.
   *   - If 0 → equal.
   *   - If positive → a follows b.
   *
   * You can pass your own comparator; otherwise a simple
   * numerical ascending order is used.
   */
  constructor(
    private compareFn: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
  ) {}

  /* ----- Query helpers ----- */

  /** Number of elements in the queue. */
  size(): number {
    return this.heap.length;
  }

  /** Return the element with highest priority without removing it. */
  peek(): T | null {
    return this.heap.length ? this.heap[0] : null;
  }

  /* ----- Manipulation helpers ----- */

  /** Insert a new element */
  push(item: T): void {
    this.heap.push(item);
    this.siftUp(this.heap.length - 1);
  }

  /**
   * Remove and return the element with highest priority.
   * Returns `null` if the queue is empty.
   */
  pop(): T | null {
    const n = this.heap.length;
    if (n === 0) return null;
    if (n === 1) return this.heap.pop() ?? null;

    const top = this.heap[0];
    // Move last element to the root and shrink array.
    this.heap[0] = this.heap.pop() as T;
    this.siftDown(0);
    return top;
  }

  /* ----- Internal re‑heapify ----- */

  /** Push the element at index `i` up until heap property holds. */
  private siftUp(i: number): void {
    const { heap, compareFn } = this;
    let childIndex = i;

    while (childIndex > 0) {
      const parentIndex = (childIndex - 1) >> 1;
      if (compareFn(heap[childIndex], heap[parentIndex]) >= 0) break;

      // Swap child & parent
      [heap[childIndex], heap[parentIndex]] = [heap[parentIndex], heap[childIndex]];
      childIndex = parentIndex;
    }
  }

  /** Move the element at index `i` down until heap property holds. */
  private siftDown(i: number): void {
    const { heap, compareFn } = this;
    const n = heap.length;
    let parentIndex = i;

    while (true) {
      const leftIdx = (parentIndex << 1) + 1;
      const rightIdx = leftIdx + 1;

      let smallest = parentIndex;

      if (leftIdx < n && compareFn(heap[leftIdx], heap[smallest]) < 0) {
        smallest = leftIdx;
      }
      if (rightIdx < n && compareFn(heap[rightIdx], heap[smallest]) < 0) {
        smallest = rightIdx;
      }

      if (smallest === parentIndex) break;

      [heap[parentIndex], heap[smallest]] = [heap[smallest], heap[parentIndex]];
      parentIndex = smallest;
    }
  }

  /* ----- Utility ----- */

  /**
   * Re‑build the heap from the current array contents.  
   * Useful after bulk insertion or when the comparator changes.
   */
  heapify(): void {
    for (let i = (this.heap.length >> 1) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }
}
// Simple min‑heap of numbers (default comparator does that)
const minQ = new PriorityQueue<number>();

minQ.push(5);   // 5
minQ.push(3);   // 3,5
minQ.push(8);   // 3,5,8
minQ.push(1);   // 1,3,8,5

console.log(minQ.pop()); // 1
console.log(minQ.pop()); // 3
console.log(minQ.peek()); // 5
console.log(minQ.size()); // 2
interface Task { id: string; priority: number; }

const maxQ = new PriorityQueue<Task>((a, b) => b.priority - a.priority);

maxQ.push({ id: "A", priority: 10 });
maxQ.push({ id: "B", priority: 20 });
maxQ.push({ id: "C", priority: 5 });

console.log(maxQ.pop()); // B (20)
