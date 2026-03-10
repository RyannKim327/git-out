// Node.ts
export class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
// LinkedList.ts
import { ListNode } from "./Node";

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _length = 0;

  get length() {
    return this._length;
  }

  /* ---------- Basic Operations ---------- */

  // Append a value to the end of the list.
  push(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this._length++;
  }

  // Prepend a value to the beginning of the list.
  unshift(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this._length++;
  }

  // Remove and return the value at the head of the list.
  shift(): T | null {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // list became empty
    this._length--;
    return value;
  }

  // Remove and return the value at the tail of the list.
  pop(): T | null {
    if (!this.head) return null;

    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = this.tail = null;
      this._length--;
      return value;
    }

    // Walk to the node just before the tail.
    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }
    const value = this.tail!.value;
    current.next = null;
    this.tail = current;
    this._length--;
    return value;
  }

  /* ---------- Traversal & Search ---------- */

  // Return the node at the given zero‑based index, or null if out of bounds.
  getNodeAt(index: number): ListNode<T> | null {
    if (index < 0 || index >= this._length) return null;
    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current;
  }

  // Find the first value that satisfies the predicate.
  find(predicate: (value: T) => boolean, startIndex = 0): T | null {
    let current = this.getNodeAt(startIndex);
    while (current) {
      if (predicate(current.value)) return current.value;
      current = current.next;
    }
    return null;
  }

  /* ---------- Utility ---------- */

  // Convert the list to an array (useful for debugging or interoperability).
  toArray(): T[] {
    const out: T[] = [];
    let current = this.head;
    while (current) {
      out.push(current.value);
      current = current.next;
    }
    return out;
  }

  // Allow for… e.g. “for … of” iteration.
  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next: () => ({
        value: current?.value,
        done: current === null,
      }),
    };
  }
}
import { LinkedList } from "./LinkedList";

const numbers = new LinkedList<number>();
numbers.push(10);
numbers.push(20);
numbers.unshift(5);   // list is now 5 -> 10 -> 20

console.log(numbers.shift()); // 5
console.log(numbers.pop());   // 20
console.log(numbers.length);  // 1

// Search
numbers.push(30);
numbers.push(40);
console.log(numbers.find(v => v > 15)); // 20

// Iterate
for (const n of numbers) {
  console.log(n); // 10, 30, 40
}
