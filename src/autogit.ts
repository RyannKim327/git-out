/**
 * Singly‑linked‑list node that holds a generic value and a reference to the next node.
 * The `next` property is `null` for the last element in the list.
 */
class Node<T> {
  constructor(
    public readonly value: T,
    public next: Node<T> | null = null
  ) {}
}

/**
 * Queue implemented with a linked list.
 * Supports enqueue, dequeue, peek, isEmpty and size in constant time.
 */
export class LinkedListQueue<T> {
  /** first node in the queue (front) */
  private head: Node<T> | null = null;
  /** last node in the queue (rear) */
  private tail: Node<T> | null = null;
  /** how many items are currently in the queue */
  private elementCount: number = 0;

  /** Adds an item to the back of the queue */
  enqueue(value: T): void {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;   // link the new node after current tail
    } else {
      this.head = newNode;        // queue was empty – new node is also head
    }
    this.tail = newNode;          // new node becomes the new tail
    this.elementCount++;
  }

  /** Removes and returns the item from the front of the queue. Throws if empty. */
  dequeue(): T {
    if (!this.head) {
      throw new Error("Queue underflow: trying to dequeue from an empty queue.");
    }
    const value = this.head.value;
    this.head = this.head.next;   // advance head pointer

    // If head became null, the queue is now empty; need to drop tail too.
    if (!this.head) {
      this.tail = null;
    }
    this.elementCount--;
    return value;
  }

  /** Returns the item at the front without removing it, or undefined if empty. */
  peek(): T | undefined {
    return this.head?.value;
  }

  /** True when the queue holds no elements. */
  isEmpty(): boolean {
    return this.elementCount === 0;
  }

  /** How many items are currently enqueued. */
  size(): number {
    return this.elementCount;
  }
}
const q = new LinkedListQueue<number>();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.size());   // ➜ 3
console.log(q.peek());   // ➜ 10

console.log(q.dequeue()); // ➜ 10
console.log(q.dequeue()); // ➜ 20

console.log(q.isEmpty()); // ➜ false
console.log(q.dequeue()); // ➜ 30
console.log(q.isEmpty()); // ➜ true
