/**
 * A classic LIFO stack that stores items in an array.
 * @template T The type of the values stored inside the stack.
 */
export class Stack<T> {
  /** The underlying array that holds the stack's data. */
  private data: T[] = [];

  /** Adds an element to the top of the stack. */
  push(item: T): void {
    this.data.push(item);
  }

  /**
   * Removes and returns the element at the top of the stack.
   * Returns undefined if the stack is empty.
   */
  pop(): T | undefined {
    return this.data.pop();
  }

  /** Peeks at the element on the top without removing it. */
  peek(): T | undefined {
    return this.data[this.data.length - 1];
  }

  /** Returns the number of elements in the stack. */
  get size(): number {
    return this.data.length;
  }

  /** Returns true when the stack has nothing inside. */
  get isEmpty(): boolean {
    return this.data.length === 0;
  }
}
const stack = new Stack<number>();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.size);   // 2
