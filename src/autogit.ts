// stack.ts
export class Stack<T> {
  /* The array that holds our data. The last item is the top of the stack. */
  private items: T[] = [];

  /** Adds a value to the top of the stack. */
  push(item: T): void {
    this.items.push(item);
  }

  /** Removes and returns the top value. Throws if the stack is empty. */
  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack underflow – tried to pop from an empty stack");
    }
    return this.items.pop() as T; // safe because we just checked for emptiness
  }

  /** Returns the top value without removing it. Throws if the stack is empty. */
  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Stack underflow – tried to peek on an empty stack");
    }
    // items.length is at least 1, so the index exists
    return this.items[this.items.length - 1];
  }

  /** Was the stack empty? */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** How many items are there? */
  size(): number {
    return this.items.length;
  }

  /** Clear everything out. */
  clear(): void {
    this.items = [];
  }
}
// demo.ts
import { Stack } from "./stack";

const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.peek());   // 3
console.log(stack.pop());    // 3
console.log(stack.size());   // 2
console.log(stack.isEmpty()); // false

stack.clear();
console.log(stack.isEmpty()); // true
