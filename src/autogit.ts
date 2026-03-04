type Compare<T> = (a: T, b: T) => boolean;

/**
 * If `compare(child, parent)` is true, swap them and continue
 * until the heap property is restored.
 */
function siftDown<T>(heap: T[], start: number, end: number, compare: Compare<T>) {
  let root = start;

  while (true) {
    const left = root * 2 + 1;
    const right = left + 1;
    let swap = root;

    if (left <= end && compare(heap[left], heap[swap])) {
      swap = left;
    }
    if (right <= end && compare(heap[right], heap[swap])) {
      swap = right;
    }

    if (swap === root) break;

    [heap[root], heap[swap]] = [heap[swap], heap[root]];
    root = swap;
  }
}

/**
 * Moves the root element down the heap until it finds the right spot.
 * Called during `remove` after we swap the last element into the root.
 */
export function heapify<T>(heap: T[], compare: Compare<T>) {
  const length = heap.length;
  if (length <= 1) return;

  // Start from the last non‑leaf node.
  for (let i = Math.floor((length - 2) / 2); i >= 0; i--) {
    siftDown(heap, i, length - 1, compare);
  }
}
export class PriorityQueue<T> {
  private heap: T[] = [];
  private readonly compare: Compare<T>;

  constructor(compare: Compare<T>) {
    this.compare = compare;
  }

  get size() {
    return this.heap.length;
  }

  /** Insert a new item, maintaining heap property */
  push(item: T): void {
    this.heap.push(item);
    // bubble‑up
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (!this.compare(this.heap[idx], this.heap[parentIdx])) break;
      [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
      idx = parentIdx;
    }
  }

  /** Return the root element (minimum) without removing it */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Remove and return the root element.
   * The last element is moved to the root and sifted down.
   */
  pop(): T | undefined {
    const length = this.heap.length;
    if (!length) return undefined;
    const root = this.heap[0];
    const last = this.heap.pop()!; // last is defined because length > 0

    if (length > 1) {
      this.heap[0] = last;
      siftDown(this.heap, 0, this.heap.length - 1, this.compare);
    }

    return root;
  }

  /** Convert the current array into a heap (in‑place) */
  build() {
    heapify(this.heap, this.compare);
  }
}
// Simple numeric priority queue
const pq = new PriorityQueue<number>((a, b) => a < b);

pq.push(5);
pq.push(2);
pq.push(8);
pq.push(1);

console.log(pq.peek()); // 1
while (pq.size) {
  console.log(pq.pop()); // 1, 2, 5, 8
}
interface Task {
  id: number;
  priority: number; // smaller = higher priority
  payload: string;
}

const taskCompare = (a: Task, b: Task) => a.priority < b.priority;
const taskQueue = new PriorityQueue<Task>(taskCompare);

taskQueue.push({ id: 1, priority: 10, payload: 'work' });
taskQueue.push({ id: 2, priority: 3, payload: 'urgent' });
taskQueue.push({ id: 3, priority: 7, payload: 'normal' });

while (taskQueue.size) {
  const t = taskQueue.pop()!;
  console.log(`${t.id} (${t.priority}): ${t.payload}`);
}
2 (3): urgent
3 (7): normal
1 (10): work
const maxComparator = (a: number, b: number) => a > b;
const maxPQ = new PriorityQueue<number>(maxComparator);
