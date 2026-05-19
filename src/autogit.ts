// A node holding one element and a pointer to the next node.
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

// A generic linked list that knows the head and tail and its size.
export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;

  /* Basic introspection ------------------------------------ */

  get size()          { return this._size; }
  get isEmpty()       { return this._size === 0; }

  /* -----------------------------------------------------------------
   * Mutating operations
   * ----------------------------------------------------------------- */

  // Add to the end (O(1)).
  push(val: T): void {
    const node = new ListNode(val);
    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {               // list was empty
      this.head = this.tail = node;
    }
    this._size++;
  }

  // Remove from the end (O(n) – we walk to the previous node).
  pop(): T | undefined {
    if (!this.head) return undefined;
    if (this.head === this.tail) {      // one element
      const val = this.head.value;
      this.head = this.tail = null;
      this._size = 0;
      return val;
    }
    // walk to the node just before tail
    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }
    const val = this.tail!.value;
    current.next = null;
    this.tail = current;
    this._size--;
    return val;
  }

  // Add to the front (O(1)).
  unshift(val: T): void {
    const node = new ListNode(val, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    this._size++;
  }

  // Remove from the front (O(1)).
  shift(): T | undefined {
    if (!this.head) return undefined;
    const val = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // list became empty
    this._size--;
    return val;
  }

  // Insert after a given node (O(1)).  Handy for external use.
  insertAfter(node: ListNode<T>, val: T): ListNode<T> {
    const nodeToInsert = new ListNode(val, node.next);
    node.next = nodeToInsert;
    if (node === this.tail) this.tail = nodeToInsert;
    this._size++;
    return nodeToInsert;
  }

  // Remove the *first* occurrence of a value (O(n)).
  remove(val: T): boolean {
    if (!this.head) return false;

    // deleting head
    if (this.head.value === val) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this._size--;
      return true;
    }

    // walk until we find the predecessor
    let prev = this.head;
    while (prev.next && prev.next.value !== val) {
      prev = prev.next;
    }

    if (!prev.next) return false; // not found

    // patch over the node we’re deleting
    prev.next = prev.next.next;
    if (prev.next === null) this.tail = prev;
    this._size--;
    return true;
  }

  /* -----------------------------------------------------------------
   * Utility helpers
   * ----------------------------------------------------------------- */

  // Return an array of all values. (Useful for tests/printing)
  toArray(): T[] {
    const arr: T[] = [];
    for (const v of this) arr.push(v);
    return arr;
  }

  // Find first node with a given value.
  find(val: T): ListNode<T> | null {
    for (let node of this.iterate()) {
      if (node.value === val) return node;
    }
    return null;
  }

  /* -----------------------------------------------------------------
   * Iteration
   * ----------------------------------------------------------------- */

  // Forward iterator (ES6).
  * [Symbol.iterator](): Generator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  // Iterable over nodes if you need more than just the value.
  * iterate(): Generator<ListNode<T>> {
    let current = this.head;
    while (current) {
      yield current;
      current = current.next;
    }
  }
}
import { LinkedList } from "./LinkedList";

const list = new LinkedList<number>();

list.push(3);          // -> 3
list.push(5);          // -> 3 → 5
list.unshift(1);       // -> 1 → 3 → 5

console.log(list.toArray()); // [1, 3, 5]

list.remove(3);          // remove middle element
console.log(list.toArray()); // [1, 5]

console.log(list.pop()); // 5, list is now [1]
console.log(list.shift()); // 1, list is empty
