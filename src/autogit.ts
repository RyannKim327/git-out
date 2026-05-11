/**
 * Comparator signature: (a, b) => boolean
 * Should return true if `a` has higher priority than `b`
 * (i.e. `a` should come *before* `b` in the heap order).
 */
type Comparator<T> = (a: T, b: T) => boolean;

export class PriorityQueue<T> {
  /** Encoded binary‑heap */
  private items: T[] = [];

  constructor(private comparator: Comparator<T> = (a, b) => a < b) { }

  /* ---------- Properties ---------- */

  get size(): number { return this.items.length; }
  get isEmpty(): boolean { return this.items.length === 0; }

  /* ---------- Queries ---------- */

  peek(): T | undefined { return this.items[0]; }

  /* ---------- Mutations ---------- */

  push(item: T): void {
    this.items.push(item);
    this.bubbleUp(this.items.length - 1);
  }

  pop(): T | undefined {
    if (this.isEmpty) return undefined;

    const top = this.items[0];
    const last = this.items.pop()!; // array isn't empty

    if (!this.isEmpty) {
      this.items[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  /* ---------- Internals ---------- */

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.comparator(this.items[idx], this.items[parentIdx])) {
        this.swap(idx, parentIdx);
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  private bubbleDown(idx: number): void {
    const length = this.items.length;
    while (true) {
      const left = idx * 2 + 1;
      const right = left + 1;
      let smallest = idx;

      if (left < length && this.comparator(this.items[left], this.items[smallest])) {
        smallest = left;
      }
      if (right < length && this.comparator(this.items[right], this.items[smallest])) {
        smallest = right;
      }

      if (smallest !== idx) {
        this.swap(idx, smallest);
        idx = smallest;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }
}
const maxHeap = new PriorityQueue<number>((a, b) => a > b);
interface Task {
  priority: number;     // smaller number → higher priority
  description: string;
}

const taskQueue = new PriorityQueue<Task>((a, b) => a.priority < b.priority);
const pq = new PriorityQueue<number>((a, b) => a < b); // min‑heap

[pq.push(5), pq.push(3), pq.push(8), pq.push(1)];

while (!pq.isEmpty) {
  console.log(pq.pop()); // prints: 1, 3, 5, 8
}
