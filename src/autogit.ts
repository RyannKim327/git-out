// ------------------------------------------------------------
// 1️⃣  Node definition
// ------------------------------------------------------------
class Node<T> {
  /** The stored value */
  public value: T;
  /** Reference to the next node (null = end of list) */
  public next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// ------------------------------------------------------------
// 2️⃣  LinkedList implementation
// ------------------------------------------------------------
export class LinkedList<T> implements Iterable<T> {
  private head: Node<T> | null = null;   // first element
  private tail: Node<T> | null = null;   // last element
  private _length = 0;                   // cached size

  // --------------------------------------------------------
  // Public read‑only properties
  // --------------------------------------------------------
  get length(): number {
    return this._length;
  }

  get isEmpty(): boolean {
    return this._length === 0;
  }

  // --------------------------------------------------------
  // Core mutating operations
  // --------------------------------------------------------

  /** Append a value to the end of the list */
  push(value: T): this {
    const node = new Node(value);
    if (!this.head) {
      // List was empty → head & tail become the new node
      this.head = this.tail = node;
    } else {
      // Attach after current tail
      (this.tail as Node<T>).next = node;
      this.tail = node;
    }
    this._length++;
    return this;
  }

  /** Remove and return the last element (O(n) for singly list) */
  pop(): T | undefined {
    if (!this.head) return undefined; // empty

    if (this.head === this.tail) {
      // Only one element
      const value = this.head.value;
      this.head = this.tail = null;
      this._length = 0;
      return value;
    }

    // Walk to the node just before tail
    let prev = this.head;
    while (prev.next && prev.next !== this.tail) {
      prev = prev.next;
    }

    const value = (this.tail as Node<T>).value;
    prev.next = null;
    this.tail = prev;
    this._length--;
    return value;
  }

  /** Insert a value at the beginning of the list */
  unshift(value: T): this {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this._length++;
    return this;
  }

  /** Remove and return the first element */
  shift(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // list became empty
    this._length--;
    return value;
  }

  /** Insert `value` at a specific index (0‑based) */
  insert(index: number, value: T): boolean {
    if (index < 0 || index > this._length) return false;
    if (index === 0) {
      this.unshift(value);
      return true;
    }
    if (index === this._length) {
      this.push(value);
      return true;
    }

    const node = new Node(value);
    const prev = this._nodeAt(index - 1)!; // guaranteed non‑null
    node.next = prev.next;
    prev.next = node;
    this._length++;
    return true;
  }

  /** Remove the node at `index` and return its value */
  remove(index: number): T | undefined {
    if (index < 0 || index >= this._length) return undefined;
    if (index === 0) return this.shift();
    if (index === this._length - 1) return this.pop();

    const prev = this._nodeAt(index - 1)!;
    const target = prev.next!;
    prev.next = target.next;
    this._length--;
    return target.value;
  }

  // --------------------------------------------------------
  // Accessors / queries
  // --------------------------------------------------------

  /** Return the node at `index` (private helper) */
  private _nodeAt(index: number): Node<T> | null {
    if (index < 0 || index >= this._length) return null;
    let cur = this.head;
    for (let i = 0; i < index; i++) {
      cur = cur!.next;
    }
    return cur;
  }

  /** Get the value at `index` (or undefined if out of bounds) */
  get(index: number): T | undefined {
    return this._nodeAt(index)?.value;
  }

  /** Replace the value at `index` and return the old value */
  set(index: number, newValue: T): T | undefined {
    const node = this._nodeAt(index);
    if (!node) return undefined;
    const old = node.value;
    node.value = newValue;
    return old;
  }

  /** Find the first index whose value satisfies `predicate` */
  findIndex(predicate: (value: T, index: number) => boolean): number {
    let cur = this.head;
    let i = 0;
    while (cur) {
      if (predicate(cur.value, i)) return i;
      cur = cur.next;
      i++;
    }
    return -1;
  }

  /** Return true if any element satisfies `predicate` */
  some(predicate: (value: T, index: number) => boolean): boolean {
    return this.findIndex(predicate) !== -1;
  }

  /** Return true if every element satisfies `predicate` */
  every(predicate: (value: T, index: number) => boolean): boolean {
    let cur = this.head;
    let i = 0;
    while (cur) {
      if (!predicate(cur.value, i)) return false;
      cur = cur.next;
      i++;
    }
    return true;
  }

  // --------------------------------------------------------
  // Utility / traversal
  // --------------------------------------------------------

  /** Execute `callback` for each element (like Array.prototype.forEach) */
  forEach(callback: (value: T, index: number) => void): void {
    let cur = this.head;
    let i = 0;
    while (cur) {
      callback(cur.value, i);
      cur = cur.next;
      i++;
    }
  }

  /** Convert the linked list into a plain array */
  toArray(): T[] {
    const arr: T[] = [];
    this.forEach(v => arr.push(v));
    return arr;
  }

  /** Return a string representation (useful for debugging) */
  toString(): string {
    return `[${this.toArray().join(', ')}]`;
  }

  // --------------------------------------------------------
  // Iterable protocol – enables `for (const v of list) { … }`
  // --------------------------------------------------------
  *[Symbol.iterator](): Iterator<T> {
    let cur = this.head;
    while (cur) {
      yield cur.value;
      cur = cur.next;
    }
  }
}
import { LinkedList } from './LinkedList';

// 1️⃣  Create a list of numbers
const nums = new LinkedList<number>();
nums.push(10).push(20).push(30);
console.log(nums.toString()); // [10, 20, 30]

// 2️⃣  Insert / remove at arbitrary positions
nums.insert(1, 15);   // → [10, 15, 20, 30]
nums.remove(2);       // removes 20 → [10, 15, 30]

// 3️⃣  Random access
console.log(nums.get(0)); // 10
nums.set(0, 5);
console.log(nums.get(0)); // 5

// 4️⃣  Traversal with for…of
for (const n of nums) {
  console.log('value:', n);
}

// 5️⃣  Convert to a plain array
const arr = nums.toArray(); // [5, 15, 30]

// 6️⃣  Find an element
const idx = nums.findIndex(v => v > 10); // 1 (value 15)
console.log('first >10 at index', idx);
class DNode<T> extends Node<T> {
  public prev: DNode<T> | null = null;
}
import { map, filter, reduce } from 'lodash'; // or your own helpers

const doubled = Array.from(nums).map(x => x * 2);
map<U>(fn: (v: T, i: number) => U): LinkedList<U> {
  const out = new LinkedList<U>();
  this.forEach((v, i) => out.push(fn(v, i)));
  return out;
}
class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

export class LinkedList<T> implements Iterable<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size = 0;

  get length() { return this._size; }

  push(v: T) {
    const n = new Node(v);
    if (!this.head) this.head = this.tail = n;
    else { (this.tail as Node<T>).next = n; this.tail = n; }
    this._size++;
    return this;
  }

  shift(): T | undefined {
    if (!this.head) return undefined;
    const v = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this._size--;
    return v;
  }

  *[Symbol.iterator](): Iterator<T> {
    let cur = this.head;
    while (cur) { yield cur.value; cur = cur.next; }
  }
}
