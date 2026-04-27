// A minimal node that carries a value and a pointer to the next node.
export class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}
export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;
push(value: T): void {
  const newNode = new ListNode(value);
  if (!this.head) {                // empty list
    this.head = this.tail = newNode;
  } else {
    this.tail!.next = newNode;     // tail is never null here
    this.tail = newNode;
  }
  this._size++;
}
unshift(value: T): void {
  const newNode = new ListNode(value, this.head);
  this.head = newNode;
  if (!this.tail) this.tail = newNode;   // list was empty
  this._size++;
}
pop(): T | null {
  if (!this.head) return null;          // nothing to pop
  let removed: T;
  if (this.head === this.tail) {        // only one element
    removed = this.head.value;
    this.head = this.tail = null;
  } else {
    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }
    removed = this.tail!.value;
    current.next = null;
    this.tail = current;
  }
  this._size--;
  return removed;
}
shift(): T | null {
  if (!this.head) return null;
  const removed = this.head.value;
  this.head = this.head.next;
  if (!this.head) this.tail = null;   // list became empty
  this._size--;
  return removed;
}
find(predicate: (value: T) => boolean): ListNode<T> | null {
  for (let cur = this.head; cur; cur = cur.next) {
    if (predicate(cur.value)) return cur;
  }
  return null;
}
delete(value: T): boolean {
  if (!this.head) return false;

  if (this.head.value === value) {
    this.shift();            // reuse existing logic
    return true;
  }

  let previous = this.head;
  let current = this.head.next;

  while (current) {
    if (current.value === value) {
      previous.next = current.next;
      if (current === this.tail) this.tail = previous;
      this._size--;
      return true;
    }
    previous = current;
    current = current.next;
  }
  return false;
}
size(): number {
  return this._size;
}

isEmpty(): boolean {
  return this._size === 0;
}
forEach(callback: (value: T) => void): void {
  for (let cur = this.head; cur; cur = cur.next) {
    callback(cur.value);
  }
}
*[Symbol.iterator](): Iterator<T> {
  let current = this.head;
  while (current) {
    yield current.value;
    current = current.next;
  }
}
const list = new LinkedList<number>();
list.push(10);
list.push(20);
list.push(30);

for (const n of list) console.log(n); // 10 20 30
import { ListNode, LinkedList } from "./linked-list";

const list = new LinkedList<string>();
list.push("first");
list.push("second");
list.unshift("zero");
console.log(list.size()); // 3

list.delete("second");
console.log([...list]);   // ["zero", "first"]

list.pop();
console.log(list.shift()); // "zero"
