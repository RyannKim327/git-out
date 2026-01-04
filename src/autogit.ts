// singly‑linked node
export class ListNode<T> {
  /** The stored value */
  public value: T;

  /** Reference to the next node (null if this is the tail) */
  public next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
export class DoublyListNode<T> {
  public value: T;
  public next: DoublyListNode<T> | null = null;
  public prev: DoublyListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
/**
 * A generic singly‑linked list.
 *
 * The list keeps references to its head and tail so that
 * push/prepend are O(1).  Length is tracked for O(1) size queries.
 */
export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;

  /** Number of elements in the list */
  public get size(): number {
    return this._size;
  }

  /** Is the list empty? */
  public get isEmpty(): boolean {
    return this._size === 0;
  }

  /** First element (or null if empty) */
  public get first(): T | null {
    return this.head?.value ?? null;
  }

  /** Last element (or null if empty) */
  public get last(): T | null {
    return this.tail?.value ?? null;
  }

  /** -------------------------------------------------
   *  Insertion helpers
   * ------------------------------------------------- */

  /** Append a value to the end of the list (O(1)) */
  public push(value: T): this {
    const node = new ListNode(value);
    if (!this.head) {
      // empty list → head & tail become the new node
      this.head = this.tail = node;
    } else {
      // non‑empty → attach after tail
      this.tail!.next = node;
      this.tail = node;
    }
    this._size++;
    return this;
  }

  /** Insert a value at the beginning of the list (O(1)) */
  public prepend(value: T): this {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this._size++;
    return this;
  }

  /**
   * Insert `value` after the first node that satisfies `predicate`.
   * Returns true if insertion succeeded, false if no matching node was found.
   */
  public insertAfter(
    predicate: (value: T) => boolean,
    value: T
  ): boolean {
    const target = this.findNode(predicate);
    if (!target) return false;

    const node = new ListNode(value);
    node.next = target.next;
    target.next = node;

    // If we inserted after the tail, update tail reference
    if (target === this.tail) {
      this.tail = node;
    }

    this._size++;
    return true;
  }

  /** -------------------------------------------------
   *  Removal helpers
   * ------------------------------------------------- */

  /** Remove the first node that satisfies `predicate`. Returns the removed value or null. */
  public remove(predicate: (value: T) => boolean): T | null {
    if (!this.head) return null;

    // Special case: head matches
    if (predicate(this.head.value)) {
      const removed = this.head;
      this.head = this.head.next;
      // If we removed the only element, update tail as well
      if (removed === this.tail) this.tail = null;
      this._size--;
      return removed.value;
    }

    // General case: walk the list keeping a reference to the previous node
    let prev = this.head;
    let cur = this.head.next;

    while (cur) {
      if (predicate(cur.value)) {
        prev.next = cur.next;
        // If we removed the tail, update tail reference
        if (cur === this.tail) this.tail = prev;
        this._size--;
        return cur.value;
      }
      prev = cur;
      cur = cur.next;
    }

    return null; // not found
  }

  /** Remove the head node and return its value (O(1)). */
  public shift(): T | null {
    if (!this.head) return null;
    const removed = this.head;
    this.head = this.head.next;
    if (removed === this.tail) this.tail = null;
    this._size--;
    return removed.value;
  }

  /** Remove the tail node and return its value (O(n) for singly‑linked). */
  public pop(): T | null {
    if (!this.tail) return null;
    if (this.head === this.tail) {
      // only one element
      const value = this.tail.value;
      this.head = this.tail = null;
      this._size = 0;
      return value;
    }

    // Walk to the node just before the tail
    let cur = this.head!;
    while (cur.next && cur.next !== this.tail) {
      cur = cur.next;
    }

    const value = this.tail!.value;
    cur.next = null;
    this.tail = cur;
    this._size--;
    return value;
  }

  /** -------------------------------------------------
   *  Search / traversal helpers
   * ------------------------------------------------- */

  /** Find the first node that satisfies `predicate`. Returns the node (or null). */
  private findNode(predicate: (value: T) => boolean): ListNode<T> | null {
    let cur = this.head;
    while (cur) {
      if (predicate(cur.value)) return cur;
      cur = cur.next;
    }
    return null;
  }

  /** Return the first value that satisfies `predicate`, or null if none. */
  public find(predicate: (value: T) => boolean): T | null {
    const node = this.findNode(predicate);
    return node?.value ?? null;
  }

  /** Execute a callback for every element (like Array.prototype.forEach). */
  public forEach(callback: (value: T, index: number) => void): void {
    let cur = this.head;
    let idx = 0;
    while (cur) {
      callback(cur.value, idx);
      cur = cur.next;
      idx++;
    }
  }

  /** Convert the linked list into a plain array (O(n)). */
  public toArray(): T[] {
    const arr: T[] = [];
    this.forEach(v => arr.push(v));
    return arr;
  }

  /** Return a string representation useful for debugging. */
  public toString(): string {
    return `[${this.toArray().join(' -> ')}]`;
  }

  /** -------------------------------------------------
   *  Utility: clear the list
   * ------------------------------------------------- */
  public clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }
}
export class DoublyLinkedList<T> {
  private head: DoublyListNode<T> | null = null;
  private tail: DoublyListNode<T> | null = null;
  private _size = 0;

  public get size(): number { return this._size; }
  public get isEmpty(): boolean { return this._size === 0; }
  public get first(): T | null { return this.head?.value ?? null; }
  public get last(): T | null { return this.tail?.value ?? null; }

  /** Append (O(1)) */
  public push(value: T): this {
    const node = new DoublyListNode(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
    return this;
  }

  /** Prepend (O(1)) */
  public prepend(value: T): this {
    const node = new DoublyListNode(value);
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

  /** Remove a specific node (O(1) once you have the reference) */
  private unlink(node: DoublyListNode<T>): void {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next; // node was head

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev; // node was tail

    node.next = node.prev = null;
    this._size--;
  }

  /** Remove first node that matches predicate (O(n) search, O(1) unlink) */
  public remove(predicate: (value: T) => boolean): T | null {
    let cur = this.head;
    while (cur) {
      if (predicate(cur.value)) {
        this.unlink(cur);
        return cur.value;
      }
      cur = cur.next;
    }
    return null;
  }

  /** Shift (remove head) – O(1) */
  public shift(): T | null {
    if (!this.head) return null;
    const value = this.head.value;
    this.unlink(this.head);
    return value;
  }

  /** Pop (remove tail) – O(1) */
  public pop(): T | null {
    if (!this.tail) return null;
    const value = this.tail.value;
    this.unlink(this.tail);
    return value;
  }

  /** Find first matching value */
  public find(predicate: (value: T) => boolean): T | null {
    let cur = this.head;
    while (cur) {
      if (predicate(cur.value)) return cur.value;
      cur = cur.next;
    }
    return null;
  }

  /** Iterate forward */
  public forEach(cb: (value: T, index: number) => void): void {
    let cur = this.head;
    let i = 0;
    while (cur) {
      cb(cur.value, i++);
      cur = cur.next;
    }
  }

  /** Iterate backward (extra feature) */
  public forEachReverse(cb: (value: T, index: number) => void): void {
    let cur = this.tail;
    let i = this._size - 1;
    while (cur) {
      cb(cur.value, i--);
      cur = cur.prev;
    }
  }

  public toArray(): T[] {
    const arr: T[] = [];
    this.forEach(v => arr.push(v));
    return arr;
  }

  public clear(): void {
    this.head = this.tail = null;
    this._size = 0;
  }

  public toString(): string {
    return `[${this.toArray().join(' <-> ')}]`;
  }
}
import { LinkedList } from './LinkedList';   // or DoublyLinkedList

// A list of numbers
const numbers = new LinkedList<number>();

numbers.push(10).push(20).push(30);
numbers.prepend(5);               // => 5 -> 10 -> 20 -> 30

console.log('size:', numbers.size);          // 4
console.log('first:', numbers.first);        // 5
console.log('last:', numbers.last);          // 30
console.log('as array:', numbers.toArray()); // [5,10,20,30]

// Insert after the first element that is > 10
numbers.insertAfter(v => v > 10, 15);
console.log(numbers.toString()); // [5 -> 10 -> 15 -> 20 -> 30]

// Remove the element equal to 20
numbers.remove(v => v === 20);
console.log(numbers.toString()); // [5 -> 10 -> 15 -> 30]

// Iterate
numbers.forEach((val, idx) => console.log(`#${idx}: ${val}`));
/*
#0: 5
#1: 10
#2: 15
#3: 30
*/

// Pop / shift
console.log('pop:', numbers.pop());   // 30
console.log('shift:', numbers.shift()); // 5
console.log(numbers.toString()); // [10 -> 15]

// Clear everything
numbers.clear();
console.log('empty?', numbers.isEmpty); // true
export class LinkedList<T> implements Iterable<T> {
  // ... (same as before)

  *[Symbol.iterator](): Iterator<T> {
    let cur = this.head;
    while (cur) {
      yield cur.value;
      cur = cur.next;
    }
  }
}

// Usage:
for (const v of numbers) {
  console.log(v);
}
src/
 ├─ ListNode.ts          // export class ListNode<T>
 ├─ DoublyListNode.ts    // export class DoublyListNode<T>
 ├─ LinkedList.ts        // export class LinkedList<T>
 ├─ DoublyLinkedList.ts  // export class DoublyLinkedList<T>
 └─ demo.ts              // the usage demo shown above
tsc -p tsconfig.json   # or just `tsc` if you have a default config
node dist/demo.js
