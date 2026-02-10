class Stack<T> {
  private items: T[] = [];      // underlying array

  /** Push a value onto the top of the stack. */
  push(value: T): void {
    this.items.push(value);
  }

  /** Remove and return the top value.  Returns `undefined` if the stack is empty. */
  pop(): T | undefined {
    return this.items.pop();
  }

  /** Peek at the top value without removing it. */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /** Number of elements in the stack. */
  get size(): number {
    return this.items.length;
  }

  /** True if the stack contains no items. */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Optional: clear all items. */
  clear(): void {
    this.items = [];
  }
}
const stack = new Stack<number>();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.size);   // 2

stack.clear();
console.log(stack.isEmpty); // true
