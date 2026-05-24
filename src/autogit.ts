// IStack defines the public contract for the stack.
export interface IStack<T> {
  push(item: T): void;      // add an item on top
  pop(): T | undefined;     // remove and return the top item
  peek(): T | undefined;    // look at the top without removing it
  isEmpty(): boolean;       // true if the stack has no items
  size(): number;           // current number of items
}

// Stack is a simple array‑backed implementation.
export class Stack<T> implements IStack<T> {
  // the underlying storage – an array grows automatically
  private items: T[] = [];

  constructor(initial?: T[]) {
    // optional initial content; does a shallow copy for safety
    if (initial) this.items = initial.slice();
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();          // pop() already returns undefined if empty
  }

  peek(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}
const stack = new Stack<number>();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek());   // 30
console.log(stack.pop());    // 30
console.log(stack.size());   // 2
console.log(stack.isEmpty()); // false

while (!stack.isEmpty()) {
  console.log(stack.pop());
}
// → 20
// → 10
