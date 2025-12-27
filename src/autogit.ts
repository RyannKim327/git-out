// Node used by the queue
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

export class LinkedListQueue<T> {
  private head: ListNode<T> | null = null; // front of the queue
  private tail: ListNode<T> | null = null; // back of the queue
  private _size: number = 0;

  // Add to the back
  enqueue(value: T): void {
    const node: ListNode<T> = { value, next: null };
    if (this.tail === null) {
      // empty queue
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
  }

  // Remove from the front
  dequeue(): T | null {
    if (this.head === null) return null;

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head === null) {
      // queue became empty
      this.tail = null;
    }

    this._size--;
    return value;
  }

  // Look at the front without removing
  peek(): T | null {
    return this.head?.value ?? null;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  size(): number {
    return this._size;
  }

  // Optional utility: convert to an array (helps with debugging)
  toArray(): T[] {
    const out: T[] = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }

  // Optional: make the queue iterable
  *[Symbol.iterator](): IterableIterator<T> {
    let cur = this.head;
    while (cur) {
      yield cur.value;
      cur = cur.next;
    }
  }

  // Optional: clear the queue
  clear(): void {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }
}
const q = new LinkedListQueue<number>();
q.enqueue(10);
q.enqueue(20);
console.log(q.dequeue()); // 10
console.log(q.peek());    // 20
console.log([...q]);        // [20]
