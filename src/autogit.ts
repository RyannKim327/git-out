index: 0   1   2   3   4   5   6   …
value: A   B   C   D   E   F   G   …
interface PriorityQueue<T> {
  /** Insert a new element */
  push(item: T): void;

  /** Remove and return the element with highest priority (root) */
  pop(): T | undefined;

  /** Look at the root without removing it */
  peek(): T | undefined;

  /** Number of elements currently stored */
  size(): number;

  /** True if the queue is empty */
  isEmpty(): boolean;

  /** Remove all elements */
  clear(): void;
}
/**
 * A binary‑heap based priority queue.
 *
 * @template T  The type of the stored items.
 *
 * The queue uses a comparator function to decide the ordering.
 *   - For a **min‑heap** use `(a, b) => a - b` (or any function that returns <0 when a < b).
 *   - For a **max‑heap** use `(a, b) => b - a`.
 *   - For complex objects you can compare a key: `(a, b) => a.priority - b.priority`.
 */
export class BinaryHeapPriorityQueue<T> implements PriorityQueue<T> {
  /** The underlying array that stores the heap. */
  private heap: T[] = [];

  /**
   * @param comparator  Returns a negative number if a has higher priority than b,
   *                    zero if they are equal, positive if b has higher priority.
   */
  constructor(private readonly comparator: (a: T, b: T) => number) {}

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /** Insert a new element and restore the heap property. */
  push(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  /** Remove and return the element with the highest priority (the root). */
  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop()!; // we know length > 0

    // If there are still elements, move the last one to the root and bubble down.
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return root;
  }

  /** Look at the root without removing it. */
  peek(): T | undefined {
    return this.heap[0];
  }

  /** Number of elements stored. */
  size(): number {
    return this.heap.length;
  }

  /** True if the queue is empty. */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /** Remove all elements. */
  clear(): void {
    this.heap = [];
  }

  // -------------------------------------------------------------------------
  // Private helpers – the heart of the heap
  // -------------------------------------------------------------------------

  /** Move the element at `idx` up until the heap property holds. */
  private bubbleUp(idx: number): void {
    const item = this.heap[idx];
    let current = idx;

    while (current > 0) {
      const parentIdx = (current - 1) >> 1; // same as Math.floor((current-1)/2)
      const parent = this.heap[parentIdx];

      // If parent already has higher priority, stop.
      if (this.comparator(parent, item) <= 0) break;

      // Otherwise swap with parent.
      this.heap[current] = parent;
      current = parentIdx;
    }

    this.heap[current] = item;
  }

  /** Move the element at `idx` down until the heap property holds. */
  private bubbleDown(idx: number): void {
    const length = this.heap.length;
    const item = this.heap[idx];
    let current = idx;

    while (true) {
      const leftIdx = (current << 1) + 1; // 2*current + 1
      const rightIdx = leftIdx + 1;
      let smallestIdx = current;

      // Compare with left child
      if (leftIdx < length && this.comparator(this.heap[leftIdx], this.heap[smallestIdx]) < 0) {
        smallestIdx = leftIdx;
      }

      // Compare with right child
      if (rightIdx < length && this.comparator(this.heap[rightIdx], this.heap[smallestIdx]) < 0) {
        smallestIdx = rightIdx;
      }

      // If the smallest is still the current node, we are done.
      if (smallestIdx === current) break;

      // Swap current with the smallest child.
      this.heap[current] = this.heap[smallestIdx];
      current = smallestIdx;
    }

    this.heap[current] = item;
  }
}
import { BinaryHeapPriorityQueue } from "./BinaryHeapPriorityQueue";

const minPQ = new BinaryHeapPriorityQueue<number>((a, b) => a - b);

minPQ.push(5);
minPQ.push(2);
minPQ.push(9);
minPQ.push(1);

console.log(minPQ.pop()); // 1
console.log(minPQ.pop()); // 2
console.log(minPQ.peek()); // 5
console.log(minPQ.size()); // 2
const maxPQ = new BinaryHeapPriorityQueue<number>((a, b) => b - a);

maxPQ.push(5);
maxPQ.push(2);
maxPQ.push(9);
maxPQ.push(1);

console.log(maxPQ.pop()); // 9
console.log(maxPQ.pop()); // 5
type Task = { id: string; priority: number };

const taskPQ = new BinaryHeapPriorityQueue<Task>((a, b) => a.priority - b.priority); // min‑heap

taskPQ.push({ id: "A", priority: 10 });
taskPQ.push({ id: "B", priority: 5 });
taskPQ.push({ id: "C", priority: 7 });

while (!taskPQ.isEmpty()) {
  const t = taskPQ.pop()!;
  console.log(`Processing ${t.id} (priority ${t.priority})`);
}
// Output:
// Processing B (priority 5)
// Processing C (priority 7)
// Processing A (priority 10)
// test.ts
import { BinaryHeapPriorityQueue } from "./BinaryHeapPriorityQueue";

function assert(condition: any, msg?: string) {
  if (!condition) throw new Error(msg ?? "Assertion failed");
}

// ----- Min‑heap test -----
const min = new BinaryHeapPriorityQueue<number>((a, b) => a - b);
[7, 3, 5, 1, 9, 2].forEach(v => min.push(v));

assert(min.peek() === 1, "min.peek should be 1");
assert(min.pop() === 1, "first pop");
assert(min.pop() === 2, "second pop");
assert(min.pop() === 3, "third pop");
assert(min.size() === 3, "size after three pops");

// ----- Max‑heap test -----
const max = new BinaryHeapPriorityQueue<number>((a, b) => b - a);
[7, 3, 5, 1, 9, 2].forEach(v => max.push(v));

assert(max.peek() === 9, "max.peek should be 9");
assert(max.pop() === 9, "first max pop");
assert(max.pop() === 7, "second max pop");
assert(max.pop() === 5, "third max pop");
assert(max.size() === 3, "size after three max pops");

// ----- Object test -----
type Item = { key: string; weight: number };
const objPQ = new BinaryHeapPriorityQueue<Item>((a, b) => a.weight - b.weight);
objPQ.push({ key: "a", weight: 30 });
objPQ.push({ key: "b", weight: 10 });
objPQ.push({ key: "c", weight: 20 });

assert(objPQ.pop()!.key === "b", "lowest weight first");
assert(objPQ.pop()!.key === "c", "next weight");
assert(objPQ.pop()!.key === "a", "last weight");
assert(objPQ.isEmpty(), "queue should be empty now");

console.log("All tests passed 🎉");
npx ts-node test.ts
# → All tests passed 🎉
// Min‑heap of numbers
const pq = new BinaryHeapPriorityQueue<number>((a, b) => a - b);
pq.push(5); pq.push(2); pq.push(8);
console.log(pq.pop()); // 2 (smallest)
