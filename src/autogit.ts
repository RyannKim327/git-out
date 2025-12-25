// queue.ts
export class LinkedQueue<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size = 0;

  /* ---------- public API ---------- */

  /** Add value to the back of the queue. */
  enqueue(value: T): void {
    const node = new Node(value);
    if (this.tail) this.tail.next = node;
    else this.head = node;      // empty list → head = new node
    this.tail = node;
    this._size++;
  }

  /** Remove and return the value at the front of the queue. */
  dequeue(): T | undefined {
    if (!this.head) return undefined; // empty
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;  // queue became empty
    this._size--;
    return value;
  }

  /** Peek at the front value without removing it. */
  peek(): T | undefined {
    return this.head?.value;
  }

  get size(): number { return this._size; }
  get isEmpty(): boolean { return this._size === 0; }

  /** Remove all elements. */
  clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }

  /** Make the queue iterable (front → back). */
  *[Symbol.iterator](): Iterator<T> {
    let curr = this.head;
    while (curr) {
      yield curr.value;
      curr = curr.next;
    }
  }
}

/* ---------- internal node ---------- */
class Node<T> {
  next: Node<T> | null = null;
  constructor(public value: T) {}
}
import { LinkedQueue } from './queue';

const q = new LinkedQueue<number>();
q.enqueue(10);
q.enqueue(20);
console.log(q.dequeue()); // 10
console.log(q.peek());    // 20
console.log([...q]);      // [20]
