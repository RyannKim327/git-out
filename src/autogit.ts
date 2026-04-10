// stack.ts
export class Stack<T> {
  // The underlying storage.
  private readonly items: T[] = [];

  /** Add an item onto the top of the stack. */
  push(item: T): void {
    this.items.push(item);
  }

  /** Remove and return the item from the top of the stack. */
  pop(): T | undefined {
    return this.items.pop(); // undefined if the stack is empty
  }

  /** Peek at the top item without removing it. */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /** Check whether the stack contains no items. */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Return the number of items in the stack. */
  size(): number {
    return this.items.length;
  }

  /** Clears the stack so it’s empty. */
  clear(): void {
    this.items.length = 0;
  }
}
import { Stack } from './stack';

const numStack = new Stack<number>();

numStack.push(10);
numStack.push(20);
numStack.push(30);

console.log(numStack.peek()); // 30
console.log(numStack.pop());  // 30
console.log(numStack.size()); // 2
console.log(numStack.isEmpty()); // false

numStack.clear();
console.log(numStack.isEmpty()); // true
export class MaxStack<T extends number> {
  private readonly stack: T[] = [];
  private readonly maxStack: T[] = [];

  push(item: T): void {
    this.stack.push(item);
    const currentMax = this.maxStack.length === 0
      ? item
      : Math.max(item, this.maxStack[this.maxStack.length - 1]);
    this.maxStack.push(currentMax);
  }

  pop(): T | undefined {
    this.maxStack.pop();
    return this.stack.pop();
  }

  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  max(): T | undefined {
    return this.maxStack[this.maxStack.length - 1];
  }

  // …plus isEmpty, size, clear, etc.
}
