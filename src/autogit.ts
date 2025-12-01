// queue.ts
export class Node<T> {
  constructor(
    public data: T,
    public next: Node<T> | null = null
  ) {}
}

export class LinkedQueue<T> implements Iterable<T> {
  private head: Node<T> | null = null; // oldest node
  private tail: Node<T> | null = null; // newest node
  private _size = 0;

  /** Add an element to the back of the queue. */
  enqueue(item: T): this {
    const node = new Node(item);
    if (this._size === 0) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this._size++;
    return this;
  }

  /** Remove and return the front element. Throws if empty. */
  dequeue(): T {
    if (this._size === 0) throw new Error('Queue underflow');
    const node = this.head!;
    this.head = node.next;
    this._size--;
    if (this._size === 0) this.tail = null;
    return node.data;
  }

  /** Return front element without removing it. */
  peek(): T | undefined {
    return this.head?.data;
  }

  get size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  /** Clear all elements in O(1). */
  clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }

  /** Make the queue iterable (front → back). */
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
  const { describe, it, expect } = import.meta.vitest;

  describe('LinkedQueue', () => {
    it('works', () => {
      const q = new LinkedQueue<number>();
      q.enqueue(1).enqueue(2).enqueue(3);
      expect(q.dequeue()).toBe(1);
      expect(q.peek()).toBe(2);
      expect([...q]).toEqual([2, 3]);
      expect(q.size).toBe(2);
      q.clear();
      expect(q.isEmpty()).toBe(true);
    });
  });
}
npm add -D typescript vitest
npx tsc queue.ts --module esnext --target es2022 --moduleResolution node
npx vitest run queue.ts
