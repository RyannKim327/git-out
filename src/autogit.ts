/** A minimal generic priority queue built on a binary heap */
export class PriorityQueue<T> {
  /** Internal storage array (0‑based). 0 is the root. */
  private heap: T[] = [];

  /** Comparator that returns true if a should come before b. */
  private readonly less: (a: T, b: T) => boolean;

  /** Number of queued elements */
  public get size(): number { return this.heap.length; }

  /** Peek at the top element without removing it.  Returns undefined if empty. */
  public peek(): T | undefined { return this.heap[0]; }

  constructor(comparator?: (a: T, b: T) => boolean) {
    // Default to a min‑heap using < for primitives
    this.less = comparator ?? ((a, b) => (a as any) < (b as any));
  }

  /** Insert a new element into the queue */
  public push(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  /** Remove and return the top element.  Returns undefined if empty. */
  public pop(): T | undefined {
    const n = this.heap.length;
    if (n === 0) return undefined;
    if (n === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop() as T; // Set last element to root
    this.sinkDown(0);
    return top;
  }

  /** Swap two indices in the heap */
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /** Restore heap order by moving the element at idx up */
  private bubbleUp(idx: number): void {
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1;
      const parent = this.heap[parentIdx];
      if (!this.less(element, parent)) break;
      this.swap(idx, parentIdx);
      idx = parentIdx;
    }
  }

  /** Restore heap order by moving the element at idx down */
  private sinkDown(idx: number): void {
    const n = this.heap.length;
    const element = this.heap[idx];

    while (true) {
      const leftIdx = (idx << 1) + 1;
      const rightIdx = leftIdx + 1;
      let smallestIdx = idx;

      if (leftIdx < n && this.less(this.heap[leftIdx], this.heap[smallestIdx])) {
        smallestIdx = leftIdx;
      }
      if (rightIdx < n && this.less(this.heap[rightIdx], this.heap[smallestIdx])) {
        smallestIdx = rightIdx;
      }

      if (smallestIdx === idx) break;
      this.swap(idx, smallestIdx);
      idx = smallestIdx;
    }
  }
}
// Minimum priority queue (default)
const minQ = new PriorityQueue<number>();
minQ.push(5);
minQ.push(2);
minQ.push(8);
console.log(minQ.peek()); // 2
console.log(minQ.pop());  // 2
console.log(minQ.pop());  // 5

// Maximum priority queue
const maxQ = new PriorityQueue<number>((a, b) => a > b);
maxQ.push(5);
maxQ.push(2);
maxQ.push(8);
console.log(maxQ.pop()); // 8
interface Task { id: string; priority: number; }

const taskQueue = new PriorityQueue<Task>((a, b) => a.priority < b.priority); // min‑heap by priority
taskQueue.push({ id: 'A', priority: 10 });
taskQueue.push({ id: 'B', priority: 5 });
console.log(taskQueue.pop()); // { id: 'B', priority: 5 }
