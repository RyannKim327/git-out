class Stack<T> {
  private store: T[];
  private top: number;      // index of next free slot

  constructor(capacity: number) {
    this.store = new Array<T>(capacity);
    this.top  = 0;
  }

  push(item: T): void {
    if (this.top === this.store.length) throw new Error('Stack overflow');
    this.store[this.top++] = item;
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.store[--this.top];
    // Optional: clear the slot to help GC
    (this.store as any)[this.top] = undefined;
    return item;
  }

  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.store[this.top - 1];
  }

  isEmpty(): boolean {
    return this.top === 0;
  }

  size(): number {
    return this.top;
  }
}

/* ---------- Usage ---------- */
const s = new Stack<string>(5);
s.push('A');
s.push('B');
console.log(s.pop());   // "B"
console.log(s.peek());  // "A"
console.log(s.size());  // 1
