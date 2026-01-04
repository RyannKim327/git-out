/**
 * A binary‑heap based priority queue.
 *
 * @template T  The type of elements stored in the queue.
 *
 * The queue is generic – you decide the ordering by supplying a comparator.
 * By default it behaves as a **min‑heap** for numbers.
 */
export class PriorityQueue<T> {
  /** The underlying array that stores the heap. */
  private heap: T[] = [];

  /**
   * Comparator that returns a negative number if a has higher priority than b.
   *
   * For a min‑heap you can use (a, b) => a - b (for numbers) or any
   * function that returns <0 when a should be before b.
   */
  private readonly compare: (a: T, b: T) => number;

  /**
   * @param compare Optional comparator. If omitted we assume `T` is `number`
   *                and build a min‑heap (`a - b`).
   */
  constructor(compare?: (a: T, b: T) => number) {
    if (compare) {
      this.compare = compare;
    } else {
      // Fallback for numbers – you can replace this with a stricter type guard.
      this.compare = ((a: any, b: any) => a - b) as (a: T, b: T) => number;
    }
  }

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------

  /** Number of elements in the queue. O(1) */
  size(): number {
    return this.heap.length;
  }

  /** True if the queue contains no elements. O(1) */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /** Returns the element with the highest priority without removing it. O(1) */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Inserts a new element into the queue. O(log n)
   *
   * @param value Element to insert.
   */
  push(value: T): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Removes and returns the element with the highest priority.
   * Returns `undefined` if the queue is empty. O(log n)
   */
  pop(): T | undefined {
    if (this.isEmpty()) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop()!; // non‑empty, so safe

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return root;
  }

  /**
   * Replaces the root element with a new value and restores the heap.
   * Slightly faster than `pop` + `push` when you already have the new value.
   *
   * @param value New value that will become the root.
   * @returns The old root (or `undefined` if the queue was empty).
   */
  replace(value: T): T | undefined {
    if (this.isEmpty()) {
      this.heap[0] = value;
      return undefined;
    }
    const oldRoot = this.heap[0];
    this.heap[0] = value;
    this.bubbleDown(0);
    return oldRoot;
  }

  /** Removes all elements from the queue. O(1) */
  clear(): void {
    this.heap = [];
  }

  // -----------------------------------------------------------------------
  // Internal helpers – all are O(log n)
  // -----------------------------------------------------------------------

  /** Move the element at `idx` up until the heap property holds. */
  private bubbleUp(idx: number): void {
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1; // same as Math.floor((idx-1)/2)
      const parent = this.heap[parentIdx];
      if (this.compare(element, parent) >= 0) break; // element is in correct spot
      this.heap[idx] = parent; // move parent down
      idx = parentIdx;
    }
    this.heap[idx] = element;
  }

  /** Move the element at `idx` down until the heap property holds. */
  private bubbleDown(idx: number): void {
    const length = this.heap.length;
    const element = this.heap[idx];

    while (true) {
      const leftIdx = (idx << 1) + 1; // 2*idx + 1
      const rightIdx = leftIdx + 1;
      let smallestIdx = idx;

      if (leftIdx < length && this.compare(this.heap[leftIdx], this.heap[smallestIdx]) < 0) {
        smallestIdx = leftIdx;
      }
      if (rightIdx < length && this.compare(this.heap[rightIdx], this.heap[smallestIdx]) < 0) {
        smallestIdx = rightIdx;
      }

      if (smallestIdx === idx) break; // heap property satisfied

      // swap current element with the smaller child
      this.heap[idx] = this.heap[smallestIdx];
      idx = smallestIdx;
    }

    this.heap[idx] = element;
  }

  // -----------------------------------------------------------------------
  // Optional: iterator support (makes the queue iterable)
  // -----------------------------------------------------------------------

  /** Allows `for (const x of pq) { … }` – iterates in heap order (not sorted). */
  *[Symbol.iterator](): IterableIterator<T> {
    for (const item of this.heap) yield item;
  }
}
import { PriorityQueue } from "./PriorityQueue";

const minPQ = new PriorityQueue<number>(); // default comparator = (a,b)=>a-b

minPQ.push(5);
minPQ.push(2);
minPQ.push(9);
minPQ.push(1);

console.log(minPQ.pop()); // 1
console.log(minPQ.pop()); // 2
console.log(minPQ.peek()); // 5 (still in the queue)
// Comparator that makes larger numbers “higher priority”
const maxPQ = new PriorityQueue<number>((a, b) => b - a);

maxPQ.push(5);
maxPQ.push(2);
maxPQ.push(9);
maxPQ.push(1);

console.log(maxPQ.pop()); // 9
console.log(maxPQ.pop()); // 5
interface Task {
  id: string;
  priority: number; // lower number = higher urgency
  payload: any;
}

const taskPQ = new PriorityQueue<Task>((a, b) => a.priority - b.priority);

taskPQ.push({ id: "a", priority: 10, payload: "low" });
taskPQ.push({ id: "b", priority: 3, payload: "high" });
taskPQ.push({ id: "c", priority: 7, payload: "medium" });

while (!taskPQ.isEmpty()) {
  const t = taskPQ.pop()!;
  console.log(`Processing ${t.id} (priority ${t.priority})`);
}
// Output:
// Processing b (priority 3)
// Processing c (priority 7)
// Processing a (priority 10)
// Assume we already have a min‑heap of distances
const distances = new PriorityQueue<number>();
distances.push(0); // start node distance

// later we discover a better distance for the start node:
distances.replace(0); // no change, but demonstrates API
// priorityQueue.test.ts
import { PriorityQueue } from "./PriorityQueue";

function isHeap<T>(arr: T[], compare: (a: T, b: T) => number): boolean {
  for (let i = 0; i < arr.length; i++) {
    const left = 2 * i + 1;
    const right = left + 1;
    if (left < arr.length && compare(arr[left], arr[i]) < 0) return false;
    if (right < arr.length && compare(arr[right], arr[i]) < 0) return false;
  }
  return true;
}

test("min‑heap maintains order", () => {
  const pq = new PriorityQueue<number>();
  const values = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
  values.forEach(v => pq.push(v));

  // internal heap array should satisfy the heap property
  // (we expose it via a private hack for testing only)
  // @ts-ignore
  expect(isHeap(pq.heap, (a, b) => a - b)).toBe(true);

  const sorted = [...values].sort((a, b) => a - b);
  const popped = [];
  while (!pq.isEmpty()) popped.push(pq.pop()!);
  expect(popped).toEqual(sorted);
});

test("max‑heap works", () => {
  const pq = new PriorityQueue<number>((a, b) => b - a);
  const values = [5, 1, 9, 3, 7];
  values.forEach(v => pq.push(v));

  const expected = [...values].sort((a, b) => b - a);
  const result = [];
  while (!pq.isEmpty()) result.push(pq.pop()!);
  expect(result).toEqual(expected);
});
src/
 ├─ PriorityQueue.ts          // the class shown above
 ├─ index.ts                  // export { PriorityQueue } from "./PriorityQueue";
 └─ __tests__/
      └─ priorityQueue.test.ts
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "@types/jest": "^29.0.0"
  }
}
// 1️⃣ Create
const pq = new PriorityQueue<number>((a, b) => a - b); // min‑heap

// 2️⃣ Insert
pq.push(42);

// 3️⃣ Peek (O(1))
const top = pq.peek(); // 42

// 4️⃣ Remove highest priority (O(log n))
const min = pq.pop(); // 42

// 5️⃣ Size / emptiness
pq.size();   // 0
pq.isEmpty(); // true
