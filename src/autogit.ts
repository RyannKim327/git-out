class Stack<T> {
    private items: T[];
    
    constructor() {
        this.items = [];
    }
    
    // Push element onto the stack
    push(element: T): void {
        this.items.push(element);
    }
    
    // Pop element from the stack
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
    
    // Print stack contents (for debugging)
    print(): void {
        console.log(this.items.toString());
    }
}
class FixedSizeStack<T> {
    private items: T[];
    private capacity: number;
    private top: number;
    
    constructor(capacity: number) {
        this.items = new Array(capacity);
        this.capacity = capacity;
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
            throw new Error("Stack is empty");
        }
        const element = this.items[this.top];
        this.top--;
        return element;
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
// Using the basic stack
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek()); // 30
console.log(numberStack.pop());  // 30
console.log(numberStack.size()); // 2
console.log(numberStack.isEmpty()); // false

// Using with strings
const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");

// Using with custom objects
interface Person {
    name: string;
    age: number;
}

const personStack = new Stack<Person>();
personStack.push({ name: "Alice", age: 25 });
personStack.push({ name: "Bob", age: 30 });

// Using fixed size stack
const fixedStack = new FixedSizeStack<number>(3);
fixedStack.push(1);
fixedStack.push(2);
fixedStack.push(3);
// fixedStack.push(4); // This would throw "Stack overflow" error
class SafeStack<T> {
    private items: T[];
    
    constructor() {
        this.items = [];
    }
    
    push(element: T): void {
        this.items.push(element);
    }
    
    pop(): T | null {
        try {
            if (this.isEmpty()) {
                return null;
            }
            return this.items.pop() as T;
        } catch (error) {
            console.error("Error popping from stack:", error);
            return null;
        }
    }
    
    peek(): T | null {
        if (this.isEmpty()) {
            return null;
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
    
    toString(): string {
        return this.items.toString();
    }
}
