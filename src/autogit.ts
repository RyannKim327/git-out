/* ------------------------------------------------------------ */
/*  A generic node that holds a value and a reference to next   */
/* ------------------------------------------------------------ */
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

/* ------------------------------------------------------------ */
/*  A generic singly‑linked list                               */
/* ------------------------------------------------------------ */
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;

  /* ---------- Properties ---------- */
  get size(): number { return this._size; }
  get isEmpty(): boolean { return this._size === 0; }

  /* ---------- Core Operations ---------- */

  /** Push a value onto the **end** of the list */
  push(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    this._size++;
  }

  /** Unshift a value onto the **head** of the list */
  unshift(value: T): void {
    const node = new ListNode(value, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    this._size++;
  }

  /** Remove and return the value at the head */
  shift(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this._size--;
    return value;
  }

  /** Remove and return the value at the tail */
  pop(): T | undefined {
    if (!this.head) return undefined;
    if (!this.tail) return undefined;

    let current = this.head;
    let prev: ListNode<T> | null = null;

    while (current.next) {
      prev = current;
      current = current.next;
    }

    const value = current.value;
    if (prev) {
      prev.next = null;
      this.tail = prev;
    } else {
      // list had only one element
      this.head = this.tail = null;
    }
    this._size--;
    return value;
  }

  /* ---------- Traversal & Search ---------- */

  /** Find the first node whose value satisfies the predicate */
  find(predicate: (value: T) => boolean): T | undefined {
    let node = this.head;
    while (node) {
      if (predicate(node.value)) return node.value;
      node = node.next;
    }
    return undefined;
  }

  /** Convert the list to an array (for debugging or display) */
  toArray(): T[] {
    const arr: T[] = [];
    let node = this.head;
    while (node) {
      arr.push(node.value);
      node = node.next;
    }
    return arr;
  }

  /* ---------- Utility ---------- */

  /** Remove the first node that satisfies the predicate */
  remove(predicate: (value: T) => boolean): boolean {
    if (!this.head) return false;

    if (predicate(this.head.value)) {
      this.shift();
      return true;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current) {
      if (predicate(current.value)) {
        prev.next = current.next;
        if (!current.next) this.tail = prev; // removed tail
        this._size--;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false; // not found
  }
}

/* ------------------------------------------------------------ */
/*  Usage example ------------------------------------------------ */
const list = new LinkedList<number>();

list.push(3);    // 3
list.push(5);    // 3 → 5
list.unshift(1); // 1 → 3 → 5

console.log(list.toArray()); // [1, 3, 5]
console.log(list.shift());   // 1
console.log(list.pop());     // 5
console.log(list.toArray()); // [3]
console.log(list.find(v => v === 3)); // 3

list.remove(v => v === 3);
console.log(list.toArray()); // []

/* ------------------------------------------------------------ */
