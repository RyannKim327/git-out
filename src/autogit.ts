// src/stack.ts
/**
 * A simple, generic stack implementation that uses a native JavaScript array as its storage.
 *
 * @template T  The type of elements stored in the stack.
 *
 * @example
 * const s = new Stack<number>();
 * s.push(1);
 * s.push(2);
 * console.log(s.pop()); // 2
 * console.log(s.peek()); // 1
 */

export class EmptyStackError extends Error {
  constructor(message = 'Stack is empty') {
    super(message);
    this.name = 'EmptyStackError';
    // Set the prototype explicitly (required when extending built‑ins in TS < 4.2)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Stack<T> – LIFO (last‑in‑first‑out) collection.
 */
export class Stack<T> implements Iterable<T> {
  /** The underlying storage. */
  private readonly items: T[] = [];

  /**
   * @param capacity Optional maximum number of elements the stack may hold.
   *                 If omitted the stack is unbounded.
   */
  constructor(public readonly capacity?: number) {
    if (capacity !== undefined && (!Number.isInteger(capacity) || capacity < 0)) {
      throw new RangeError('capacity must be a non‑negative integer');
    }
  }

  // -------------------------------------------------------------------------
  // Core stack operations
  // -------------------------------------------------------------------------

  /** Returns the number of elements currently stored. */
  get size(): number {
    return this.items.length;
  }

  /** Returns true if the stack contains no elements. */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Pushes a new element onto the top of the stack.
   *
   * @throws {RangeError} if a capacity limit is set and the stack is full.
   */
  push(item: T): void {
    if (this.capacity !== undefined && this.size >= this.capacity) {
      throw new RangeError('Stack overflow – capacity reached');
    }
    this.items.push(item);
  }

  /**
   * Removes and returns the element at the top of the stack.
   *
   * @throws {EmptyStackError} if the stack is empty.
   */
  pop(): T {
    if (this.isEmpty) {
      throw new EmptyStackError();
    }
    // `Array.pop` returns `T | undefined`, but we already checked `isEmpty`.
    return this.items.pop() as T;
  }

  /**
   * Returns (but does **not** remove) the element at the top of the stack.
   *
   * @throws {EmptyStackError} if the stack is empty.
   */
  peek(): T {
    if (this.isEmpty) {
      throw new EmptyStackError();
    }
    return this.items[this.items.length - 1];
  }

  // -------------------------------------------------------------------------
  // Utility methods
  // -------------------------------------------------------------------------

  /** Removes all elements from the stack. */
  clear(): void {
    this.items.length = 0;
  }

  /** Returns a shallow copy of the internal array (top element is last). */
  toArray(): T[] {
    return [...this.items];
  }

  /** Returns a string representation – useful for debugging. */
  toString(): string {
    return `Stack(${this.items.join(', ')})`;
  }

  // -------------------------------------------------------------------------
  // Iterable implementation
  // -------------------------------------------------------------------------

  /**
   * Enables `for (const x of stack) { … }`.
   *
   * The iterator yields elements **from bottom to top** (the same order
   * `Array.prototype.values()` would give). If you need top‑to‑bottom iteration,
   * use `Array.from(stack).reverse()`.
   */
  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.items) {
      yield item;
    }
  }

  // -------------------------------------------------------------------------
  // Optional: static factory helpers
  // -------------------------------------------------------------------------

  /** Creates a stack pre‑filled with the supplied items (first argument becomes the bottom). */
  static fromArray<U>(arr: U[], capacity?: number): Stack<U> {
    const stack = new Stack<U>(capacity);
    for (const el of arr) {
      stack.push(el);
    }
    return stack;
  }
}
// src/demo.ts
import { Stack, EmptyStackError } from './stack';

function demo() {
  const s = new Stack<number>(5); // capacity = 5 (optional)

  console.log('Initially empty?', s.isEmpty); // true

  // Push a few numbers
  s.push(10);
  s.push(20);
  s.push(30);
  console.log(s.toString()); // Stack(10, 20, 30)

  // Peek at the top
  console.log('Top element:', s.peek()); // 30

  // Pop elements
  console.log('Popped:', s.pop()); // 30
  console.log('Now top:', s.peek()); // 20

  // Iterate (bottom → top)
  for (const n of s) {
    console.log('Iterated value:', n);
  }

  // Clear the stack
  s.clear();
  console.log('After clear, empty?', s.isEmpty); // true

  // Demonstrate error handling
  try {
    s.pop(); // <-- throws EmptyStackError
  } catch (e) {
    if (e instanceof EmptyStackError) {
      console.error('Caught expected EmptyStackError:', e.message);
    } else {
      throw e; // re‑throw unexpected errors
    }
  }
}

demo();
npx ts-node src/demo.ts
Initially empty? true
Stack(10, 20, 30)
Top element: 30
Popped: 30
Now top: 20
Iterated value: 10
Iterated value: 20
After clear, empty? true
Caught expected EmptyStackError: Stack is empty
// __tests__/stack.test.ts
import { Stack, EmptyStackError } from '../src/stack';

describe('Stack<T>', () => {
  it('pushes and pops values in LIFO order', () => {
    const s = new Stack<string>();
    s.push('a');
    s.push('b');
    s.push('c');

    expect(s.pop()).toBe('c');
    expect(s.pop()).toBe('b');
    expect(s.pop()).toBe('a');
    expect(s.isEmpty).toBe(true);
  });

  it('throws EmptyStackError when popping from an empty stack', () => {
    const s = new Stack<number>();
    expect(() => s.pop()).toThrow(EmptyStackError);
  });

  it('peek returns the top element without removing it', () => {
    const s = new Stack<number>();
    s.push(1);
    s.push(2);
    expect(s.peek()).toBe(2);
    expect(s.size).toBe(2);
  });

  it('respects the optional capacity limit', () => {
    const s = new Stack<number>(2);
    s.push(1);
    s.push(2);
    expect(() => s.push(3)).toThrow(RangeError);
  });

  it('is iterable (bottom → top)', () => {
    const s = Stack.fromArray([1, 2, 3]);
    const collected = Array.from(s);
    expect(collected).toEqual([1, 2, 3]);
  });

  it('clear empties the stack', () => {
    const s = new Stack<number>();
    s.push(5);
    s.push(6);
    s.clear();
    expect(s.isEmpty).toBe(true);
    expect(() => s.peek()).toThrow(EmptyStackError);
  });
});
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "typescript": "^5.0.0"
  }
}
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
npm test
export class Stack<T> {
  private readonly items: T[] = [];
  constructor(public readonly capacity?: number) {}
  get size() { return this.items.length; }
  get isEmpty() { return this.items.length === 0; }
  push(item: T) { if (this.capacity && this.size >= this.capacity) throw new RangeError(); this.items.push(item); }
  pop(): T { if (this.isEmpty) throw new Error('empty'); return this.items.pop() as T; }
  peek(): T { if (this.isEmpty) throw new Error('empty'); return this.items[this.items.length - 1]; }
}
