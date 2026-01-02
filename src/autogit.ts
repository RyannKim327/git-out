class ArrayStack<T> {
  private data: T[];
  private topIndex: number;      // index of next free slot

  constructor(capacity: number) {
    this.data = new Array<T>(capacity);
    this.topIndex = 0;
  }

  /** Add item to the top.  Throws if full. */
  push(item: T): void {
    if (this.isFull()) throw new Error('Stack overflow');
    this.data[this.topIndex++] = item;
  }

  /** Remove and return the top item.  Throws if empty. */
  pop(): T {
    if (this.isEmpty()) throw new Error('Stack underflow');
    return this.data[--this.topIndex];
  }

  /** Return the top item without removing it. */
  peek(): T {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.data[this.topIndex - 1];
  }

  isEmpty(): boolean {
    return this.topIndex === 0;
  }

  isFull(): boolean {
    return this.topIndex === this.data.length;
  }

  size(): number {
    return this.topIndex;
  }

  /** Optional: make iteration easy (top→bottom). */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = this.topIndex - 1; i >= 0; i--) {
      yield this.data[i];
    }
  }
}

/* ---------- Usage example ---------- */
const s = new ArrayStack<string>(4);
s.push('A');
s.push('B');
console.log(s.pop());   // → 'B'
console.log(s.peek());  // → 'A'
for (const x of s) console.log(x); // prints 'A'
