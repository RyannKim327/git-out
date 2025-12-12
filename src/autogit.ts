class Stack<T> {
  private items: T[];
  private top: number;
  private readonly capacity: number;

  constructor(capacity: number = Infinity) {
    this.items = [];
    this.top = -1;
    this.capacity = capacity;
  }

  // Push element onto the stack
  push(element: T): void {
    if (this.isFull()) {
      throw new Error("Stack overflow - stack is full");
    }
    this.top++;
    this.items[this.top] = element;
  }

  // Pop element from the stack
  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack underflow - stack is empty");
    }
    const element = this.items[this.top];
    this.top--;
    return element;
  }

  // Peek at the top element without removing it
  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.top];
  }

  // Check if stack is empty
  isEmpty(): boolean {
    return this.top === -1;
  }

  // Check if stack is full
  isFull(): boolean {
    return this.top === this.capacity - 1;
  }

  // Get the size of the stack
  size(): number {
    return this.top + 1;
  }

  // Clear the stack
  clear(): void {
    this.items = [];
    this.top = -1;
  }

  // Convert stack to array
  toArray(): T[] {
    return this.items.slice(0, this.top + 1);
  }

  // Print the stack (for debugging)
  print(): void {
    console.log(`Stack: [${this.toArray().join(', ')}]`);
  }
}
// Example usage with number stack
const numberStack = new Stack<number>(5);

// Push elements
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);
numberStack.print(); // Stack: [10, 20, 30]

console.log("Top element:", numberStack.peek()); // 30
console.log("Stack size:", numberStack.size()); // 3

// Pop elements
console.log("Popped:", numberStack.pop()); // 30
console.log("Popped:", numberStack.pop()); // 20

// Example with string stack
const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // "World"

// Example with custom objects
interface User {
  id: number;
  name: string;
}

const userStack = new Stack<User>();
userStack.push({ id: 1, name: "Alice" });
userStack.push({ id: 2, name: "Bob" });
console.log(userStack.peek()); // { id: 2, name: "Bob" }

// Error handling
try {
  const emptyStack = new Stack<number>();
  emptyStack.pop(); // Throws error
} catch (error) {
  console.error(error.message); // "Stack underflow - stack is empty"
}
class SimpleStack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack underflow - stack is empty");
    }
    return this.items.pop() as T;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }
}
