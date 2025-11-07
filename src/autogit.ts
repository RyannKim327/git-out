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
    push(item: T): void {
        if (this.isFull()) {
            throw new Error("Stack overflow: Cannot push to a full stack");
        }
        this.items[++this.top] = item;
    }

    // Pop element from the stack
    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: Cannot pop from an empty stack");
        }
        return this.items[this.top--];
    }

    // Peek at the top element
    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty: Cannot peek");
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

    // Get stack size
    size(): number {
        return this.top + 1;
    }

    // Clear the stack
    clear(): void {
        this.items = [];
        this.top = -1;
    }

    // Convert stack to array (for debugging/inspection)
    toArray(): T[] {
        return [...this.items.slice(0, this.top + 1)];
    }
}
// Example 1: Number stack
const numberStack = new Stack<number>(5);

numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek()); // 30
console.log(numberStack.pop());  // 30
console.log(numberStack.size()); // 2

// Example 2: String stack
const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.toArray()); // ["Hello", "World"]

// Example 3: Custom object stack
interface User {
    id: number;
    name: string;
}

const userStack = new Stack<User>();
userStack.push({ id: 1, name: "Alice" });
userStack.push({ id: 2, name: "Bob" });
console.log(userStack.peek().name); // "Bob"
class EnhancedStack<T> {
    private items: T[];
    private top: number;
    private readonly capacity: number | null;

    constructor(capacity?: number) {
        this.items = [];
        this.top = -1;
        this.capacity = capacity ?? null;
    }

    push(item: T): void {
        if (this.capacity !== null && this.top >= this.capacity - 1) {
            throw new Error(`Stack overflow: Maximum capacity ${this.capacity} reached`);
        }
        this.items[++this.top] = item;
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: Cannot pop from an empty stack");
        }
        const item = this.items[this.top];
        this.items[this.top] = null as any; // Optional: help garbage collection
        this.top--;
        return item;
    }

    // Additional utility methods
    contains(item: T): boolean {
        return this.items.slice(0, this.top + 1).includes(item);
    }

    // Create stack from array
    static fromArray<T>(items: T[], capacity?: number): EnhancedStack<T> {
        const stack = new EnhancedStack<T>(capacity);
        items.forEach(item => stack.push(item));
        return stack;
    }
}

// Usage of enhanced version
const stack = EnhancedStack.fromArray([1, 2, 3, 4], 10);
console.log(stack.contains(3)); // true
