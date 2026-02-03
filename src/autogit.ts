class ListNode<T> {
  /** The value stored in this node */
  value: T;

  /** Reference to the next node, or null if this is the tail */
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
class LinkedList<T> {
  /** Head (first node) – `null` if the list is empty */
  private head: ListNode<T> | null = null;

  /** Tail (last node) – kept for efficient push; `null` if the list is empty */
  private tail: ListNode<T> | null = null;

  /** Current length – handy for O(1) size queries */
  private _size = 0;

  /** Number of elements in the list */
  get size() { return this._size; }
  get isEmpty() { return this._size === 0; }
}
  /** Append an element to the end of the list */
  push(value: T): void {
    const node = new ListNode(value);
    if (this.tail) {
      this.tail.next = node;
    } else {          // empty list – new node is both head and tail
      this.head = node;
    }
    this.tail = node;
    this._size++;
  }

  /** Prepend an element to the front of the list */
  unshift(value: T): void {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    if (!this.tail) this.tail = node;  // first element
    this._size++;
  }

  /** Remove and return the first element, or `undefined` if the list is empty */
  shift(): T | undefined {
    if (!this.head) return undefined;
    const removed = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;  // list became empty
    this._size--;
    return removed;
  }

  /** Remove and return the last element, or `undefined` if the list is empty */
  pop(): T | undefined {
    if (!this.head) return undefined;
    if (this.head === this.tail) {     // single element
      const val = this.head.value;
      this.head = this.tail = null;
      this._size = 0;
      return val;
    }

    // Walk to the second‑to‑last node
    let current = this.head;
    while (current.next && current.next !== this.tail) {
      current = current.next;
    }

    const val = this.tail!.value;
    current.next = null;
    this.tail = current;
    this._size--;
    return val;
  }
  /** Find the first node whose value satisfies the predicate; returns `undefined` if none */
  find(p: (value: T) => boolean): T | undefined {
    let curr = this.head;
    while (curr) {
      if (p(curr.value)) return curr.value;
      curr = curr.next;
    }
    return undefined;
  }

  /** Iterate over values (supports `for…of`) */
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
const list = new LinkedList<number>();
for (const n of list) console.log(n);
const list = new LinkedList<string>();

list.push('first');
list.push('second');
list.unshift('zeroth');

console.log([...list]);          // ["zeroth", "first", "second"]

console.log(list.shift());       // "zeroth"
console.log(list.pop());         // "second"

console.log(list.find(n => n.startsWith('f'))); // "first"
