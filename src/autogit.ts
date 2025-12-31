/* ---------- Queue.ts ---------- */

export class Node<T> {
  constructor(
    public value: T,
    public next: Node<T> | null = null
  ) {}
}

export class Queue<T> implements Iterable<T> {
  private head: Node<T> | null = null;   // oldest node
  private tail: Node<T> | null = null;   // newest node
  private _size = 0;

  constructor(private maxSize: number = Infinity) {}

  /* ---------- Public API ---------- */

  enqueue(value: T): this {
    const node = new Node(value);

    if (this._size === 0) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      this.tail = node;
    }

    this._size++;
    this.shrinkIfNeeded();
    return this;
  }

  dequeue(): T | undefined {
    if (this._size === 0) return undefined;

    const node = this.head!;
    this.head = node.next;
    this._size--;

    if (this._size === 0) this.tail = null;
    return node.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  get size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }

  /* ---------- Iterable ---------- */
  *[Symbol.iterator](): Iterator<T> {
    let curr = this.head;
    while (curr) {
      yield curr.value;
      curr = curr.next;
    }
  }

  /* ---------- Helpers ---------- */
  private shrinkIfNeeded(): void {
    if (this._size > this.maxSize) this.dequeue();
  }
}

/* ---------- Usage demo ---------- */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe('Queue', () => {
    it('enqueues and dequeues', () => {
      const q = new Queue<number>();
      q.enqueue(1).enqueue(2).enqueue(3);
      expect(q.dequeue()).toBe(1);
      expect(q.dequeue()).toBe(2);
      expect(q.size).toBe(1);
    });

    it('is iterable', () => {
      const q = new Queue<string>();
      q.enqueue('a').enqueue('b');
      expect([...q]).toEqual(['a', 'b']);
    });
  });
}
