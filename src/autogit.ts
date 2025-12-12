class Stack<T> {
    private items: T[];
    private capacity: number;

    constructor(capacity: number = Infinity) {
        this.items = [];
        this.capacity = capacity;
    }

    // Push an element onto the stack
    push(element: T): void {
        if (this.isFull()) {
            throw new Error("Stack overflow: cannot push to a full stack");
        }
        this.items.push(element);
    }

    // Pop an element from the stack
    pop(): T | undefined {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: cannot pop from an empty stack");
        }
        return this.items.pop();
    }

    // Peek at the top element without removing it
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Check if stack is full
    isFull(): boolean {
        return this.items.length === this.capacity;
    }

    // Get stack size
    size(): number {
        return this.items.length;
    }

    // Clear the stack
    clear(): void {
        this.items = [];
    }

    // Convert stack to array (for debugging/display)
    toArray(): T[] {
        return [...this.items];
    }

    // Print stack contents
    print(): void {
        console.log(this.items.join(' -> '));
    }
}
// Create a stack with numbers
const numberStack = new Stack<number>(5);

// Push elements
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek()); // 30
console.log(numberStack.size()); // 3

// Pop elements
console.log(numberStack.pop()); // 30
console.log(numberStack.pop()); // 20

// String stack example
const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.peek()); // "World"

// Custom object stack
interface User {
    id: number;
    name: string;
}

const userStack = new Stack<User>();
userStack.push({ id: 1, name: "Alice" });
userStack.push({ id: 2, name: "Bob" });
console.log(userStack.peek()); // { id: 2, name: "Bob" }
class FixedStack<T> {
    private items: (T | undefined)[];
    private top: number;
    private readonly capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.items = new Array<T | undefined>(capacity);
        this.top = -1;
    }

    push(element: T): void {
        if (this.isFull()) {
            throw new Error("Stack overflow");
        }
        this.top++;
        this.items[this.top] = element;
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack underflow");
        }
        const element = this.items[this.top] as T;
        this.items[this.top] = undefined;
        this.top--;
        return element;
    }

    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.top] as T;
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
        this.items = new Array<T | undefined>(this.capacity);
        this.top = -1;
    }
}
