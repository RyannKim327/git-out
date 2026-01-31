// Stack.ts
export class Stack<T> {
  // private backing store
  private items: T[] = [];

  /** Push an item onto the stack. */
  push(item: T): void {
    this.items.push(item);
  }

  /** Remove the top item and return it.  Returns undefined if the stack is empty. */
  pop(): T | undefined {
    return this.items.pop();
  }

  /** Peek at the top item without removing it.  Returns undefined if the stack is empty. */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /** Return true if the stack has no items. */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Current number of elements in the stack. */
  size(): number {
    return this.items.length;
  }

  /** Optional: completely clear the stack. */
  clear(): void {
    this.items = [];
  }
}
import { Stack } from "./Stack";

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);

console.log(numberStack.peek()); // 20
console.log(numberStack.pop());  // 20
console.log(numberStack.size()); // 1
console.log(numberStack.isEmpty()); // false

// Generic example with strings
const wordStack = new Stack<string>();
wordStack.push("hello");
wordStack.push("world");
console.log(wordStack.pop()); // world
