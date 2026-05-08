class LinkedList<T> implements Iterable<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private length = 0;

  push(value: T): void { /* … */ }
  pop(): T | undefined { /* … */ }
  unshift(value: T): void { /* … */ }
  shift(): T | undefined { /* … */ }
  get(index: number): T | undefined { /* … */ }
  set(index: number, value: T): boolean { /* … */ }
  insert(index: number, value: T): boolean { /* … */ }
  remove(index: number): T | undefined { /* … */ }
  clear(): void { /* … */ }
  toArray(): T[] { /* … */ }

  [Symbol.iterator](): Iterator<T> { /* … */ }
}
// Simple singly‑linked node
class Node<T> {
  constructor(
    public readonly value: T,
    public next: Node<T> | null = null
  ) {}
}
class LinkedList<T> implements Iterable<T> {
  private head: Node<T> | null = null; // first node
  private tail: Node<T> | null = null; // last
  private length = 0;
}
constructor(iterable?: Iterable<T>) {
  if (iterable) {
    for (const item of iterable) this.push(item);
  }
}
private _getNode(index: number): Node<T> | null {
  if (index < 0 || index >= this.length) return null;
  let curr = this.head;
  for (let i = 0; i < index; i++) curr = curr!.next;
  return curr;
}
push(value: T): void {
  const node = new Node(value);
  if (!this.head) {            // first item
    this.head = this.tail = node;
  } else {
    this.tail!.next = node;    // append
    this.tail = node;
  }
  this.length++;
}
pop(): T | undefined {
  if (!this.head) return undefined;

  const lastVal = this.tail!.value;

  if (this.head === this.tail) {    // only one node
    this.head = this.tail = null;
  } else {
    // find the node before tail
    let curr = this.head;
    while (curr.next !== this.tail) curr = curr.next!;
    curr.next = null;
    this.tail = curr;
  }

  this.length--;
  return lastVal;
}
unshift(value: T): void {
  const node = new Node(value, this.head);
  this.head = node;
  if (!this.tail) this.tail = node; // list was empty
  this.length++;
}
shift(): T | undefined {
  if (!this.head) return undefined;
  const val = this.head.value;
  this.head = this.head.next;
  if (!this.head) this.tail = null; // list became empty
  this.length--;
  return val;
}
get(index: number): T | undefined {
  const node = this._getNode(index);
  return node ? node.value : undefined;
}
set(index: number, value: T): boolean {
  const node = this._getNode(index);
  if (!node) return false;
  node.value = value;
  return true;
}
insert(index: number, value: T): boolean {
  if (index < 0 || index > this.length) return false;
  if (index === 0) return (this.unshift(value), true);
  if (index === this.length) return (this.push(value), true);

  const prev = this._getNode(index - 1)!;
  const node = new Node(value,
