// queue.ts
/**
 * A Queue implementation that uses a singly‑linked list under the hood.
 *
 * Time complexities (amortised):
 *   enqueue  – O(1)
 *   dequeue  – O(1)
 *   peek     – O(1)
 *   size     – O(1)
 *
 * The implementation is generic (Queue<T>) and fully typed.
 */

export class Queue<T> implements Iterable<T> {
  /** Internal node type – not exported, so callers cannot depend on it. */
  private class Node {
    public readonly value: T;
    public next: Node | null = null;

    constructor(value: T) {
      this.value = value;
    }
  }

  private head: Node | null = null; // front of the queue (dequeue here)
  private tail: Node | null = null; // back of the queue (enqueue here)
  private _size = 0;                // cached size for O(1) size()
  private readonly _capacity: number | undefined; // optional max size

  /**
   * @param capacity Optional maximum number of elements the queue may hold.
   *                 If omitted the queue is unbounded.
   */
  constructor(capacity?: number) {
    if (capacity !== undefined && (!Number.isInteger(capacity) || capacity < 0)) {
      throw new RangeError('capacity must be a non‑negative integer');
    }
    this._capacity = capacity;
  }

  /** Number of elements currently stored. */
  get size(): number {
    return this._size;
  }

  /** True if the queue contains no elements. */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  /** True if a capacity limit was supplied and the queue is full. */
  get isFull(): boolean {
    return this._capacity !== undefined && this._size >= this._capacity;
  }

  /**
   * Adds a value to the back of the queue.
   * @throws {Error} if the queue has a capacity limit and is already full.
   */
  enqueue(value: T): void {
    if (this.isFull) {
      throw new Error('Queue overflow – capacity reached');
    }

    const node = new this.Node(value);

    if (this.tail) {
      // There is at least one element – link the old tail to the new node.
      this.tail.next = node;
    } else {
      // Queue was empty – new node becomes the head as well.
      this.head = node;
    }

    // In all cases the new node becomes the new tail.
    this.tail = node;
    this._size++;
  }

  /**
   * Removes and returns the value at the front of the queue.
   * @returns The dequeued value.
   * @throws {Error} if the queue is empty.
   */
  dequeue(): T {
    if (this.isEmpty) {
      throw new Error('Queue underflow – cannot dequeue from an empty queue');
    }

    // `head` is guaranteed to be non‑null here.
    const node = this.head!;
    const value = node.value;

    // Move head forward.
    this.head = node.next;

    // If we removed the last element, tail must also become null.
    if (this.head === null) {
      this.tail = null;
    }

    // Help GC – break the link from the removed node.
    node.next = null;

    this._size--;
    return value;
  }

  /**
   * Returns (but does **not** remove) the value at the front of the queue.
   * @throws {Error} if the queue is empty.
   */
  peek(): T {
    if (this.isEmpty) {
      throw new Error('Cannot peek – queue is empty');
    }
    return this.head!.value;
  }

  /**
   * Clears the queue, releasing all node references.
   * After this call the queue behaves like a newly‑constructed one.
   */
  clear(): void {
    // Walk the list and null out each node's `next` to aid GC.
    let cur = this.head;
    while (cur) {
      const nxt = cur.next;
      cur.next = null;
      cur = nxt;
    }
    this.head = this.tail = null;
    this._size = 0;
  }

  /**
   * Returns an iterator that yields the queue's values from front to back.
   * Enables `for (const v of queue) { … }` and spread syntax.
   */
  *[Symbol.iterator](): Iterator<T> {
    let cur = this.head;
    while (cur) {
      yield cur.value;
      cur = cur.next;
    }
  }

  /** Returns a nice string representation – useful for debugging. */
  toString(): string {
    const elems = [...this].map(v => `${v}`);
    return `Queue(${elems.join(' → ')})`;
  }
}

/* -------------------------------------------------------------------------- */
/* -------------------------- Example / Test Suite -------------------------- */
/* -------------------------------------------------------------------------- */

if (require.main === module) {
  // Simple ad‑hoc test when you run `ts-node queue.ts`
  const q = new Queue<number>(5); // capacity 5 (optional)

  console.log('Enqueue 1,2,3');
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  console.log(q.toString()); // Queue(1 → 2 → 3)

  console.log('Peek:', q.peek()); // 1
  console.log('Dequeue:', q.dequeue()); // 1
  console.log('After dequeue:', q.toString()); // Queue(2 → 3)

  console.log('Enqueue 4,5,6 (6 should overflow)');
  q.enqueue(4);
  q.enqueue(5);
  try {
    q.enqueue(6);
  } catch (e) {
    console.error('Expected overflow error →', (e as Error).message);
  }

  console.log('Iterate with for…of:');
  for (const v of q) {
    console.log('  ', v);
  }

  console.log('Clear queue');
  q.clear();
  console.log('Is empty?', q.isEmpty);
}

/* -------------------------------------------------------------------------- */
/* --------------------------- Jest‑style Tests ----------------------------- */
/* -------------------------------------------------------------------------- */

/*
  To run the tests, install jest and ts-jest:

    npm i -D jest ts-jest @types/jest
    npx ts-jest config:init

  Then add a file `queue.test.ts` with the following content:

  import { Queue } from './queue';

  describe('Queue (linked‑list implementation)', () => {
    test('basic enqueue/dequeue', () => {
      const q = new Queue<string>();
      expect(q.isEmpty).toBe(true);
      q.enqueue('a');
      q.enqueue('b');
      expect(q.size).toBe(2);
      expect(q.peek()).toBe('a');
      expect(q.dequeue()).toBe('a');
      expect(q.dequeue()).toBe('b');
      expect(q.isEmpty).toBe(true);
    });

    test('capacity limit', () => {
      const q = new Queue<number>(2);
      q.enqueue(1);
      q.enqueue(2);
      expect(() => q.enqueue(3)).toThrow('Queue overflow');
    });

    test('iteration order', () => {
      const q = new Queue<number>();
      [10, 20, 30].forEach(v => q.enqueue(v));
      expect([...q]).toEqual([10, 20, 30]);
    });

    test('clear works', () => {
      const q = new Queue<number>();
      q.enqueue(1);
      q.enqueue(2);
      q.clear();
      expect(q.isEmpty).toBe(true);
      expect(() => q.dequeue()).toThrow('underflow');
    });
  });
*/

import { Queue } from './queue';

const q = new Queue<string>();   // unbounded queue of strings

q.enqueue('apple');
q.enqueue('banana');
q.enqueue('cherry');

console.log(q.peek());   // → 'apple'
console.log(q.dequeue()); // → 'apple'
console.log(q.size);      // → 2

for (const fruit of q) {
  console.log(fruit);    // 'banana' then 'cherry'
}

q.clear();
console.log(q.isEmpty);  // true
