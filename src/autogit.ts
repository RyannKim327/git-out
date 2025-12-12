type Comparator<T> = (a: T, b: T) => number;
// < 0  → a has higher priority (should be before b)
// = 0  → equal priority
// > 0  → b has higher priority
/**
 * A generic priority queue implemented with a binary heap.
 *
 * @template T  The type of the stored elements.
 */
export class PriorityQueue<T> {
  /** Internal array that holds the heap. */
  private heap: T[] = [];

  /** Comparator that decides the ordering. */
  private readonly compare: Comparator<T>;

  /**
   * @param compareFn  Function that returns a negative number if a should be
   *                   placed before b, zero if equal, positive otherwise.
   *                   For a min‑heap you can use (a, b) => a - b (numbers)
   *                   or (a, b) => a.priority - b.priority (objects).
   */
  constructor(compareFn: Comparator<T>) {
    this.compare = compareFn;
  }

  /** --------------------------------------------------------------
   *  Public API
   * -------------------------------------------------------------- */

  /** Number of elements in the queue. */
  get size(): number {
    return this.heap.length;
  }

  /** Returns true if the queue contains no elements. */
  get isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /** Look at the element with the highest priority without removing it. */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Insert a new element.
   *
   * @param value The element to insert.
   */
  push(value: T): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Remove and return the element with the highest priority.
   *
   * @returns The removed element, or undefined if the queue is empty.
   */
  pop(): T | undefined {
    if (this.isEmpty) return undefined;

    const root = this.heap[0];
    const last = this.heap.pop()!; // non‑empty, safe

    if (!this.isEmpty) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return root;
  }

  /**
   * Remove a specific element (linear‑time). Useful for cancel‑tasks, etc.
   *
   * @param predicate Function that returns true for the element to delete.
   * @returns true if an element was removed.
   */
  remove(predicate: (item: T) => boolean): boolean {
    const idx = this.heap.findIndex(predicate);
    if (idx === -1) return false;

    const last = this.heap.pop()!;
    if (idx < this.heap.length) {
      this.heap[idx] = last;
      // Try both directions because we don't know if the new element is larger or smaller.
      this.bubbleUp(idx);
      this.bubbleDown(idx);
    }
    return true;
  }

  /** --------------------------------------------------------------
   *  Private helpers
   * -------------------------------------------------------------- */

  /** Move the element at `idx` up until the heap property holds. */
  private bubbleUp(idx: number): void {
    let childIdx = idx;
    const element = this.heap[childIdx];

    while (childIdx > 0) {
      const parentIdx = (childIdx - 1) >> 1; // same as Math.floor((childIdx-1)/2)
      const parent = this.heap[parentIdx];

      // If element has higher priority than parent, stop.
      if (this.compare(element, parent) >= 0) break;

      // Otherwise swap with parent.
      this.heap[parentIdx] = element;
      this.heap[childIdx] = parent;
      childIdx = parentIdx;
    }
  }

  /** Move the element at `idx` down until the heap property holds. */
  private bubbleDown(idx: number): void {
    const length = this.heap.length;
    const element = this.heap[idx];
    let parentIdx = idx;

    while (true) {
      const leftIdx = (parentIdx << 1) + 1; // 2*parentIdx + 1
      const rightIdx = leftIdx + 1;
      let smallestIdx = parentIdx;

      if (leftIdx < length && this.compare(this.heap[leftIdx], this.heap[smallestIdx]) < 0) {
        smallestIdx = leftIdx;
      }
      if (rightIdx < length && this.compare(this.heap[rightIdx], this.heap[smallestIdx]) < 0) {
        smallestIdx = rightIdx;
      }

      // If parent is already the smallest, we are done.
      if (smallestIdx === parentIdx) break;

      // Swap parent with the smaller child.
      this.heap[parentIdx] = this.heap[smallestIdx];
      this.heap[smallestIdx] = element;
      parentIdx = smallestIdx;
    }
  }

  /** --------------------------------------------------------------
   *  Utility static factories (nice ergonomics)
   * -------------------------------------------------------------- */

  /**
   * Create a min‑heap priority queue for numbers.
   *
   * @example
   * const pq = PriorityQueue.minNumber();
   * pq.push(5); pq.push(2); pq.pop(); // → 2
   */
  static minNumber(): PriorityQueue<number> {
    return new PriorityQueue<number>((a, b) => a - b);
  }

  /**
   * Create a max‑heap priority queue for numbers.
   */
  static maxNumber(): PriorityQueue<number> {
    return new PriorityQueue<number>((a, b) => b - a);
  }

  /**
   * Create a min‑heap for objects that expose a `priority` numeric field.
   *
   * @example
   * interface Task { id: string; priority: number; }
   * const pq = PriorityQueue.minBy<Task>(t => t.priority);
   */
  static minBy<U>(keyFn: (item: U) => number): PriorityQueue<U> {
    return new PriorityQueue<U>((a, b) => keyFn(a) - keyFn(b));
  }

  /**
   * Create a max‑heap for objects that expose a `priority` numeric field.
   */
  static maxBy<U>(keyFn: (item: U) => number): PriorityQueue<U> {
    return new PriorityQueue<U>((a, b) => keyFn(b) - keyFn(a));
  }
}
import { PriorityQueue } from "./PriorityQueue";

const pq = PriorityQueue.minNumber();

pq.push(10);
pq.push(4);
pq.push(7);

console.log(pq.peek()); // 4
console.log(pq.pop());  // 4
console.log(pq.pop());  // 7
console.log(pq.pop());  // 10
console.log(pq.isEmpty); // true
const maxPQ = PriorityQueue.maxNumber();
maxPQ.push(1);
maxPQ.push(9);
maxPQ.push(3);
console.log(maxPQ.pop()); // 9
interface Task {
  id: string;
  priority: number; // lower number = higher priority
  payload: any;
}

// Min‑heap (lowest `priority` first)
const taskQueue = PriorityQueue.minBy<Task>(t => t.priority);

taskQueue.push({ id: "a", priority: 5, payload: "A" });
taskQueue.push({ id: "b", priority: 2, payload: "B" });
taskQueue.push({ id: "c", priority: 8, payload: "C" });

console.log(taskQueue.pop()?.id); // "b"
console.log(taskQueue.pop()?.id); // "a"
taskQueue.remove(t => t.id === "c"); // true, element removed
console.log(taskQueue.size); // 0
import { PriorityQueue } from "./PriorityQueue";

describe("PriorityQueue (binary heap)", () => {
  test("min‑number works", () => {
    const pq = PriorityQueue.minNumber();
    [5, 1, 3, 4, 2].forEach(v => pq.push(v));

    const result = [];
    while (!pq.isEmpty) result.push(pq.pop()!);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("max‑number works", () => {
    const pq = PriorityQueue.maxNumber();
    [5, 1, 3, 4, 2].forEach(v => pq.push(v));

    const result = [];
    while (!pq.isEmpty) result.push(pq.pop()!);
    expect(result).toEqual([5, 4, 3, 2, 1]);
  });

  test("custom object ordering", () => {
    interface Item { id: string; weight: number; }
    const pq = PriorityQueue.minBy<Item>(i => i.weight);
    pq.push({ id: "a", weight: 10 });
    pq.push({ id: "b", weight: 5 });
    pq.push({ id: "c", weight: 7 });

    expect(pq.pop()?.id).toBe("b");
    expect(pq.pop()?.id).toBe("c");
    expect(pq.pop()?.id).toBe("a");
  });

  test("remove works", () => {
    const pq = PriorityQueue.minNumber();
    [1, 2, 3].forEach(v => pq.push(v));
    expect(pq.remove(x => x === 2)).toBe(true);
    expect(pq.size).toBe(2);
    expect(pq.pop()).toBe(1);
    expect(pq.pop()).toBe(3);
  });
});
npm i -D jest ts-jest @types/jest
npx jest
interface StableItem<T> {
  value: T;
  priority: number;
  seq: number; // auto‑incremented
}

// In the comparator:
(a, b) => {
  const diff = a.priority - b.priority;
  return diff !== 0 ? diff : a.seq - b.seq;
}
// priority-queue.ts
export class PriorityQueue<T> {
  private heap: T[] = [];
  constructor(private compare: (a: T, b: T) => number) {}

  get size() { return this.heap.length; }
  get isEmpty() { return this.heap.length === 0; }
  peek() { return this.heap[0]; }

  push(v: T) {
    this.heap.push(v);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.isEmpty) return undefined;
    const root = this.heap[0];
    const last = this.heap.pop()!;
    if (!this.isEmpty) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return root;
  }

  private bubbleUp(i: number) {
    const el = this.heap[i];
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(el, this.heap[p]) >= 0) break;
      this.heap[i] = this.heap[p];
      i = p;
    }
    this.heap[i] = el;
  }

  private bubbleDown(i: number) {
    const n = this.heap.length;
    const el = this.heap[i];
    while (true) {
      const l = i * 2 + 1;
      const r = l + 1;
      let smallest = i;

      if (l < n && this.compare(this.heap[l], this.heap[smallest]) < 0) smallest = l;
      if (r < n && this.compare(this.heap[r], this.heap[smallest]) < 0) smallest = r;
      if (smallest === i) break;

      this.heap[i] = this.heap[smallest];
      i = smallest;
    }
    this.heap[i] = el;
  }

  // static helpers
  static minNumber() { return new PriorityQueue<number>((a, b) => a - b); }
  static maxNumber() { return new PriorityQueue<number>((a, b) => b - a); }
}
// usage.ts
import { PriorityQueue } from "./priority-queue";

const pq = PriorityQueue.minNumber();
pq.push(7);
pq.push(3);
pq.push(5);
console.log(pq.pop()); // 3
