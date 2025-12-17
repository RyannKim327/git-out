// queue.ts
export class Node<T> {
  constructor(
    public data: T,
    public next: Node<T> | null = null
  ) {}
}

export class LinkedQueue<T> {
  private head: Node<T> | null = null; // oldest node
  private tail: Node<T> | null = null; // newest node
  private _size = 0;

  /* Add to the back */
  enqueue(item: T): void {
    const node = new Node(item);
    if (this.tail) this.tail.next = node;
    else this.head = node;          // first element
    this.tail = node;
    this._size++;
  }

  /* Remove and return the front element */
  dequeue(): T | undefined {
    if (!this.head) return undefined;
    const data = this.head.data;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // queue became empty
    this._size--;
    return data;
  }

  /* Peek without removing */
  peek(): T | undefined {
    return this.head?.data;
  }

  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  /* Optional: make it iterable */
  *[Symbol.iterator](): Iterator<T> {
    let cur = this.head;
    while (cur) {
      yield cur.data;
      cur = cur.next;
    }
  }
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('queue operations', () => {
    const q = new LinkedQueue<number>();
    expect(q.isEmpty).toBe(true);

    q.enqueue(10);
    q.enqueue(20);
    expect(q.size).toBe(2);
    expect(q.peek()).toBe(10);

    expect(q.dequeue()).toBe(10);
    expect(q.dequeue()).toBe(20);
    expect(q.dequeue()).toBeUndefined();
    expect(q.isEmpty).toBe(true);
  });
}
npm i -D vitest
npx vitest queue.ts
