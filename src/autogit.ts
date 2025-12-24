// -------------------------------------------------
// PriorityQueue.ts
// -------------------------------------------------

export class PriorityQueue<T> {
  private heap: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {
    if (typeof compare !== 'function') throw new Error('compare must be a function');
  }

  /* ---- Public API ---- */

  get size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  enqueue(item: T): void {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const min = this.heap[0];
    const end = this.heap.pop()!;
    if (!this.isEmpty()) {
      this.heap[0] = end;
      this._bubbleDown(0);
    }
    return min;
  }

  clear(): void {
    this.heap.length = 0;
  }

  /* ---- Internal helpers ---- */

  private _bubbleUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1; // faster Math.floor((idx-1)/2)
      if (this.compare(this.heap[idx], this.heap[parentIdx]) >= 0) break;
      this._swap(idx, parentIdx);
      idx = parentIdx;
    }
  }

  private _bubbleDown(idx: number): void {
    const n = this.heap.length;
    const half = n >> 1;
    while (idx < half) {
      let left = (idx << 1) + 1;
      let right = left + 1;
      let smallest = idx;

      if (left < n && this.compare(this.heap[left], this.heap[smallest]) < 0) smallest = left;
      if (right < n && this.compare(this.heap[right], this.heap[smallest]) < 0) smallest = right;

      if (smallest === idx) break;
      this._swap(idx, smallest);
      idx = smallest;
    }
  }

  private _swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

/* -------------------------------------------------
 * Usage examples
 * -------------------------------------------------
 */

// 1. Min-heap of numbers
const minQ = new PriorityQueue<number>((a, b) => a - b);
minQ.enqueue(5);
minQ.enqueue(2);
minQ.enqueue(8);
console.log(minQ.dequeue()); // 2

// 2. Max-heap of numbers
const maxQ = new PriorityQueue<number>((a, b) => b - a);
maxQ.enqueue(5);
maxQ.enqueue(2);
maxQ.enqueue(8);
console.log(maxQ.dequeue()); // 8

// 3. Min-heap of objects (e.g. tasks with priority)
interface Task {
  name: string;
  priority: number; // lower number = higher priority
}
const taskQueue = new PriorityQueue<Task>((a, b) => a.priority - b.priority);
taskQueue.enqueue({ name: 'write docs', priority: 3 });
taskQueue.enqueue({ name: 'fix bug', priority: 1 });
taskQueue.enqueue({ name: 'review PR', priority: 2 });
console.log(taskQueue.dequeue()?.name); // 'fix bug'
