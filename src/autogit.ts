class Stack<T> {
    private items: T[];
    private top: number;

    constructor() {
        this.items = [];
        this.top = -1;
    }

    // Push element onto the stack
    push(element: T): void {
        this.items[++this.top] = element;
    }

    // Remove and return top element
    pop(): T | undefined {
        if (this.isEmpty()) {
            console.log("Stack Underflow");
            return undefined;
        }
        return this.items[this.top--];
    }

    // Return top element without removing
    peek(): T | undefined {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return undefined;
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

    // Clear the stack
    clear(): void {
        this.items = [];
        this.top = -1;
    }

    // Print stack contents
    print(): void {
        console.log(this.items.slice(0, this.top + 1));
    }
}
class FixedSizeStack<T> {
    private items: T[];
    private top: number;
    private readonly capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.items = new Array<T>(capacity);
        this.top = -1;
    }

    push(element: T): void {
        if (this.isFull()) {
            throw new Error("Stack Overflow: Cannot push to a full stack");
        }
        this.items[++this.top] = element;
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack Underflow: Cannot pop from an empty stack");
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

    print(): void {
        console.log(this.items.slice(0, this.top + 1));
    }
}
// Using the basic stack
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek()); // 30
console.log(numberStack.pop());  // 30
console.log(numberStack.size()); // 2

// Using the fixed-size stack
const stringStack = new FixedSizeStack<string>(3);
stringStack.push("Hello");
stringStack.push("World");
stringStack.push("!");

console.log(stringStack.isFull()); // true
console.log(stringStack.pop());    // "!"

// Stack with custom objects
interface User {
    id: number;
    name: string;
}

const userStack = new Stack<User>();
userStack.push({ id: 1, name: "Alice" });
userStack.push({ id: 2, name: "Bob" });

console.log(userStack.peek()); // { id: 2, name: "Bob" }
