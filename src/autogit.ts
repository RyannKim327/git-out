/* A node that lives inside the queue */
class QueueNode<T> {
  constructor(
    public value: T,
    public next: QueueNode<T> | null = null
  ) {}
}

/* The queue itself */
export class LinkedListQueue<T> {
  // We keep pointers to both ends so that both enqueue
  // (push) and dequeue (pop) stay O(1).
  private head: QueueNode<T> | null = null; // front of the queue
  private tail: QueueNode<T> | null = null; // rear of the queue
  private _size = 0;

  /** Insert a new value at the rear. */
  enqueue(value: T): void {
    const node = new QueueNode(value);

    if (this.tail) {
      // The queue already has at least one element
      this.tail.next = node;
      this.tail = node;
    } else {
      // Empty queue: head and tail become the new node
      this.head = this.tail = node;
    }

    this._size++;
  }

  /** Remove and return the value at the front. */
  dequeue(): T | undefined {
    if (!this.head) return undefined; // Empty queue

    const value = this.head.value;
    this.head = this.head.next;

    // If we just removed the last element, clear the tail too
    if (!this.head) {
      this.tail = null;
    }

    this._size--;
    return value;
  }

  /** Peek at the front value without removing it. */
  peek(): T | undefined {
    return this.head ? this.head.value : undefined;
  }

  /** Number of elements currently in the queue. */
  get size(): number {
    return this._size;
  }

  /** Are there any elements? */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  /** Remove everything from the queue. */
  clear(): void {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }
}
const queue = new LinkedListQueue<number>();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.peek()); // 1
console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
console.log(queue.size); // 1

queue.enqueue(4);
console.log(queue.dequeue()); // 3
console.log(queue.dequeue()); // 4
console.log(queue.isEmpty); // true
