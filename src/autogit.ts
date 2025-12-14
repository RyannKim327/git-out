class Stack<T> {
    private items: T[];
    private top: number;

    constructor() {
        this.items = [];
        this.top = -1;
    }

    // Push element onto the stack
    push(element: T): void {
        this.top++;
        this.items[this.top] = element;
    }

    // Pop element from the stack
    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const element = this.items[this.top];
        this.top--;
        return element;
    }

    // Peek at the top element without removing it
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.top];
    }

    // Check if stack is empty
    isEmpty(): boolean {
        return this.top === -1;
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

    // Print stack contents (for debugging)
    print(): void {
        console.log(this.items.slice(0, this.top + 1));
    }
}
class SimpleStack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    push(element: T): void {
        this.items.push(element);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items.length > 0 ? this.items[this.items.length - 1] : undefined;
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

    print(): void {
        console.log(this.items);
    }
}
class FixedCapacityStack<T> {
    private items: T[];
    private capacity: number;
    private top: number;

    constructor(capacity: number) {
        this.items = new Array<T>(capacity);
        this.capacity = capacity;
        this.top = -1;
    }

    push(element: T): boolean {
        if (this.isFull()) {
            console.warn("Stack is full. Cannot push element.");
            return false;
        }
        this.top++;
        this.items[this.top] = element;
        return true;
    }

    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const element = this.items[this.top];
        this.top--;
        return element;
    }

    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
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
// Example usage
const stack = new Stack<number>();

// Push elements
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // 30
console.log(stack.size()); // 3

// Pop elements
console.log(stack.pop()); // 30
console.log(stack.pop()); // 20

console.log(stack.isEmpty()); // false
console.log(stack.size()); // 1

stack.print(); // [10]

// String stack example
const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // "World"

// Fixed capacity example
const fixedStack = new FixedCapacityStack<number>(3);
fixedStack.push(1);
fixedStack.push(2);
fixedStack.push(3);
console.log(fixedStack.push(4)); // false (stack is full)
