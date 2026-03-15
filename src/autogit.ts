class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}
export class LinkedListQueue<T> {
  private head: ListNode<T> | null = null; // front
  private tail: ListNode<T> | null = null; // rear
  private _size = 0;

  /** Enqueue the value at the rear */
  enqueue(value: T): void {
    const node = new ListNode(value);

    if (!this.tail) {        // empty queue
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
  }

  /** Dequeue the value at the front */
  dequeue(): T | undefined {
    if (!this.head) return undefined; // empty

    const value = this.head.data;
    this.head = this.head.next;

    if (!this.head) {          // queue became empty
      this.tail = null;
    }

    this._size--;
    return value;
  }

  /** Peek at the front without removing it */
  peek(): T | undefined {
    return this.head?.data;
  }

  /** Current number of elements */
  size(): number {
    return this._size;
  }

  /** Is the queue empty? */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /** Consume the internal list into an array (useful for tests) */
  toArray(): T[] {
    const arr: T[] = [];
    let node = this.head;
    while (node) {
      arr.push(node.data);
      node = node.next;
    }
    return arr;
  }
}
const q = new LinkedListQueue<number>();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.peek());   // 10
console.log(q.dequeue()); // 10
console.log(q.dequeue()); // 20
console.log(q.size());    // 1
console.log(q.isEmpty()); // false

q.dequeue();              // removes 30
console.log(q.isEmpty()); // true
