// Internal node type (not exported)
class Node<T> {
  value: T;
  next?: Node<T>;

  constructor(value: T, next?: Node<T>) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> implements Iterable<T> {
  private head?: Node<T>;
  private tail?: Node<T>;
  private _length: number = 0;

  constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const item of iterable) this.append(item);
    }
  }

  get length(): number {
    return this._length;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }

  // Add to end
  append(value: T): void {
    const node = new Node<T>(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    }
    this._length++;
  }

  // Add to start
  prepend(value: T): void {
    const node = new Node<T>(value, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    this._length++;
  }

  // Insert at index (0-based). If index <= 0, prepend; if >= length, append.
  insert(value: T, index: number): boolean {
    if (index <= 0) {
      this.prepend(value);
      return true;
    }
    if (index >= this._length) {
      this.append(value);
      return true;
    }

    // Traverse to the node just before the insertion point
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (!prev) return false;
      prev = prev.next;
    }
    if (!prev) return false;

    const node = new Node<T>(value, prev.next);
    prev.next = node;
    this._length++;
    return true;
  }

  // Remove at index and return the value
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this._length || !this.head) return undefined;

    if (index === 0) {
      const value = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = undefined;
      this._length--;
      return value;
    }

    // Traverse to node just before the one we remove
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (!prev) return undefined;
      prev = prev.next;
    }
    if (!prev || !prev.next) return undefined;

    const toRemove = prev.next;
    prev.next = toRemove.next;
    if (toRemove === this.tail) this.tail = prev;
    this._length--;
    return toRemove.value;
  }

  // Get value at index
  get(index: number): T | undefined {
    if (index < 0 || index >= this._length) return undefined;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (!current) return undefined;
      current = current.next;
    }
    return current?.value;
  }

  // Set value at index
  set(index: number, value: T): boolean {
    const node = this.getNode(index);
    if (!node) return false;
    node.value = value;
    return true;
  }

  private getNode(index: number): Node<T> | undefined {
    if (index < 0 || index >= this._length || !this.head) return undefined;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current;
  }

  // Convert to array
  toArray(): T[] {
    const arr: T[] = [];
    for (const v of this) arr.push(v);
    return arr;
  }

  // Convenience: build from array
  static fromArray<U>(values: U[]): LinkedList<U> {
    const list = new LinkedList<U>();
    for (const v of values) list.append(v);
    return list;
  }

  // Iteration support
  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if (!current) return { value: undefined as any, done: true };
        const value = current.value;
        current = current.next;
        return { value, done: false };
      },
    };
  }

  // Optional: forEach helper
  forEach(callback: (value: T, index: number) => void): void {
    let idx = 0;
    for (const v of this) callback(v, idx++);
  }

  clear(): void {
    this.head = undefined;
    this.tail = undefined;
    this._length = 0;
  }
}
