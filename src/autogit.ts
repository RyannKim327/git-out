// Stack.ts
export class Stack<T> {
  // Underlying array that holds the stack items
  private items: T[] = [];

  // Push a value onto the top of the stack
  push(value: T): void {
    this.items.push(value);
  }

  // Remove and return the item from the top of the stack.
  // Returns undefined if the stack is empty.
  pop(): T | undefined {
    return this.items.pop();
  }

  // Peek at the top item without removing it.
  // Returns undefined if the stack is empty.
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // Report how many items are currently in the stack
  get size(): number {
    return this.items.length;
  }

  // Is the stack empty?
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
import { Stack } from './Stack';

const intStack = new Stack<number>();

intStack.push(10);
intStack.push(20);
intStack.push(30);

console.log(intStack.peek()); // 30
console.log(intStack.pop());  // 30
console.log(intStack.size);   // 2
