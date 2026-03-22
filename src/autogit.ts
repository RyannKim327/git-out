// 1️⃣  Node definition
class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

// 2️⃣  Queue skeleton
class LinkedQueue<T> {
  private head: Node<T> | null = null; // front of the queue
  private tail: Node<T> | null = null; // rear of the queue
  private _size = 0;

  // 3️⃣  Enqueue: add to the tail
  enqueue(value: T): void {
    const newNode = new Node(value);
    if (this.tail) {             // queue is not empty
      this.tail.next = newNode;
    } else {                      // queue was empty ‑ new node is both head & tail
      this.head = newNode;
    }
    this.tail = newNode;
    this._size++;
  }

  // 4️⃣  Dequeue: remove from the head
  dequeue(): T | undefined {
    if (!this.head) return undefined; // nothing to pop

    const removed = this.head.value;
    this.head = this.head.next;       // advance head
    if (!this.head) this.tail = null; // queue became empty

    this._size--;
    return removed;
  }

  // 5️⃣  Peek at the front without removing
  peek(): T | undefined {
    return this.head?.value;
  }

  // 6️⃣  Convenience helpers
  size(): number   { return this._size; }
  isEmpty(): boolean { return this._size === 0; }
}
const q = new LinkedQueue<number>();

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log(q.peek());   // 10
console.log(q.dequeue()); // 10
console.log(q.dequeue()); // 20
console.log(q.dequeue()); // 30
console.log(q.dequeue()); // undefined (empty)
console.log(q.isEmpty()); // true
