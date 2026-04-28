// A single node in a singly linked list
class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

// The queue itself
export class Queue<T> {
  private head: Node<T> | null = null; // front of the queue
  private tail: Node<T> | null = null; // back of the queue
  private _size = 0;

  /** Adds a value to the back of the queue. */
  enqueue(value: T): void {
    const newNode = new Node(value);

    if (this.tail) {
      // Pre‑existing queue – link the new node after the old tail
      this.tail.next = newNode;
    } else {
      // Empty queue – new node becomes the head
      this.head = newNode;
    }

    // In either case, the new node is the new tail
    this.tail = newNode;
    this._size += 1;
  }

  /** Removes and returns the value at the front of the queue. */
  dequeue(): T | undefined {
    if (!this.head) return undefined; // Queue is empty

    const value = this.head.value;
    this.head = this.head.next;   // Advance the head

    // If the queue became empty, clear the tail too
    if (!this.head) this.tail = null;

    this._size -= 1;
    return value;
  }

  /** Peek at the front without removing it. */
  peek(): T | undefined {
    return this.head?.value;
  }

  /** Is the queue empty? */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /** How many items are in the queue? */
  size(): number {
    return this._size;
  }
}
const q = new Queue<number>();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.peek());  // 10
console.log(q.dequeue()); // 10
console.log(q.dequeue()); // 20
console.log(q.size());   // 1
console.log(q.isEmpty()); // false

q.dequeue(); // removes 30

console.log(q.isEmpty()); // true
