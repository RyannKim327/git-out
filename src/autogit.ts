/**
 * A classic LIFO stack backed by a native array.
 *
 * @typeParam T – the type of elements stored in the stack.
 */
export class Stack<T> implements Iterable<T> {
  /** The underlying storage.  It is kept private to preserve encapsulation. */
  private readonly items: T[] = [];

  /**
   * Optional maximum number of elements the stack may hold.
   * If omitted the stack can grow without bound.
   */
  private readonly capacity?: number;

  /**
   * Create a new stack.
   *
   * @param capacity - optional upper bound for the number of elements.
   */
  constructor(capacity?: number) {
    if (capacity !== undefined && (!Number.isInteger(capacity) || capacity < 0)) {
      throw new RangeError('capacity must be a non‑negative integer');
    }
    this.capacity = capacity;
  }

  /** --------------------------------------------------------------
   *  Core stack operations
   * -------------------------------------------------------------- */

  /** Pushes a value onto the top of the stack. */
  push(value: T): void {
    if (this.capacity !== undefined && this.items.length >= this.capacity) {
      throw new Error('Stack overflow – capacity reached');
    }
    this.items.push(value);
  }

  /**
   * Removes and returns the value at the top of the stack.
   *
   * @throws Error if the stack is empty.
   */
  pop(): T {
    if (this.isEmpty) {
      throw new Error('Stack underflow – cannot pop from an empty stack');
    }
    // `Array.pop()` returns `T | undefined`, but we already checked emptiness.
    return this.items.pop() as T;
  }

  /**
   * Returns (but does **not** remove) the value at the top of the stack.
   *
   * @throws Error if the stack is empty.
   */
  peek(): T {
    if (this.isEmpty) {
      throw new Error('Cannot peek – stack is empty');
    }
    // `Array.at(-1)` is safe in modern runtimes; fallback to `items[items.length-1]`.
    return this.items.at(-1) ?? this.items[this.items.length - 1];
  }

  /** --------------------------------------------------------------
   *  Query helpers
   * -------------------------------------------------------------- */

  /** Number of elements currently stored. */
  get size(): number {
    return this.items.length;
  }

  /** True if the stack contains no elements. */
  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** True if a capacity limit was supplied and the stack is full. */
  get isFull(): boolean {
    return this.capacity !== undefined && this.items.length >= this.capacity;
  }

  /** Returns a shallow copy of the internal array (top element last). */
  toArray(): T[] {
    return [...this.items];
  }

  /** --------------------------------------------------------------
   *  Iterable implementation (top → bottom)
   * -------------------------------------------------------------- */
  *[Symbol.iterator](): Iterator<T> {
    // Iterate from the top of the stack downwards.
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i];
    }
  }

  /** --------------------------------------------------------------
   *  Read‑only view (useful when you want to expose the stack without
   *  allowing mutation).
   * -------------------------------------------------------------- */
  asReadonly(): ReadonlyStack<T> {
    return new ReadonlyStack(this);
  }
}

/**
 * A thin wrapper that only exposes read‑only members of `Stack<T>`.
 * It forwards calls to the underlying mutable stack but does not expose
 * any mutating methods.
 */
export class ReadonlyStack<T> implements Iterable<T> {
  constructor(private readonly inner: Stack<T>) {}

  peek(): T {
    return this.inner.peek();
  }

  get size(): number {
    return this.inner.size;
  }

  get isEmpty(): boolean {
    return this.inner.isEmpty;
  }

  get isFull(): boolean {
    return this.inner.isFull;
  }

  toArray(): T[] {
    return this.inner.toArray();
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this.inner;
  }
}
import { Stack } from './stack';

// ---- Simple number stack -------------------------------------------------
const numStack = new Stack<number>();

numStack.push(10);
numStack.push(20);
numStack.push(30);

console.log(numStack.peek()); // 30
console.log(numStack.pop());  // 30
console.log(numStack.size);   // 2

// ---- Generic stack with a capacity limit ---------------------------------
type Card = { suit: '♠' | '♥' | '♦' | '♣'; rank: string };
const deck = new Stack<Card>(52); // max 52 cards

deck.push({ suit: '♠', rank: 'A' });
deck.push({ suit: '♥', rank: 'K' });

for (const card of deck) {
  console.log(`${card.rank}${card.suit}`);
}

// ---- Exposing a read‑only view -------------------------------------------
function processStack<T>(stack: ReadonlyStack<T>) {
  console.log('size =', stack.size);
  if (!stack.isEmpty) console.log('top =', stack.peek());
}

processStack(numStack.asReadonly());
// processStack(numStack).push(5); // ❌ compile‑time error – push not available
// stack.test.ts
import { Stack } from './stack';

describe('Stack', () => {
  test('push/pop/peek work as expected', () => {
    const s = new Stack<number>();
    s.push(1);
    s.push(2);
    expect(s.peek()).toBe(2);
    expect(s.pop()).toBe(2);
    expect(s.pop()).toBe(1);
    expect(s.isEmpty).toBe(true);
  });

  test('throws on underflow', () => {
    const s = new Stack<string>();
    expect(() => s.pop()).toThrow('underflow');
    expect(() => s.peek()).toThrow('empty');
  });

  test('capacity limit', () => {
    const s = new Stack<number>(2);
    s.push(1);
    s.push(2);
    expect(() => s.push(3)).toThrow('overflow');
    expect(s.isFull).toBe(true);
  });

  test('iteration yields top‑to‑bottom', () => {
    const s = new Stack<string>();
    s.push('a');
    s.push('b');
    s.push('c');
    expect([...s]).toEqual(['c', 'b', 'a']);
  });
});
export class SimpleStack<T> {
  private items: T[] = [];

  push(v: T): void { this.items.push(v); }
  pop(): T {
    if (!this.items.length) throw new Error('empty');
    return this.items.pop() as T;
  }
  peek(): T {
    if (!this.items.length) throw new Error('empty');
    return this.items[this.items.length - 1];
  }
  get size(): number { return this.items.length; }
  get isEmpty(): boolean { return this.items.length === 0; }
}
