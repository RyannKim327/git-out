class ArrayStack<T> {
  private readonly items: T[] = [];

  /** Add an element to the top of the stack. */
  push(item: T): void {
    this.items.push(item);
  }

  /** Remove and return the top element. Throws if the stack is empty. */
  pop(): T {
    if (this.isEmpty()) throw new Error('Stack underflow');
    return this.items.pop()!;
  }

  /** Return the top element without removing it. Throws if the stack is empty. */
  peek(): T {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.items[this.items.length - 1];
  }

  /** Number of elements currently in the stack. */
  get size(): number {
    return this.items.length;
  }

  /** True if the stack contains no elements. */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Optional: clear all elements. */
  clear(): void {
    this.items.length = 0;
  }

  /** Optional: make it iterable (LIFO order). */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i];
    }
  }
}

/* ---------- Usage example ---------- */
const s = new ArrayStack<number>();
s.push(10);
s.push(20);
console.log(s.peek()); // 20
console.log(s.pop());  // 20
console.log(s.size);   // 1
for (const val of s) console.log(val); // 10
