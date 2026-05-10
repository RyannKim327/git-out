/*  stack.ts  */
export class Stack<T> {
  // The raw array that stores everything.
  private readonly items: T[] = [];

  /** Push a value onto the stack. Complexity: O(1). */
  push(item: T): void {
    this.items.push(item);
  }

  /** Remove and return the top value. Throws if the stack is empty. Complexity: O(1). */
  pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack underflow: cannot pop from an empty stack');
    }
    return this.items.pop() as T;  // `pop()` can return undefined, but we guard above
  }

  /** Return the top value without removing it. Throws if empty. Complexity: O(1). */
  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Stack underflow: cannot peek at an empty stack');
    }
    return this.items[this.items.length - 1];
  }

  /** True if the stack has no elements. Complexity: O(1). */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Number of items currently stored. Complexity: O(1). */
  size(): number {
    return this.items.length;
  }

  /** Clear everything. Complexity: O(1) (just resets reference). */
  clear(): void {
    this.items.length = 0;
  }
}
import { Stack } from './stack';

const numStack = new Stack<number>();

numStack.push(1);
numStack.push(2);
numStack.push(3);

console.log(numStack.peek());   // 3
console.log(numStack.pop());    // 3
console.log(numStack.size());   // 2
console.log(numStack.isEmpty()); // false

numStack.clear();
console.log(numStack.isEmpty()); // true
export class Stack<T> {
  private readonly items: T[] = [];
  constructor(private readonly capacity = Infinity) {}

  push(item: T): void {
    if (this.items.length >= this.capacity) {
      throw new Error('Stack overflow: cannot push beyond capacity');
    }
    this.items.push(item);
  }
  /* … rest of the class unchanged … */
}
