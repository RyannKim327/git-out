export class Stack<T> {
  /** internal buffer – the array that stores the stack items */
  private readonly items: T[] = [];

  /** push an item onto the stack */
  push(value: T): void {
    this.items.push(value);
  }

  /** pop the top item; returns `undefined` if the stack is empty */
  pop(): T | undefined {
    return this.items.pop();
  }

  /** peek at the top item without removing it */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /** true if the stack has no elements */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /** number of elements currently on the stack */
  size(): number {
    return this.items.length;
  }
}
const stack = new Stack<number>();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.size()); // 2
console.log(stack.isEmpty()); // false
