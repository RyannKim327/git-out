// Stack.ts
export class StackEmptyError extends Error {
  constructor() {
    super('Stack is empty');
    this.name = 'StackEmptyError';
  }
}

export class Stack<T> {
  private readonly items: T[] = [];

  /** Number of elements currently in the stack. */
  public get size(): number {
    return this.items.length;
  }

  /** True if the stack contains no elements. */
  public get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** Add an element to the top of the stack. */
  public push(item: T): void {
    this.items.push(item);
  }

  /**
   * Remove and return the top element.
   * @throws {StackEmptyError} if the stack is empty.
   */
  public pop(): T {
    if (this.isEmpty) throw new StackEmptyError();
    return this.items.pop()!;
  }

  /**
   * Return (but do not remove) the top element.
   * @throws {StackEmptyError} if the stack is empty.
   */
  public peek(): T {
    if (this.isEmpty) throw new StackEmptyError();
    return this.items[this.items.length - 1];
  }

  /** Remove all elements. */
  public clear(): void {
    this.items.length = 0;
  }

  /** Iterate from bottom to top (LIFO order). */
  public *[Symbol.iterator](): Iterator<T> {
    for (const item of this.items) yield item;
  }

  /** Human-readable representation. */
  public toString(): string {
    return `Stack [${this.items.join(', ')}]`;
  }
}
import { Stack } from './Stack';

const s = new Stack<number>();
s.push(10);
s.push(20);
console.log(s.peek()); // 20
console.log(s.pop()); // 20
console.log(s.size); // 1
s.clear();
console.log(s.isEmpty); // true
tsc Stack.ts --target es2020 --module commonjs
node Stack.js
