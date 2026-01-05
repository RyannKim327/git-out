/** @internal – not exported, only the list can create nodes */
class ListNode<T> {
  /** The stored value */
  public value: T;
  /** Pointer to the next node (null = end of list) */
  public next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
/**
 * Singly‑linked list.
 *
 * @typeParam T – type of the stored elements.
 *
 * @example
 * const list = new LinkedList<number>();
 * list.push(10);
 * list.push(20);
 * console.log([...list]); // → [10, 20]
 */
export class LinkedList<T> implements Iterable<T> {
  /** First node (head) of the list */
  private head: ListNode<T> | null = null;
  /** Last node (tail) of the list – kept for O(1) push */
  private tail: ListNode<T> | null = null;
  /** Number of elements */
  private _size = 0;

  // -----------------------------------------------------------------
  // 1️⃣  Basic getters
  // -----------------------------------------------------------------
  /** Returns the number of elements in the list */
  get size(): number {
    return this._size;
  }

  /** Returns true if the list contains no elements */
  get isEmpty(): boolean {
    return this._size === 0;
  }

  // -----------------------------------------------------------------
  // 2️⃣  Core mutation methods
  // -----------------------------------------------------------------
  /** Append a value to the end of the list (O(1)) */
  push(value: T): this {
    const node = new ListNode(value);
    if (!this.head) {
      // empty list → head & tail become the new node
      this.head = this.tail = node;
    } else {
      // non‑empty → attach after tail
      (this.tail as ListNode<T>).next = node;
      this.tail = node;
    }
    this._size++;
    return this;
  }

  /** Remove and return the last element (O(n) because we need the predecessor) */
  pop(): T | undefined {
    if (!this.head) return undefined; // empty

    if (this.head === this.tail) {
      // only one element
      const value = this.head.value;
      this.head = this.tail = null;
      this._size = 0;
      return value;
    }

    // walk to the node just before tail
    let prev = this.head;
    while (prev.next && prev.next !== this.tail) {
      prev = prev.next;
    }

    const value = (this.tail as ListNode<T>).value;
    prev.next = null;
    this.tail = prev;
    this._size--;
    return value;
  }

  /** Insert a value at the front (O(1)) */
  unshift(value: T): this {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    if (!this.tail) this.tail = node; // first element added
    this._size++;
    return this;
  }

  /** Remove and return the first element (O(1)) */
  shift(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // list became empty
    this._size--;
    return value;
  }

  /** Insert `value` at a specific zero‑based index (O(n)) */
  insert(index: number, value: T): boolean {
    if (index < 0 || index > this._size) return false;
    if (index === 0) {
      this.unshift(value);
      return true;
    }
    if (index === this._size) {
      this.push(value);
      return true;
    }

    const node = new ListNode(value);
    const prev = this._nodeAt(index - 1);
    if (!prev) return false; // should never happen because of bounds check
    node.next = prev.next;
    prev.next = node;
    this._size++;
    return true;
  }

  /** Remove the element at `index` and return its value (O(n)) */
  remove(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;
    if (index === 0) return this.shift();
    if (index === this._size - 1) return this.pop();

    const prev = this._nodeAt(index - 1);
    if (!prev || !prev.next) return undefined;
    const removed = prev.next;
    prev.next = removed.next;
    this._size--;
    return removed.value;
  }

  // -----------------------------------------------------------------
  // 3️⃣  Random‑access helpers (O(n))
  // -----------------------------------------------------------------
  /** Return the node at a given index (private helper) */
  private _nodeAt(index: number): ListNode<T> | null {
    if (index < 0 || index >= this._size) return null;
    let cur = this.head;
    for (let i = 0; i < index && cur; i++) {
      cur = cur.next;
    }
    return cur ?? null;
  }

  /** Get the value at `index` (O(n)) */
  get(index: number): T | undefined {
    return this._nodeAt(index)?.value;
  }

  /** Replace the value at `index` (O(n)) */
  set(index: number, newValue: T): boolean {
    const node = this._nodeAt(index);
    if (!node) return false;
    node.value = newValue;
    return true;
  }

  // -----------------------------------------------------------------
  // 4️⃣  Search helpers
  // -----------------------------------------------------------------
  /** Return the first index of `value` (=== comparison) */
  indexOf(value: T): number {
    let cur = this.head;
    let idx = 0;
    while (cur) {
      if (cur.value === value) return idx;
      cur = cur.next;
      idx++;
    }
    return -1;
  }

  /** True if the list contains `value` */
  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  // -----------------------------------------------------------------
  // 5️⃣  Utility
  // -----------------------------------------------------------------
  /** Remove all elements – O(1) (garbage collector does the rest) */
  clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }

  /** Convert the list to a native array (O(n)) */
  toArray(): T[] {
    const arr: T[] = [];
    for (const v of this) arr.push(v);
    return arr;
  }

  /** Default iterator – enables `for…of` */
  *[Symbol.iterator](): Iterator<T> {
    let cur = this.head;
    while (cur) {
      yield cur.value;
      cur = cur.next;
    }
  }

  // -----------------------------------------------------------------
  // 6️⃣  Debug / pretty‑print
  // -----------------------------------------------------------------
  /** Returns a string like `LinkedList[1 → 2 → 3]` */
  toString(): string {
    return `LinkedList[${[...this].join(' → ')}]`;
  }
}
import { LinkedList } from './LinkedList';

// 1️⃣  Create a list of numbers
const nums = new LinkedList<number>();
nums.push(10).push(20).push(30);
console.log(nums.toString()); // LinkedList[10 → 20 → 30]

// 2️⃣  Random access
console.log(nums.get(1)); // 20
nums.set(1, 25);
console.log(nums.get(1)); // 25

// 3️⃣  Insert / remove at arbitrary positions
nums.insert(1, 15); // → 10, 15, 25, 30
console.log(nums.toArray()); // [10, 15, 25, 30]

nums.remove(2); // removes 25
console.log([...nums]); // [10, 15, 30]

// 4️⃣  Head / tail ops
nums.unshift(5); // → 5, 10, 15, 30
console.log(nums.shift()); // 5
console.log(nums.pop());   // 30

// 5️⃣  Search
console.log(nums.contains(15)); // true
console.log(nums.indexOf(15));  // 1

// 6️⃣  Clear
nums.clear();
console.log(nums.isEmpty); // true
class DNode<T> {
  public value: T;
  public next: DNode<T> | null = null;
  public prev: DNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Doubly‑linked list – same public API as LinkedList<T>.
 */
export class DoublyLinkedList<T> implements Iterable<T> {
  private head: DNode<T> | null = null;
  private tail: DNode<T> | null = null;
  private _size = 0;

  get size(): number { return this._size; }
  get isEmpty(): boolean { return this._size === 0; }

  // ---- push / pop -------------------------------------------------
  push(value: T): this {
    const node = new DNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      (this.tail as DNode<T>).next = node;
      this.tail = node;
    }
    this._size++;
    return this;
  }

  pop(): T | undefined {
    if (!this.tail) return undefined;
    const value = this.tail.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      (this.tail as DNode<T>).next = null;
    }
    this._size--;
    return value;
  }

  // ---- unshift / shift --------------------------------------------
  unshift(value: T): this {
    const node = new DNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this._size++;
    return this;
  }

  shift(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      (this.head as DNode<T>).prev = null;
    }
    this._size--;
    return value;
  }

  // ---- internal node lookup (same as singly) ----------------------
  private _nodeAt(index: number): DNode<T> | null {
    if (index < 0 || index >= this._size) return null;
    // Choose direction based on proximity to head/tail
    let cur: DNode<T> | null;
    if (index < this._size / 2) {
      cur = this.head;
      for (let i = 0; i < index && cur; i++) cur = cur.next;
    } else {
      cur = this.tail;
      for (let i = this._size - 1; i > index && cur; i--) cur = cur.prev;
    }
    return cur;
  }

  // ---- insert / remove (now O(1) once node is found) -------------
  insert(index: number, value: T): boolean {
    if (index < 0 || index > this._size) return false;
    if (index === 0) { this.unshift(value); return true; }
    if (index === this._size) { this.push(value); return true; }

    const next = this._nodeAt(index);
    if (!next) return false;
    const prev = next.prev!;
    const node = new DNode(value);
    node.prev = prev;
    node.next = next;
    prev.next = node;
    next.prev = node;
    this._size++;
    return true;
  }

  remove(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;
    if (index === 0) return this.shift();
    if (index === this._size - 1) return this.pop();

    const node = this._nodeAt(index);
    if (!node) return undefined;
    const prev = node.prev!;
    const next = node.next!;
    prev.next = next;
    next.prev = prev;
    this._size--;
    return node.value;
  }

  // ---- read/write -------------------------------------------------
  get(index: number): T | undefined {
    return this._nodeAt(index)?.value;
  }
  set(index: number, v: T): boolean {
    const node = this._nodeAt(index);
    if (!node) return false;
    node.value = v;
    return true;
  }

  // ---- search -----------------------------------------------------
  indexOf(value: T): number {
    let cur = this.head;
    let i = 0;
    while (cur) {
      if (cur.value === value) return i;
      cur = cur.next;
      i++;
    }
    return -1;
  }
  contains(v: T): boolean { return this.indexOf(v) !== -1; }

  // ---- misc --------------------------------------------------------
  clear(): void { this.head = this.tail = null; this._size = 0; }
  toArray(): T[] { return [...this]; }

  *[Symbol.iterator](): Iterator<T> {
    let cur = this.head;
    while (cur) {
      yield cur.value;
      cur = cur.next;
    }
  }

  toString(): string { return `DoublyLinkedList[${[...this].join(' ↔ ')}]`; }
}
// linkedlist.test.ts
import { LinkedList } from './LinkedList';

describe('LinkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  test('push & iteration', () => {
    list.push(1).push(2).push(3);
    expect([...list]).toEqual([1, 2, 3]);
    expect(list.size).toBe(3);
  });

  test('unshift & shift', () => {
    list.unshift(5);
    list.unshift(4);
    expect(list.shift()).toBe(4);
    expect(list.shift()).toBe(5);
    expect(list.shift()).toBeUndefined();
  });

  test('insert & remove', () => {
    list.push(10).push(20).push(30);
    expect(list.insert(1, 15)).toBeTruthy();
    expect([...list]).toEqual([10, 15, 20, 30]);
    expect(list.remove(2)).toBe(20);
    expect([...list]).toEqual([10, 15, 30]);
  });

  test('get / set', () => {
    list.push(100);
    expect(list.get(0)).toBe(100);
    expect(list.set(0, 200)).toBeTruthy();
    expect(list.get(0)).toBe(200);
  });

  test('clear', () => {
    list.push(1).push(2);
    list.clear();
    expect(list.isEmpty).toBeTruthy();
    expect(list.size).toBe(0);
  });
});
