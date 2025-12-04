class Stack<T> {
  private store: T[] = [];

  constructor(private capacity: number = Infinity) {}

  /** Number of elements currently in the stack */
  get size(): number {
    return this.store.length;
  }

  /** true if no elements are stored */
  isEmpty(): boolean {
    return this.store.length === 0;
  }

  /** Add item to the top */
  push(item: T): void {
    if (this.size === this.capacity) {
      throw new Error('Stack overflow');
    }
    this.store.push(item);
  }

  /** Remove and return the top item */
  pop(): T | undefined {
    return this.store.pop();
  }

  /** Return (but do not remove) the top item */
  peek(): T | undefined {
    return this.store.at(-1);
  }

  /** Remove all elements */
  clear(): void {
    this.store.length = 0;
  }

  /** Support for...of iteration (top→bottom) */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = this.store.length - 1; i >= 0; --i) {
      yield this.store[i];
    }
  }

  /** Human-readable representation */
  toString(): string {
    return `Stack [${this.store.join(', ')}]`;
  }
}

/* ---------- Example usage ---------- */
const s = new Stack<string>(3);
s.push('A');
s.push('B');
console.log(s.peek());   // B
console.log(s.pop());    // B
console.log(s.size);     // 1
for (const x of s) console.log(x); // A
