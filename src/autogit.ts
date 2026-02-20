class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;

  get size() { return this._size; }
}
append(value: T): void {
  const newNode = new ListNode(value);

  if (!this.head) {          // empty list
    this.head = this.tail = newNode;
  } else {
    if (this.tail) this.tail.next = newNode;
    this.tail = newNode;
  }

  this._size++;
}
prepend(value: T): void {
  const newNode = new ListNode(value, this.head);
  this.head = newNode;

  if (!this.tail) this.tail = newNode;
  this._size++;
}
remove(index: number): T | null {
  if (index < 0 || index >= this._size) return null;

  let current = this.head;
  let prev: ListNode<T> | null = null;
  let i = 0;

  while (current && i < index) {
    prev = current;
    current = current.next;
    i++;
  }

  if (!current) return null;

  if (prev) prev.next = current.next;
  else this.head = current.next;      // removed head

  if (current === this.tail) this.tail = prev;
  this._size--;
  return current.value;
}
find(value: T): number {
  let current = this.head;
  let index = 0;

  while (current) {
    if (current.value === value) return index;
    current = current.next;
    index++;
  }
  return -1;  // not found
}
toArray(): T[] {
  const result: T[] = [];
  let current = this.head;
  while (current) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}
const list = new LinkedList<number>();

list.append(10);
list.append(20);
list.prepend(5);

console.log(list.toArray());     // [5, 10, 20]
console.log(list.find(10));      // 1
console.log(list.remove(0));     // 5
console.log(list.toArray());     // [10, 20]
