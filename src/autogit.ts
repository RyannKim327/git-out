export interface PriorityQueue<T> {
  enqueue(item: T, priority: number): void;
  dequeue(): T | undefined;         // removes the highest‑priority item
  peek(): T | undefined;            // look at the next item without removing
  size(): number;
  isEmpty(): boolean;
}
type HeapNode<T> = { value: T; priority: number };

export class BinaryHeap<T> implements PriorityQueue<T> {
  /** Internal array that holds the heap nodes. */
  private heap: HeapNode<T>[] = [];

  /** Returns the array length, i.e. number of elements in the queue. */
  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  /** Put a new (value, priority) pair into the heap. */
  enqueue(value: T, priority: number) {
    const node: HeapNode<T> = { value, priority };
    this.heap.push(node);               // add to the bottom
    this.bubbleUp(this.heap.length - 1); // restore heap property
  }

  /** Remove and return the value with the lowest priority value. */
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop()!;          // guaranteed non‑empty

    if (!this.isEmpty()) {
      this.heap[0] = last;                  // move the last node to root
      this.bubbleDown(0);                   // restore heap property
    }

    return root.value;
  }

  /** Peek at the next value that would be dequeued. */
  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.heap[0].value;
  }

  /* ---------- internal helpers ---------- */

  private bubbleUp(idx: number) {
    const node = this.heap[idx];
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1; // same as Math.floor((idx-1)/2)
      const parent = this.heap[parentIdx];
      if (node.priority >= parent.priority) break; // correct place found
      this.heap[idx] = parent;                     // move parent down
      idx = parentIdx;
    }
    this.heap[idx] = node; // place the new node
  }

  private bubbleDown(idx: number) {
    const length = this.heap.length;
    const node = this.heap[idx];

    while (true) {
      const leftIdx = idx * 2 + 1;
      const rightIdx = leftIdx + 1;
      let smallestIdx = idx;

      if (leftIdx < length && this.heap[leftIdx].priority < this.heap[smallestIdx].priority) {
        smallestIdx = leftIdx;
      }
      if (rightIdx < length && this.heap[rightIdx].priority < this.heap[smallestIdx].priority) {
        smallestIdx = rightIdx;
      }

      if (smallestIdx === idx) break; // node is smaller than both children

      this.heap[idx] = this.heap[smallestIdx];
      idx = smallestIdx;
    }

    this.heap[idx] = node;
  }
}
const pq = new BinaryHeap<string>();

pq.enqueue('task A', 5);
pq.enqueue('task B', 2);
pq.enqueue('task C', 8);

console.log(pq.peek());   // => 'task B' (priority 2)
while (!pq.isEmpty()) {
  console.log(pq.dequeue()); // prints B, A, C in priority order
}
type Comparator<T> = (a: T, b: T) => number; // <0: a before b
