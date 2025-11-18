// priority-queue.ts
export class PriorityQueue<T> {
  private heap: T[] = [];

  constructor(
    private compare: (a: T, b: T) => number
  ) {}

  /* ---- public API ---- */
  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  push(item: T): void {
    this.heap.push(item);
    this._siftUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._siftDown(0);
    }
    return min;
  }

  /* ---- helpers ---- */
  private _parent(i: number) {
    return Math.floor((i - 1) / 2);
  }
  private _left(i: number) {
    return 2 * i + 1;
  }
  private _right(i: number) {
    return 2 * i + 2;
  }

  private _siftUp(idx: number) {
    while (idx > 0) {
      const p = this._parent(idx);
      if (this.compare(this.heap[idx], this.heap[p]) >= 0) break;
      [this.heap[idx], this.heap[p]] = [this.heap[p], this.heap[idx]];
      idx = p;
    }
  }

  private _siftDown(idx: number) {
    while (true) {
      const l = this._left(idx);
      const r = this._right(idx);
      let smallest = idx;
      if (l < this.heap.length && this.compare(this.heap[l], this.heap[smallest]) < 0)
        smallest = l;
      if (r < this.heap.length && this.compare(this.heap[r], this.heap[smallest]) < 0)
        smallest = r;
      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }
}

/* ---------- convenience factories ---------- */
export function MinPQ<T>(compareFn?: (a: T, b: T) => number): PriorityQueue<T> {
  return new PriorityQueue<T>(compareFn || ((a, b) => (a as any) - (b as any)));
}

export function MaxPQ<T>(compareFn?: (a: T, b: T) => number): PriorityQueue<T> {
  const cmp = compareFn || ((a, b) => (a as any) - (b as any));
  return new PriorityQueue<T>((a, b) => -cmp(a, b));
}
import { MinPQ, MaxPQ } from './priority-queue';

// 1. numbers – ascending
const pq = MinPQ<number>();
[5, 3, 9, 1, 2].forEach(n => pq.push(n));
while (!pq.isEmpty()) console.log(pq.pop()); // 1 2 3 5 9

// 2. strings – descending by length
const maxPQ = MaxPQ<string>((a, b) => a.length - b.length);
['apple', 'pear', 'banana', 'kiwi'].forEach(s => maxPQ.push(s));
console.log(maxPQ.pop()); // banana

// 3. custom objects
interface Task { name: string; priority: number; }
const taskQueue = MinPQ<Task>((a, b) => a.priority - b.priority);
taskQueue.push({ name: 'fix bug', priority: 3 });
taskQueue.push({ name: 'deploy', priority: 1 });
console.log(taskQueue.pop()?.name); // deploy
