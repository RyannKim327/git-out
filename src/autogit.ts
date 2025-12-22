class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // Push an element onto the stack
  push(element: T): void {
    this.items.push(element);
  }

  // Pop an element from the stack
  pop(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  // Peek at the top element without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the stack
  size(): number {
    return this.items.length;
  }

  // Clear the stack
  clear(): void {
    this.items = [];
  }

  // Optional: Convert stack to array (for debugging)
  toArray(): T[] {
    return [...this.items];
  }
}
// Create a stack of numbers
const numberStack = new Stack<number>();

// Push elements
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek()); // 30
console.log(numberStack.size()); // 3

// Pop elements
console.log(numberStack.pop()); // 30
console.log(numberStack.pop()); // 20

console.log(numberStack.isEmpty()); // false
console.log(numberStack.size()); // 1

// Clear the stack
numberStack.clear();
console.log(numberStack.isEmpty()); // true

// Stack with strings
const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop()); // "world"
class FixedStack<T> {
  private items: T[];
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.items = [];
    this.maxSize = maxSize;
  }

  push(element: T): void {
    if (this.isFull()) {
      throw new Error("Stack overflow");
    }
    this.items.push(element);
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  isFull(): boolean {
    return this.items.length === this.maxSize;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}
