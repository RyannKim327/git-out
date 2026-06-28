// 1️⃣  Node definition – the “building block” of the list
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// 2️⃣  The linked list itself
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;

  // ---- basic properties ----
  get size() { return this._size; }

  // ---- insertions ----
  push(value: T): void {                  // add to the end
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this._size++;
  }

  unshift(value: T): void {                // add to the front
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this._size++;
  }

  // ---- removals ----
  pop(): T | null {                       // remove from the end
    if (!this.head) return null;
    let current = this.head;
    let prev: ListNode<T> | null = null;

    while (current.next) {
      prev = current;
      current = current.next;
    }

    if (prev) prev.next = null;           // cut off the tail
    else this.head = this.tail = null;    // list became empty

    this._size--;
    return current.value;
  }

  shift(): T | null {                     // remove from the front
    if (!this.head) return null;
    const removed = this.head;
    this.head = removed.next;
    if (!this.head) this.tail = null;     // list became empty
    this._size--;
    return removed.value;
  }

  // ---- traversal helpers ----
  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  forEach(fn: (value: T, index: number) => void): void {
    let current = this.head;
    let i = 0;
    while (current) {
      fn(current.value, i);
      current = current.next;
      i++;
    }
  }
}
const list = new LinkedList<number>();
list.push(1);                // [1]
list.push(2);                // [1, 2]
list.unshift(0);             // [0, 1, 2]
console.log(list.toArray()); // [0, 1, 2]
console.log(list.pop());     // 2
console.log(list.shift());   // 0
console.log(list.toArray()); // [1]
insertAfter(target: T, newVal: T): boolean {
  let current = this.head;
  while (current) {
    if (current.value === target) {
      const node = new ListNode(newVal);
      node.next = current.next;
      current.next = node;
      if (current === this.tail) this.tail = node;
      this._size++;
      return true;
    }
    current = current.next;
  }
  return false;
}
