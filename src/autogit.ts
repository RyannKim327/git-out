// Node.ts
export class Node<T> {
  constructor(
    public data: T,
    public next: Node<T> | null = null
  ) {}
}

// LinkedList.ts
export class LinkedList<T> {
  private head: Node<T> | null = null;
  private _size: number = 0;

  /* ---------- Basic helpers ---------- */
  get size(): number { return this._size; }
  isEmpty(): boolean { return this.head === null; }

  /* ---------- Insertion ---------- */
  /** Insert at the front (O(1)) */
  prepend(value: T): void {
    this.head = new Node(value, this.head);
    this._size++;
  }

  /** Insert at the back (O(n)) */
  append(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = newNode;
    }
    this._size++;
  }

  /** Insert at specific index (0-based) */
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this._size) throw new RangeError('Index out of bounds');
    if (index === 0) return this.prepend(value);

    let prev = this.nodeAt(index - 1);
    prev.next = new Node(value, prev.next);
    this._size++;
  }

  /* ---------- Deletion ---------- */
  deleteHead(): T | undefined {
    if (!this.head) return undefined;
    const data = this.head.data;
    this.head = this.head.next;
    this._size--;
    return data;
  }

  deleteTail(): T | undefined {
    if (!this.head) return undefined;
    if (!this.head.next) return this.deleteHead();

    let prev = this.head;
    while (prev.next!.next) prev = prev.next!;
    const data = prev.next!.data;
    prev.next = null;
    this._size--;
    return data;
  }

  /** Delete first occurrence of value (uses ===) */
  delete(value: T): boolean {
    if (!this.head) return false;
    if (this.head.data === value) {
      this.deleteHead();
      return true;
    }

    let prev = this.head;
    let curr = this.head.next;
    while (curr) {
      if (curr.data === value) {
        prev.next = curr.next;
        this._size--;
        return true;
      }
      prev = curr;
      curr = curr.next;
    }
    return false;
  }

  /* ---------- Lookup ---------- */
  indexOf(value: T): number {
    let index = 0;
    let curr = this.head;
    while (curr) {
      if (curr.data === value) return index;
      curr = curr.next;
      index++;
    }
    return -1;
  }

  /** Returns the node at a given index (private helper) */
  private nodeAt(index: number): Node<T> {
    let curr = this.head!;
    for (let i = 0; i < index; i++) curr = curr.next!;
    return curr;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;
    return this.nodeAt(index).data;
  }

  /* ---------- Iteration ---------- */
  *[Symbol.iterator](): Iterator<T> {
    let curr = this.head;
    while (curr) {
      yield curr.data;
      curr = curr.next;
    }
  }

  /* ---------- Utility ---------- */
  toArray(): T[] {
    return [...this];
  }

  clear(): void {
    this.head = null;
    this._size = 0;
  }
}
import { LinkedList } from './LinkedList';

const list = new LinkedList<number>();
list.append(10);
list.append(20);
list.prepend(5);
list.insertAt(2, 15);

console.log([...list]);        // [5, 10, 15, 20]
console.log(list.get(2));      // 15
list.delete(10);
console.log([...list]);        // [5, 15, 20]
