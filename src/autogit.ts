// A node that holds the value and the next reference.
// The class is kept private to the list implementation
// – you don’t need to create nodes yourself.
class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}
export class LinkedList<T> {
  // The head points to the first node, tail to the last.
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;

  // Return how many nodes are in the list.
  get size() { return this._size; }

  /* ------------------------------------------------------------------ */
  /*    Building blocks – add / remove at head or tail                 */
  /* ------------------------------------------------------------------ */

  // Add a value to the end of the list.
  push(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {                 // Empty list.
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;         // Link the old tail to new node.
      this.tail = node;               // New node becomes the tail.
    }
    this._size++;
  }

  // Remove and return the last value.
  pop(): T | undefined {
    if (!this.head) return undefined; // Empty list.

    // If we have only one node, reset both head and tail.
    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = this.tail = null;
      this._size--;
      return value;
    }

    // Walk to the node just before the tail.
    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }

    // current is now the new tail.
    const value = this.tail!.value;
    current.next = null;
    this.tail = current;
    this._size--;
    return value;
  }

  // Add a value to the start of the list.
  unshift(value: T): void {
    const node = new ListNode(value, this.head);
    this.head = node;
    if (!this.tail) this.tail = node; // List was empty.
    this._size++;
  }

  // Remove and return the first value.
  shift(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    this._size--;
    if (!this.head) this.tail = null; // List became empty.
    return value;
  }

  /* ------------------------------------------------------------------ */
  /*    Utility helpers                                               */
  /* ------------------------------------------------------------------ */

  // Find the first node whose value satisfies the predicate.
  find(predicate: (value: T) => boolean): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) return current;
      current = current.next;
    }
    return null;
  }

  // Remove the first node that matches the predicate.
  // Returns the removed value or undefined if no match.
  remove(predicate: (value: T) => boolean): T | undefined {
    if (!this.head) return undefined;

    // Special case: the head matches.
    if (predicate(this.head.value)) {
      const removed = this.head.value;
      this.head = this.head.next;
      this._size--;
      if (!this.head) this.tail = null;
      return removed;
    }

    // General case: find the predecessor of the node to delete.
    let prev = this.head;
    while (prev.next && !predicate(prev.next.value)) {
      prev = prev.next;
    }

    if (!prev.next) return undefined; // No match.

    const removed = prev.next.value;
    prev.next = prev.next.next;
    this._size--;

    if (!prev.next) this.tail = prev; // Deleted the tail.
    return removed;
  }

  /* ------------------------------------------------------------------ */
  /*    Traversal & representation                                    */
  /* ------------------------------------------------------------------ */

  // Turn the list into a plain JavaScript array.
  toArray(): T[] {
    const result: T[] = [];
    let cur = this.head;
    while (cur) {
      result.push(cur.value);
      cur = cur.next;
    }
    return result;
  }

  // Stringify for debugging.
  toString(): string {
    return this.toArray().join(' -> ');
  }
}
const ll = new LinkedList<number>();

ll.push(10);       // 10
ll.push(20);       // 10 -> 20
ll.unshift(5);     // 5 -> 10 -> 20
console.log(ll.toString()); // "5 -> 10 -> 20"

console.log(ll.pop());      // 20
console.log(ll.shift());    // 5

ll.remove(x => x === 10);
console.log(ll.toArray());  // []
