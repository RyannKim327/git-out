// ---------------------------------------------------------
// BinaryHeap.ts
// ---------------------------------------------------------
type Compare<T> = (a: T, b: T) => number;

export class BinaryHeap<T> {
  private readonly heap: T[] = [];
  private readonly cmp: Compare<T>;

  constructor(cmp: Compare<T>) {
    this.cmp = cmp;
  }

  /* ---------- static helpers ---------- */
  static min<T>(): BinaryHeap<T> {
    return new BinaryHeap<T>((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  static max<T>(): BinaryHeap<T> {
    return new BinaryHeap<T>((a, b) => (a > b ? -1 : a < b ? 1 : 0));
  }

  /* ---------- core API ---------- */
  get size(): number {
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
    const top = this.heap[0];
    const bottom = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._siftDown(0);
    }
    return top;
  }

  clear(): void {
    this.heap.length = 0;
  }

  /* ---------- bulk load (Floyd O(n)) ---------- */
  heapify(items: T[]): void {
    this.heap.length = 0;
    this.heap.push(...items);
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this._siftDown(i);
    }
  }

  /* ---------- internal helpers ---------- */
  private _siftUp(idx: number): void {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.cmp(this.heap[idx], this.heap[parent]) >= 0) break;
      [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
      idx = parent;
    }
  }

  private _siftDown(idx: number): void {
    while (true) {
      let min = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      const n = this.heap.length;

      if (left < n && this.cmp(this.heap[left], this.heap[min]) < 0) min = left;
      if (right < n && this.cmp(this.heap[right], this.heap[min]) < 0) min = right;
      if (min === idx) break;

      [this.heap[idx], this.heap[min]] = [this.heap[min], this.heap[idx]];
      idx = min;
    }
  }
}
const pq = BinaryHeap.min<number>();
[5, 3, 9, 1, 7].forEach(n => pq.push(n));
console.log(pq.pop()); // 1
console.log(pq.pop()); // 3
const maxPq = BinaryHeap.max<number>();
[5, 3, 9, 1, 7].forEach(n => maxPq.push(n));
console.log(maxPq.pop()); // 9
interface Task {
  name: string;
  priority: number; // lower number ⇒ higher priority
}
const taskQueue = new BinaryHeap<Task>((a, b) => a.priority - b.priority);
taskQueue.push({ name: 'write docs', priority: 3 });
taskQueue.push({ name: 'fix bug',    priority: 1 });
console.log(taskQueue.pop()!.name); // fix bug
const data = Array.from({ length: 1_000_000 }, () => Math.random());
const pq = BinaryHeap.min<number>();
pq.heapify(data); // O(n) instead of O(n log n)
