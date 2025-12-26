// linked-list.ts
class Node<T> {
  constructor(
    public data: T,
    public next: Node<T> | null = null
  ) {}
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private _length = 0;

  /* ---------- Basic helpers ---------- */
  get length(): number { return this._length; }
  isEmpty(): boolean { return this.head === null; }

  /* ---------- Insertion ---------- */
  /** Add to the front O(1) */
  prepend(value: T): void {
    this.head = new Node(value, this.head);
    this._length++;
  }

  /** Add to the back O(n) */
  append(value: T): void {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this._length++;
  }

  /** Insert value at specific index (0-based). O(min(n, idx)) */
  insert(value: T, index: number): boolean {
    if (index < 0 || index > this._length) return false;
    if (index === 0) { this.prepend(value); return true; }

    let prev = this.nodeAt(index - 1)!;
    prev.next = new Node(value, prev.next);
    this._length++;
    return true;
  }

  /* ---------- Deletion ---------- */
  /** Delete first node whose data === value (uses ===). O(n) */
  delete(value: T): boolean {
    if (!this.head) return false;
    if (this.head.data === value) {
      this.head = this.head.next;
      this._length--;
      return true;
    }
    let curr: Node<T> = this.head;
    while (curr.next && curr.next.data !== value) {
      curr = curr.next;
    }
    if (curr.next) {               // found it
      curr.next = curr.next.next;
      this._length--;
      return true;
    }
    return false;                  // not found
  }

  /** Delete node at index. O(min(n, idx)) */
  deleteAt(index: number): T | undefined {
    if (index < 0 || index >= this._length) return undefined;
    if (index === 0) {
      const val = this.head!.data;
      this.head = this.head!.next;
      this._length--;
      return val;
    }
    const prev = this.nodeAt(index - 1)!;
    const victim = prev.next!;
    prev.next = victim.next;
    this._length--;
    return victim.data;
  }

  /* ---------- Search ---------- */
  /** Return first node whose data === value, or null. O(n) */
  find(value: T): Node<T> | null {
    for (let curr = this.head; curr; curr = curr.next) {
      if (curr.data === value) return curr;
    }
    return null;
  }

  /** Return element at index (0-based), or undefined. O(n) */
  at(index: number): T | undefined {
    const node = this.nodeAt(index);
    return node?.data;
  }

  /* ---------- Iterator ---------- */
  *[Symbol.iterator](): Iterator<T> {
    for (let curr = this.head; curr; curr = curr.next) {
      yield curr.data;
    }
  }

  /* ---------- Internal helpers ---------- */
  private nodeAt(index: number): Node<T> | null {
    if (index < 0 || index >= this._length) return null;
    let curr = this.head!;
    for (let i = 0; i < index; i++) curr = curr.next!;
    return curr;
  }

  /* ---------- Debug ---------- */
  toString(): string {
    return [...this].join(' -> ') || 'empty';
  }
}

/* ---------- Quick demo ---------- */
if (import.meta.url === `file://${process.argv[1]}`) {
  const list = new LinkedList<number>();
  [1, 2, 3].forEach(n => list.append(n));
  list.prepend(0);
  list.insert(99, 2);
  console.log('List:', list.toString());      // 0 -> 1 -> 99 -> 2 -> 3
  console.log('Length:', list.length);        // 5
  list.delete(99);
  console.log('After delete 99:', list.toString());
  console.log('Element at 2:', list.at(2));   // 2
}
npm i -g ts-node typescript
ts-node linked-list.ts
