/**
 * A single node of the linked list.
 * The list is kept in the "next →" direction.
 */
class ListNode<T> {
  public value: T;
  public next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * A queue backed by a linked list.
 * `front` points to the oldest element,
 * `rear` points to the newest one.
 */
export class Queue<T> {
  private front: ListNode<T> | null = null; // head
  private rear: ListNode<T> | null = null;  // tail
  private _size = 0;

  /** Number of items in the queue */
  get size(): number {
    return this._size;
  }

  /** Check if the queue is empty */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  /** Enqueue: add an element to the tail */
  enqueue(value: T): void {
    const node = new ListNode(value);

    if (this.rear) {
      this.rear.next = node;   // hook it after the current tail
    }
    this.rear = node;           // new tail

    if (!this.front) {
      // Queue was empty before, so front must point to the new node too
      this.front = node;
    }

    this._size++;
  }

  /** Dequeue: remove and return the front element, or null if empty */
  dequeue(): T | null {
    if (!this.front) return null;

    const value = this.front.value;
    this.front = this.front.next;  // move head forward

    if (!this.front) {
      // Queue just became empty – clear the tail as well
      this.rear = null;
    }

    this._size--;
    return value;
  }

  /** Peek at the front without removing it */
  peek(): T | null {
    return this.front ? this.front.value : null;
  }

  /** Return an array of all values in order (for debugging / inspection) */
  toArray(): T[] {
    const result: T[] = [];
    let node = this.front;
    while (node) {
      result.push(node.value);
      node = node.next;
    }
    return result;
  }
}
const q = new Queue<number>();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.peek());   // 10
console.log(q.dequeue()); // 10
console.log(q.dequeue()); // 20
console.log(q.size);      // 1
console.log(q.toArray()); // [30]
