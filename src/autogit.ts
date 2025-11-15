// ------------------------------------------------------------
// Generic node: you can store any payload together with the key
// ------------------------------------------------------------
interface Node<T> {
  key: number;   // priority (lower = higher priority)
  payload: T;     // arbitrary user data
}

// ------------------------------------------------------------
// Min-Priority Queue
// ------------------------------------------------------------
export class PriorityQueue<T> {
  private heap: Node<T>[] = [];

  /* ---- Public API ---- */

  /** Number of elements in the queue */
  public get size(): number {
    return this.heap.length;
  }

  /** True if the queue is empty */
  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /** Insert a new item with the given priority */
  public enqueue(payload: T, priority: number): void {
    const node: Node<T> = { key: priority, payload };
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  /** Return and remove the element with the smallest priority */
  public dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const min = this.heap[0];
    const last = this.heap.pop()!;

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return min.payload;
  }

  /** Peek at the element with the smallest priority without removing it */
  public peek(): T | undefined {
    return this.isEmpty() ? undefined : this.heap[0].payload;
  }

  /* ---- Internal helpers ---- */

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx].key >= this.heap[parentIdx].key) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }

  private bubbleDown(idx: number): void {
    const n = this.heap.length;
    while (true) {
      let minIdx = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < n && this.heap[left].key < this.heap[minIdx].key) minIdx = left;
      if (right < n && this.heap[right].key < this.heap[minIdx].key) minIdx = right;

      if (minIdx === idx) break;
      [this.heap[idx], this.heap[minIdx]] = [this.heap[minIdx], this.heap[idx]];
      idx = minIdx;
    }
  }
}

/* ------------------------------------------------------------
 * Usage example
 * ------------------------------------------------------------
const pq = new PriorityQueue<string>();
pq.enqueue("fix bug", 2);
pq.enqueue("deploy app", 1);
pq.enqueue("write docs", 5);

while (!pq.isEmpty()) {
  console.log(pq.dequeue());
}
// → deploy app
// → fix bug
// → write docs
*/
