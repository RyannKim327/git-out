// A single node in the list
class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

// The queue itself
export class LinkedListQueue<T> {
  // Keep refs to both ends so that enqueue/dequeue stay constant‑time
  private head: Node<T> | null = null; // points to first element
  private tail: Node<T> | null = null; // points to last element
  private _size = 0;

  /** Adds a value to the back of the queue */
  enqueue(value: T): void {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;   // link the old tail to the new node
      this.tail = newNode;        // new node becomes the new tail
    } else {
      // Queue was empty – head and tail are the same node now
      this.head = this.tail = newNode;
    }
    this._size++;
  }

  /** Removes and returns the value from the front of the queue.
      Throws an error if the queue is empty. */
  dequeue(): T {
    if (!this.head) {
      throw new Error('Cannot dequeue from an empty queue');
    }
    const value = this.head.value;
    this.head = this.head.next; // move head forward
    if (!this.head) {
      // Queue became empty, so tail must also be null
      this.tail = null;
    }
    this._size--;
    return value;
  }

  /** Peeks at the front value without removing it. */
  peek(): T | null {
    return this.head?.value ?? null;
  }

  /** Returns true if the queue contains no elements. */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /** Current number of elements */
  size(): number {
    return this._size;
  }
}
import { LinkedListQueue } from './LinkedListQueue';

const q = new LinkedListQueue<number>();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.peek());   // 10
console.log(q.dequeue()); // 10
console.log(q.dequeue()); // 20
console.log(q.size());    // 1
console.log(q.isEmpty()); // false

q.dequeue();          // removes 30
console.log(q.isEmpty()); // true
