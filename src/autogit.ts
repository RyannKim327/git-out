// queue.ts
export class Node<T> {
  constructor(
    public data: T,
    public next: Node<T> | null = null
  ) {}
}

export class LinkedQueue<T> implements Iterable<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size = 0;

  constructor(private readonly capacity?: number) {}

  /** Number of stored elements */
  get size(): number {
    return this._size;
  }

  /** `true` when no elements are stored */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  /** Add element to the back.  O(1) */
  enqueue(value: T): void {
    if (this.capacity && this._size >= this.capacity) {
      this.dequeue(); // drop oldest
    }

    const node = new Node(value);

    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node; // first element
    }
    this.tail = node;
    this._size++;
  }

  /** alias for enqueue */
  push(value: T): void {
    this.enqueue(value);
  }

  /** Remove and return front element.  O(1) */
  dequeue(): T | undefined {
    if (!this.head) return undefined;

    const data = this.head.data;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // queue became empty
    this._size--;
    return data;
  }

  /** alias for dequeue */
  shift(): T | undefined {
    return this.dequeue();
  }

  /** Inspect front element without removing it. */
  peek(): T | undefined {
    return this.head?.data;
  }

  /** Clear all elements. */
  clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }

  /** Iterator support: `for (const item of queue) { ... }` */
  *[Symbol.iterator](): Iterator<T> {
    let curr = this.head;
    while (curr) {
      yield curr.data;
      curr = curr.next;
    }
  }

  /** Human-readable string for debugging. */
  toString(): string {
    return `LinkedQueue [${[...this].join(', ')}]`;
  }
}
import { LinkedQueue } from './queue';

const q = new LinkedQueue<string>();
q.enqueue('A');
q.enqueue('B');
console.log(q.dequeue()); // A
console.log(q.peek());      // B
console.log(q.size);        // 1
q.enqueue('C');
for (const item of q) console.log(item); // B C
npm install -g tsx        # fast TypeScript runner
tsx queue.ts
