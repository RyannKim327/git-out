// Queue.ts
export class Node<T> {
  constructor(
    public data: T,
    public next: Node<T> | null = null
  ) {}
}

export class LinkedQueue<T> implements Iterable<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size = 0;

  /** Add an element to the back of the queue. */
  enqueue(value: T): void {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode; // empty queue
    }
    this.tail = newNode;
    this._size++;
  }

  /** Remove and return the front element. */
  dequeue(): T | undefined {
    if (!this.head) return undefined; // queue empty

    const value = this.head.data;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // last item removed
    this._size--;
    return value;
  }

  /** Inspect the front element without removing it. */
  peek(): T | undefined {
    return this.head?.data;
  }

  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  /** Clear all elements. */
  clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }

  /** Make the queue iterable (head → tail). */
  *[Symbol.iterator](): Iterator<T> {
    let curr = this.head;
    while (curr) {
      yield curr.data;
      curr = curr.next;
    }
  }
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("LinkedQueue", () => {
    it("enqueues and dequeues", () => {
      const q = new LinkedQueue<number>();
      q.enqueue(10);
      q.enqueue(20);
      expect(q.dequeue()).toBe(10);
      expect(q.peek()).toBe(20);
      expect(q.size).toBe(1);
    });

    it("is iterable", () => {
      const q = new LinkedQueue<string>();
      q.enqueue("a");
      q.enqueue("b");
      expect([...q]).toEqual(["a", "b"]);
    });
  });
}
