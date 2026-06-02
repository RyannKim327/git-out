/**
 * A binary‑heap priority queue.
 *
 * @template T  The type of the elements in the queue.
 *
 * @example
 * // min‑heap
 * const pq = new PriorityQueue<number>((a, b) => a - b);
 * pq.add(5); pq.add(2); pq.add(8);
 * console.log(pq.extract()); // 2
 *
 * // max‑heap (reverse the comparator)
 * const pqMax = new PriorityQueue<number>((a, b) => b - a);
 */
export class PriorityQueue<T> {
  /** The underlying array that stores the heap. */
  private items: T[] = [];

  /**
   * @param compare Comparator: `a < b` returns a negative value,
   *                `a === b` returns zero,
   *                `a > b` returns a positive value.
   *                Pass `a - b` for numbers, `b - a` for a max‑heap of numbers,
   *                or a custom comparator for objects.
   */
  constructor(private compare: (a: T, b: T) => number) {}

  /** Number of elements in the queue. */
  size(): number { return this.items.length; }

  /** Whether the queue is empty. */
  isEmpty(): boolean { return this.items.length === 0; }

  /** Return the highest‑priority element without removing it. */
  peek(): T | undefined { return this.items[0]; }

  /** Insert a new element. */
  add(element: T): void {
    this.items.push(element);
    this.siftUp(this.items.length - 1);
  }

  /** Remove and return the element with the highest priority. */
  extract(): T | undefined {
    if (this.isEmpty()) return undefined;
    const root = this.items[0];
    const last = this.items.pop()!;
    if (!this.isEmpty()) {
      this.items[0] = last;
      this.siftDown(0);
    }
    return root;
  }

  /* ---- Internals ---- */

  /** Move a node up until the heap property holds. */
  private siftUp(idx: number): void {
    let childIdx = idx;
    while (childIdx > 0) {
      const parentIdx = Math.floor((childIdx - 1) / 2);
      if (this.compare(this.items[childIdx], this.items[parentIdx]) < 0) {
        this.swap(childIdx, parentIdx);
        childIdx = parentIdx;
      } else break;
    }
  }

  /** Move a node down until the heap property holds. */
  private siftDown(idx: number): void {
    const lastIdx = this.items.length - 1;
    let parentIdx = idx;

    while (true) {
      const leftIdx = parentIdx * 2 + 1;
      const rightIdx = parentIdx * 2 + 2;
      let smallestIdx = parentIdx;

      if (leftIdx <= lastIdx &&
          this.compare(this.items[leftIdx], this.items[smallestIdx]) < 0) {
        smallestIdx = leftIdx;
      }
      if (rightIdx <= lastIdx &&
          this.compare(this.items[rightIdx], this.items[smallestIdx]) < 0) {
        smallestIdx = rightIdx;
      }

      if (smallestIdx !== parentIdx) {
        this.swap(parentIdx, smallestIdx);
        parentIdx = smallestIdx;
      } else break;
    }
  }

  /** Swap two indices in the array. */
  private swap(i: number, j: number): void {
    const tmp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = tmp;
  }
}
// Min‑heap of numbers
const minQ = new PriorityQueue<number>((a, b) => a - b);
minQ.add(10);
minQ.add(3);
minQ.add(7);
console.log(minQ.extract()); // 3
console.log(minQ.extract()); // 7
console.log(minQ.extract()); // 10

// Max‑heap of strings by length
const maxStr = new PriorityQueue<string>((a, b) => b.length - a.length);
maxStr.add("short");
maxStr.add("tiny");
maxStr.add("extraordinarilylong");
console.log(maxStr.extract()); // "extraordinarilylong"
