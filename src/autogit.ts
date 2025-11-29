// list.ts
class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private _size: number = 0;

  /* ---------- Basic helpers ---------- */

  get size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  /* ---------- Insertion ---------- */

  /** Add to front. O(1) */
  addFirst(value: T): void {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this._size++;
  }

  /** Add to back. O(n)  (could be O(1) if we kept a tail pointer) */
  addLast(value: T): void {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this._size++;
  }

  /** Insert at specific index. O(min(index, n-index)) */
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this._size)
      throw new RangeError('Index out of bounds');

    if (index === 0) return this.addFirst(value);

    let prev = this.getNode(index - 1);
    const node = new Node(value);
    node.next = prev.next;
    prev.next = node;
    this._size++;
  }

  /* ---------- Deletion ---------- */

  /** Remove first occurrence of value. O(n) */
  remove(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      this._size--;
      return true;
    }

    let prev = this.head;
    while (prev.next && prev.next.value !== value) prev = prev.next;

    if (prev.next) {
      prev.next = prev.next.next;
      this._size--;
      return true;
    }
    return false;
  }

  /** Remove node at index. O(min(index, n-index)) */
  removeAt(index: number): T {
    if (index < 0 || index >= this._size)
      throw new RangeError('Index out of bounds');

    if (index === 0) {
      const val = this.head!.value;
      this.head = this.head!.next;
      this._size--;
      return val;
    }

    const prev = this.getNode(index - 1);
    const target = prev.next!;
    prev.next = target.next;
    this._size--;
    return target.value;
  }

  /* ---------- Lookup ---------- */

  /** Return first index of value or -1. O(n) */
  indexOf(value: T): number {
    let idx = 0;
    for (const v of this) {
      if (v === value) return idx;
      idx++;
    }
    return -1;
  }

  /** Get value at index. O(min(index, n-index)) */
  get(index: number): T {
    return this.getNode(index).value;
  }

  /* ---------- Iterator ---------- */

  *[Symbol.iterator](): IterableIterator<T> {
    let curr = this.head;
    while (curr) {
      yield curr.value;
      curr = curr.next;
    }
  }

  /* ---------- Private ---------- */

  /** Return node at index (not value). O(min(index, n-index)) */
  private getNode(index: number): Node<T> {
    if (index < 0 || index >= this._size)
      throw new RangeError('Index out of bounds');

    let curr = this.head!;
    for (let i = 0; i < index; i++) curr = curr.next!;
    return curr;
  }
}

/* ---------- Quick demo ---------- */
if (require.main === module) {
  const list = new LinkedList<number>();
  [10, 20, 30].forEach(v => list.addLast(v));
  list.addFirst(5);
  list.insertAt(2, 15);
  console.log('List:', [...list]); // 5 10 15 20 30
  console.log('Size:', list.size); // 5
  list.remove(20);
  console.log('After removing 20:', [...list]); // 5 10 15 30
  console.log('Index of 15:', list.indexOf(15)); // 2
  console.log('Value at 1:', list.get(1)); // 10
}
npm install -g typescript  # one-time
tsc list.ts
node list.js
