// Stack.ts
export class StackEmptyError extends Error {
  constructor() {
    super('Stack is empty');
  }
}

export class Stack<T> {
  private readonly _items: T[] = [];

  /*----- Core API -----*/
  push(item: T): void {
    this._items.push(item);
  }

  pop(): T {
    if (this.isEmpty()) throw new StackEmptyError();
    return this._items.pop()!;
  }

  peek(): T {
    if (this.isEmpty()) throw new StackEmptyError();
    return this._items[this._items.length - 1];
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  get size(): number {
    return this._items.length;
  }

  /*----- Convenience -----*/
  clear(): void {
    this._items.length = 0;
  }

  toArray(): T[] {
    return [...this._items]; // shallow copy
  }

  [Symbol.iterator](): IterableIterator<T> {
    // iterate from bottom to top (LIFO order when you pop manually)
    let i = 0;
    return {
      next: () => ({
        value: this._items[i++],
        done: i > this._items.length,
      }),
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}
import { Stack } from './Stack';

const s = new Stack<number>();
s.push(10);
s.push(20);
console.log(s.peek()); // 20
console.log(s.pop());  // 20
console.log(s.size);   // 1
console.log(s.isEmpty()); // false
s.pop();
console.log(s.isEmpty()); // true
