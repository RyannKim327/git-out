// ---------------------------------------------------
// Queue implemented with a singly linked list
// ---------------------------------------------------
class Queue<T> {
  // ------- internal node type -------
  private static class Node<U> {
    constructor(public value: U, public next?: Queue.Node<U>) {}
  }

  // ------- private fields -------
  private head?: typeof Queue.Node<any>; // points to the first element
  private tail?: typeof Queue.Node<any>; // points to the last element
  private _size = 0;

  // ------- public methods -------

  /** Insert a new element at the tail. */
  enqueue(value: T): void {
    const newNode = new Queue.Node(value);
    if (!this.tail) {
      // The queue is empty.
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  /** Remove and return the element at the head. */
  dequeue(): T | undefined {
    if (!this.head) return undefined;          // empty queue
    const removed = this.head.value;           // capture value
    this.head = this.head.next;                // advance head
    if (!this.head) this.tail = undefined;     // became empty
    this._size--;
    return removed;
  }

  /** Peek at the head without removing it. */
  peek(): T | undefined {
    return this.head?.value;
  }

  /** Number of items currently in the queue. */
  size(): number {
    return this._size;
  }

  /** Is the queue empty? */
  isEmpty(): boolean {
    return this._size === 0;
  }

  // Optional: allow `for..of` iteration over the queue
  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if (!current) return { done: true, value: undefined };
        const value = current.value;
        current = current.next;
        return { done: false, value };
      },
    };
  }
}
const q = new Queue<number>();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.peek()); // 10
console.log(q.dequeue()); // 10
console.log([...q]); // [20, 30]
