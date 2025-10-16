class Stack<T> {
  private items: T[];
  private top: number;

  constructor() {
    this.items = [];
    this.top = -1;
  }

  // Push an element onto the stack
  push(item: T): void {
    this.items[++this.top] = item;
  }

  // Remove and return the top element from the stack
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.top];
    this.top--;
    return item;
  }

  // Return the top element without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.top];
  }

  // Check if the stack is empty
  isEmpty(): boolean {
    return this.top === -1;
  }

  // Get the number of elements in the stack
  size(): number {
    return this.top + 1;
  }

  // Clear the stack
  clear(): void {
    this.items = [];
    this.top = -1;
  }

  // Convert stack to array (note: this shows elements in reverse order)
  toArray(): T[] {
    return this.items.slice(0, this.top + 1);
  }
}
// Example usage
const stringStack = new Stack<string>();
const numberStack = new Stack<number>();

// Push elements
stringStack.push("Hello");
stringStack.push("World");
stringStack.push("TypeScript");

numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

// Check size
console.log("String stack size:", stringStack.size()); // 3
console.log("Number stack size:", numberStack.size()); // 3

// Peek at top element
console.log("Top string:", stringStack.peek()); // "TypeScript"

// Pop elements
console.log("Popped:", stringStack.pop()); // "TypeScript"
console.log("Popped:", stringStack.pop()); // "World"
console.log("Now top:", stringStack.peek()); // "Hello"

// Check if empty
console.log("Is string stack empty?", stringStack.isEmpty()); // false
stringStack.pop(); // removes "Hello"
console.log("Is string stack empty?", stringStack.isEmpty()); // true

// Clear stack
numberStack.clear();
console.log("Is number stack empty after clear?", numberStack.isEmpty()); // true
class SimpleStack<T> {
  private stack: T[];

  constructor() {
    this.stack = [];
  }

  push(item: T): void {
    this.stack.push(item);
  }

  pop(): T | undefined {
    return this.stack.pop();
  }

  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  size(): number {
    return this.stack.length;
  }

  clear(): void {
    this.stack = [];
  }

  toArray(): T[] {
    return [...this.stack]; // Creates a copy to prevent external modification
  }
}
