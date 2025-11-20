// Stack.ts
export class StackEmptyError extends Error {
  constructor() {
    super('Stack is empty');
    this.name = 'StackEmptyError';
  }
}

export class Stack<T> {
  private readonly items: T[] = [];

  /** Number of elements in the stack. */
  get size(): number {
    return this.items.length;
  }

  /** True if the stack has no elements. */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Add an element to the top of the stack. */
  push(item: T): void {
    this.items.push(item);
  }

  /**
   * Remove and return the top element.
   * @throws {StackEmptyError} if the stack is empty.
   */
  pop(): T {
    if (this.isEmpty) throw new StackEmptyError();
    return this.items.pop()!;
  }

  /**
   * Return the top element without removing it.
   * @throws {StackEmptyError} if the stack is empty.
   */
  peek(): T {
    if (this.isEmpty) throw new StackEmptyError();
    return this.items[this.items.length - 1];
  }

  /** Remove all elements. */
  clear(): void {
    this.items.length = 0;
  }

  /** Iterate from bottom to top (LIFO order when popping). */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this.items.length; i++) {
      yield this.items[i];
    }
  }
}
import { Stack, StackEmptyError } from './Stack';

const s = new Stack<number>();
s.push(10);
s.push(20);
console.log(s.pop()); // 20
console.log(s.peek()); // 10
console.log(s.size); // 1
s.clear();
console.log(s.isEmpty); // true
