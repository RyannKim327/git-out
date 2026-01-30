// Node type – each element points to the next one
class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

// The queue itself
class LinkedListQueue<T> {
  private head: ListNode<T> | null = null; // dequeue from here
  private tail: ListNode<T> | null = null; // enqueue at here
  private _size: number = 0;

  /** Add an item to the back of the queue */
  enqueue(value: T): void {
    const newNode = new ListNode(value);
    if (this.tail) {
      this.tail.next = newNode;   // link the old tail to the new node
    } else {
      // Empty queue – head and tail both point to the new node
      this.head = newNode;
    }
    this.tail = newNode;
    this._size++;
  }

  /** Remove and return the item from the front of the queue.
      Returns undefined if the queue is empty. */
  dequeue(): T | undefined {
    if (!this.head) return undefined;

    const value = this.head.value;
    this.head = this.head.next;          // move head forward
    if (!this.head) this.tail = null;    // queue became empty
    this._size--;
    return value;
  }

  /** Peek at the front without removing it. */
  peek(): T | undefined {
    return this.head?.value;
  }

  /** Number of items in the queue */
  get size(): number {
    return this._size;
  }

  /** Is the queue empty? */
  isEmpty(): boolean {
    return this.size === 0;
  }
}
const q = new LinkedListQueue<number>();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.peek()); // 10
console.log(q.dequeue()); // 10
console.log(q.dequeue()); // 20
console.log(q.isEmpty()); // false
console.log(q.dequeue()); // 30
console.log(q.isEmpty()); // true
