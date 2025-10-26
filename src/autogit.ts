class Stack<T> {
    private items: T[];
    private top: number;

    constructor() {
        this.items = [];
        this.top = -1;
    }

    // Push element onto stack
    push(element: T): void {
        this.items[++this.top] = element;
    }

    // Pop element from stack
    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.top--];
    }

    // Peek at top element
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

    // Get stack size
    size(): number {
        return this.top + 1;
    }

    // Clear stack
    clear(): void {
        this.items = [];
        this.top = -1;
    }

    // Print stack contents (for debugging)
    print(): void {
        console.log("Stack:", this.items.slice(0, this.top + 1));
    }
}
// Create a stack of numbers
const numberStack = new Stack<number>();

// Push elements
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log("Size:", numberStack.size()); // Output: 3
console.log("Top element:", numberStack.peek()); // Output: 30

// Pop elements
console.log("Popped:", numberStack.pop()); // Output: 30
console.log("Popped:", numberStack.pop()); // Output: 20

// Check if empty
console.log("Is empty:", numberStack.isEmpty()); // Output: false

// Clear stack
numberStack.clear();
console.log("Is empty after clear:", numberStack.isEmpty()); // Output: true

// Stack with strings
const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.peek()); // Output: "world"
class FixedStack<T> {
    private items: T[];
    private top: number;
    private capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.items = new Array<T>(capacity);
        this.top = -1;
    }

    push(element: T): void {
        if (this.isFull()) {
            throw new Error("Stack overflow");
        }
        this.items[++this.top] = element;
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.top--];
    }

    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.top];
    }

    isEmpty(): boolean {
        return this.top === -1;
    }

    isFull(): boolean {
        return this.top === this.capacity - 1;
    }

    size(): number {
        return this.top + 1;
    }

    clear(): void {
        this.top = -1;
    }
}

// Usage
const fixedStack = new FixedStack<number>(3);
fixedStack.push(1);
fixedStack.push(2);
fixedStack.push(3);
// fixedStack.push(4); // This would throw "Stack overflow" error
class SimpleStack<T> {
    private items: T[] = [];

    push(element: T): void {
        this.items.push(element);
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop()!;
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
}
