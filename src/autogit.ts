/**
 * A classic LIFO stack backed by an array.
 * @template T The type stored in the stack.
 */
export class Stack<T> {
  // The internal storage array – keep it private.
  private items: T[] = [];

  /** Push a value onto the top of the stack. */
  push(item: T): void {
    this.items.push(item);
  }

  /** Remove and return the top value. Returns undefined if the stack is empty. */
  pop(): T | undefined {
    return this.items.pop();
  }

  /** Return the top value without removing it. */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /** Return how many items are currently in the stack. */
  size(): number {
    return this.items.length;
  }

  /** Simple truthy check for emptiness. */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** (Optional) Clear all items from the stack. */
  clear(): void {
    this.items.length = 0; // Fastest way to empty an array
  }
}
import { Stack } from './Stack';

const stack = new Stack<number>();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.size());  // 3
console.log(stack.peek());  // 30

console.log(stack.pop());   // 30
console.log(stack.pop());   // 20
console.log(stack.isEmpty()); // false

stack.clear();
console.log(stack.isEmpty()); // true
