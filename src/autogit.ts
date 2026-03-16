/* 1️⃣  A node holds a value and a pointer to the next node   */
class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

/* 2️⃣  The list itself                                               */
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size = 0;

  /* Useful for debugging or quick inspection */
  get size() : number { return this._size; }

  /* 🔄  Add at the end – amortised O(1)                      */
  push(val: T) : void {
    const node = new ListNode(val);
    if (!this.head) {   // first element
      this.head = this.tail = node;
    } else {
      // tail is guaranteed not null here
      this.tail!.next = node;
      this.tail = node;
    }
    this._size++;
  }

  /* ⬅️  Remove from the end – O(n) because we’d have to
        find the previous node. This simple version walks
        to the node before the tail.                        */
  pop() : T | undefined {
    if (!this.head) return;
    if (this.head === this.tail) {   // one element left
      const val = this.head.value;
      this.head = this.tail = null;
      this._size = 0;
      return val;
    }

    let prev = this.head;
    while (prev.next !== this.tail) {
      prev = prev.next!;
    }
    const val = this.tail!.value;
    prev.next = null;
    this.tail = prev;
    this._size--;
    return val;
  }

  /* 🔍  Find the index of a value – O(n)                   */
  indexOf(val: T) : number {
    let cur = this.head;
    let i = 0;
    while (cur) {
      if (cur.value === val) return i;
      cur = cur.next;
      i++;
    }
    return -1;
  }

  /* 🔢  Grab the value at an index – guard against
        out‑of‑range access. O(n)                               */
  getAt(index: number) : T | undefined {
    if (index < 0 || index >= this._size) return;
    let cur = this.head;
    let i = 0;
    while (cur && i < index) {
      cur = cur.next;
      i++;
    }
    return cur?.value;
  }

  /* 🔁  Iterate over values – handy for `for..of`            */
  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next: () => {
        if (!current) return { done: true, value: undefined };
        const value = current.value;
        current = current.next;
        return { done: false, value };
      }
    };
  }
}

/* 3️⃣  Quick sanity test                                   */
const nums = new LinkedList<number>();
nums.push(10);
nums.push(20);
nums.push(30);
console.log(nums.size);          // 3
console.log([...nums]);          // [10, 20, 30]
console.log(nums.pop());         // 30
console.log(nums.size);          // 2
console.log(nums.indexOf(20));   // 1
console.log(nums.getAt(0));      // 10
