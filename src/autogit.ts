/** A node in a singly‑linked list */
class ListNode<T> {
  /** The stored value */
  public value: T;
  /** Reference to the next node (null if this is the tail) */
  public next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
/**
 * Queue implemented with a singly‑linked list.
 *
 * The list maintains two pointers:
 *   - `head` points to the front of the queue (where we dequeue)
 *   - `tail` points to the back of the queue (where we enqueue)
 *
 * All operations are O(1).
 */
export class Queue<T> {
  /** First node (front of the queue) */
  private head: ListNode<T> | null = null;
  /** Last node (back of the queue) */
  private tail: ListNode<T> | null = null;
  /** Number of elements currently stored */
  private _size = 0;

  /** Returns the number of items in the queue */
  public get size(): number {
    return this._size;
  }

  /** Returns true if the queue contains no elements */
  public get isEmpty(): boolean {
    return this._size === 0;
  }

  /** Look at the element at the front without removing it */
  public peek(): T | undefined {
    return this.head?.value;
  }

  /**
   * Add a new element to the back of the queue.
   *
   * @param value The value to enqueue
   */
  public enqueue(value: T): void {
    const node = new ListNode(value);

    if (this.tail) {
      // There is at least one element – link the new node after the tail
      this.tail.next = node;
    } else {
      // Queue was empty, so head also points to the new node
      this.head = node;
    }

    // In any case, the new node becomes the new tail
    this.tail = node;
    this._size++;
  }

  /**
   * Remove and return the element at the front of the queue.
   *
   * @returns The dequeued value, or `undefined` if the queue is empty.
   */
  public dequeue(): T | undefined {
    if (!this.head) {
      // Empty queue
      return undefined;
    }

    const value = this.head.value;
    this.head = this.head.next; // Move head forward

    // If we removed the last element, tail must also become null
    if (!this.head) {
      this.tail = null;
    }

    this._size--;
    return value;
  }

  /** Iterate over the queue from front to back (read‑only) */
  public *[Symbol.iterator](): IterableIterator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  /** Convert the queue to a plain array (useful for debugging) */
  public toArray(): T[] {
    return [...this];
  }

  /** Clear all elements from the queue */
  public clear(): void {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }
}
import { Queue } from "./Queue"; // adjust the import path as needed

// Queue of numbers
const q = new Queue<number>();

console.log(q.isEmpty); // true

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.peek());   // 10
console.log(q.size);     // 3

console.log(q.dequeue()); // 10
console.log(q.dequeue()); // 20

console.log(q.toArray()); // [30]

q.enqueue(40);
q.enqueue(50);

for (const val of q) {
  console.log(val); // 30, 40, 50 (in order)
}

q.clear();
console.log(q.isEmpty); // true
