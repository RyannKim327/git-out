class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;

  get size() { return this._size; }
  push(value: T) {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = this.tail = node;        // first element
    } else {
      this.tail!.next = node;              // trick the tail
      this.tail = node;                    // and move it
    }
    this._size++;
  }
  unshift(value: T) {
    const node = new ListNode(value, this.head);
    this.head = node;
    if (!this.tail) this.tail = node; // when list was empty
    this._size++;
  }
  pop(): T | null {
    if (!this.head) return null;

    let removedValue: T | null = null;

    // If we only have one node
    if (this.head === this.tail) {
      removedValue = this.head.value;
      this.head = this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next!;
      }
      removedValue = this.tail!.value;
      current.next = null;
      this.tail = current;
    }

    this._size--;
    return removedValue;
  }
  find(predicate: (value: T) => boolean): T | null {
    let current = this.head;
    while (current) {
      if (predicate(current.value)) return current.value;
      current = current.next;
    }
    return null;
  }
  *[Symbol.iterator](): Generator<T, void, unknown> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
const list = new LinkedList<number>();

list.push(10);
list.push(20);
list.unshift(5);          // List is now: 5 → 10 → 20

console.log([...list]);   // [5, 10, 20]
console.log(list.size);   // 3

console.log(list.pop());   // 20
console.log([...list]);   // [5, 10]
