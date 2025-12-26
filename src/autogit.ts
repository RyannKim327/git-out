/**
 * PriorityQueue<T>
 *
 * A binary‑heap based priority queue.
 *
 * @template T  The type of the stored elements.
 *
 * Example usage:
 *
 *   // Min‑heap of numbers
 *   const minQ = new PriorityQueue<number>((a, b) => a - b);
 *   minQ.push(5); minQ.push(2); minQ.push(8);
 *   console.log(minQ.pop()); // 2
 *
 *   // Max‑heap of objects
 *   interface Task { id: string; priority: number; }
 *   const maxQ = new PriorityQueue<Task>((a, b) => b.priority - a.priority);
 *   maxQ.push({id:'a', priority:1});
 *   maxQ.push({id:'b', priority:5});
 *   console.log(maxQ.pop()); // {id:'b', priority:5}
 */
export class PriorityQueue<T> {
  /** The underlying array that stores the heap. */
  private heap: T[] = [];

  /**
   * @param compare  A comparator that returns a negative number if a has higher priority than b.
   *                 For a min‑heap use (a,b)=>a-b; for a max‑heap use (a,b)=>b-a.
   */
  constructor(private readonly compare: (a: T, b: T) => number) {}

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /** Number of elements in the queue. */
  get size(): number {
    return this.heap.length;
  }

  /** True if the queue contains no elements. */
  get isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /** Return the element with the highest priority without removing it. */
  peek(): T | undefined {
    return this.heap[0];
  }

  /** Insert a new element. */
  push(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Remove and return the element with the highest priority.
   * Returns undefined if the queue is empty.
   */
  pop(): T | undefined {
    if (this.isEmpty) return undefined;

    const top = this.heap[0];
    const last = this.heap.pop()!; // we know there is at least one element

    if (!this.isEmpty) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  /**
   * Replace the top element with a new value and restore the heap.
   * Returns the old top (or undefined if the queue was empty).
   *
   * This is slightly faster than `pop(); push(newItem)`.
   */
  replace(item: T): T | undefined {
    if (this.isEmpty) {
      this.heap[0] = item;
      return undefined;
    }
    const old = this.heap[0];
    this.heap[0] = item;
    this.bubbleDown(0);
    return old;
  }

  /**
   * Remove a specific element (the first one that matches `predicate`).
   * Returns true if an element was removed.
   *
   * Complexity: O(n) to find + O(log n) to restore heap.
   */
  remove(predicate: (value: T) => boolean): boolean {
    const idx = this.heap.findIndex(predicate);
    if (idx === -1) return false;

    const last = this.heap.pop()!;
    if (idx < this.heap.length) {
      this.heap[idx] = last;
      // The new element may need to go up or down.
      this.bubbleUp(idx);
      this.bubbleDown(idx);
    }
    return true;
  }

  /**
   * Decrease (or increase) the priority of an element that satisfies `predicate`.
   * The comparator decides which direction is “higher priority”.
   *
   * Returns true if an element was found and its priority updated.
   *
   * Complexity: O(n) to locate + O(log n) to restore heap.
   */
  updatePriority(
    predicate: (value: T) => boolean,
    newValue: T
  ): boolean {
    const idx = this.heap.findIndex(predicate);
    if (idx === -1) return false;

    this.heap[idx] = newValue;
    this.bubbleUp(idx);
    this.bubbleDown(idx);
    return true;
  }

  /** Iterate over the queue in priority order **without** destroying it. */
  *[Symbol.iterator](): IterableIterator<T> {
    // Clone the heap so we can pop safely.
    const copy = new PriorityQueue<T>(this.compare);
    copy.heap = this.heap.slice(); // shallow copy of the array
    while (!copy.isEmpty) {
      yield copy.pop()!;
    }
  }

  // -------------------------------------------------------------------------
  // Private helpers – heap maintenance
  // -------------------------------------------------------------------------

  /** Move the element at `idx` up until the heap property holds. */
  private bubbleUp(idx: number): void {
    const item = this.heap[idx];
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1; // floor((idx-1)/2)
      const parent = this.heap[parentIdx];
      if (this.compare(item, parent) >= 0) break; // item is not higher priority
      this.heap[idx] = parent; // move parent down
      idx = parentIdx;
    }
    this.heap[idx] = item;
  }

  /** Move the element at `idx` down until the heap property holds. */
  private bubbleDown(idx: number): void {
    const length = this.heap.length;
    const item = this.heap[idx];

    while (true) {
      const leftIdx = idx * 2 + 1;
      const rightIdx = leftIdx + 1;
      let smallestIdx = idx;

      if (
        leftIdx < length &&
        this.compare(this.heap[leftIdx], this.heap[smallestIdx]) < 0
      ) {
        smallestIdx = leftIdx;
      }
      if (
        rightIdx < length &&
        this.compare(this.heap[rightIdx], this.heap[smallestIdx]) < 0
      ) {
        smallestIdx = rightIdx;
      }

      if (smallestIdx === idx) break; // heap property satisfied

      this.heap[idx] = this.heap[smallestIdx];
      idx = smallestIdx;
    }

    this.heap[idx] = item;
  }
}
import { PriorityQueue } from "./PriorityQueue";

const minPQ = new PriorityQueue<number>((a, b) => a - b);

minPQ.push(10);
minPQ.push(4);
minPQ.push(7);
console.log(minPQ.peek()); // 4
console.log(minPQ.pop());  // 4
console.log(minPQ.pop());  // 7
console.log(minPQ.size);   // 1
interface Task {
  id: string;
  priority: number; // higher number = higher priority
}

const maxPQ = new PriorityQueue<Task>((a, b) => b.priority - a.priority);

maxPQ.push({ id: "A", priority: 1 });
maxPQ.push({ id: "B", priority: 5 });
maxPQ.push({ id: "C", priority: 3 });

while (!maxPQ.isEmpty) {
  const t = maxPQ.pop()!;
  console.log(`Running task ${t.id} (priority ${t.priority})`);
}
// Output:
// Running task B (priority 5)
// Running task C (priority 3)
// Running task A (priority 1)
interface Job {
  name: string;
  deadline: Date; // earlier deadline = higher priority
}

const deadlinePQ = new PriorityQueue<Job>((a, b) =>
  a.deadline.getTime() - b.deadline.getTime()
);

deadlinePQ.push({ name: "Job1", deadline: new Date("2025-01-01") });
deadlinePQ.push({ name: "Job2", deadline: new Date("2024-06-15") });
deadlinePQ.push({ name: "Job3", deadline: new Date("2024-12-31") });

console.log(deadlinePQ.pop()?.name); // Job2 (earliest deadline)
interface Vertex {
  id: number;
  dist: number; // distance from source, lower = higher priority
}

const dijkstraPQ = new PriorityQueue<Vertex>((a, b) => a.dist - b.dist);

// Insert all vertices with initial distance = Infinity, except source
for (let i = 0; i < 5; ++i) {
  dijkstraPQ.push({ id: i, dist: i === 0 ? 0 : Infinity });
}

// Later we discover a shorter path to vertex 3:
dijkstraPQ.updatePriority(v => v.id === 3, { id: 3, dist: 7 });
import { PriorityQueue } from "./PriorityQueue";

describe("PriorityQueue (binary heap)", () => {
  test("min‑heap basic operations", () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    expect(pq.isEmpty).toBe(true);
    pq.push(5);
    pq.push(2);
    pq.push(8);
    expect(pq.peek()).toBe(2);
    expect(pq.pop()).toBe(2);
    expect(pq.pop()).toBe(5);
    expect(pq.pop()).toBe(8);
    expect(pq.pop()).toBeUndefined();
  });

  test("max‑heap with objects", () => {
    interface Item { v: number; }
    const pq = new PriorityQueue<Item>((a, b) => b.v - a.v);
    pq.push({ v: 1 });
    pq.push({ v: 10 });
    pq.push({ v: 4 });
    expect(pq.pop()!.v).toBe(10);
    expect(pq.pop()!.v).toBe(4);
    expect(pq.pop()!.v).toBe(1);
  });

  test("replace works", () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    pq.push(9);
    pq.push(3);
    const old = pq.replace(1);
    expect(old).toBe(3);
    expect(pq.pop()).toBe(1);
    expect(pq.pop()).toBe(9);
  });

  test("remove by predicate", () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    pq.push(1);
    pq.push(2);
    pq.push(3);
    const removed = pq.remove(v => v === 2);
    expect(removed).toBe(true);
    expect([...pq]).toEqual([1, 3]); // iterator yields sorted order
  });

  test("iterator does not mutate original", () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    [5, 1, 4].forEach(v => pq.push(v));
    const arr = [...pq]; // consumes copy
    expect(arr).toEqual([1, 4, 5]);
    expect(pq.size).toBe(3); // original still intact
  });
});
constructor(
  private readonly compare: (a: T, b: T) => number,
  items?: Iterable<T>
) {
  if (items) {
    this.heap = Array.from(items);
    // Perform bottom‑up heapify
    for (let i = (this.heap.length >> 1) - 1; i >= 0; i--) {
      this.bubbleDown(i);
    }
  }
}
const pq = new PriorityQueue<number>((a, b) => a - b, [9, 4, 7, 1, 3]);
console.log(pq.pop()); // 1
