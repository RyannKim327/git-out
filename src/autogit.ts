interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
}

class ArrayStack<T> implements IStack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    clear(): void {
        this.items = [];
    }

    // Optional: Convert stack to array for debugging
    toArray(): T[] {
        return [...this.items];
    }
}
// Number stack example
const numberStack = new ArrayStack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log("Size:", numberStack.size()); // Output: 3
console.log("Peek:", numberStack.peek()); // Output: 3
console.log("Pop:", numberStack.pop());   // Output: 3
console.log("Size after pop:", numberStack.size()); // Output: 2

// String stack example
const stringStack = new ArrayStack<string>();
stringStack.push("Hello");
stringStack.push("World");

console.log("Stack contents:", stringStack.toArray());
class FixedCapacityStack<T> implements IStack<T> {
    private items: T[];
    private capacity: number;

    constructor(capacity: number) {
        this.items = [];
        this.capacity = capacity;
    }

    push(item: T): void {
        if (this.items.length >= this.capacity) {
            throw new Error("Stack overflow: Cannot push to a full stack");
        }
        this.items.push(item);
    }

    pop(): T | undefined {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: Cannot pop from an empty stack");
        }
        return this.items.pop();
    }

    peek(): T | undefined {
        if (this.isEmpty()) {
            throw new Error("Cannot peek an empty stack");
        }
        return this.items[this.items.length - 1];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    isFull(): boolean {
        return this.items.length === this.capacity;
    }

    clear(): void {
        this.items = [];
    }
}
class EnhancedStack<T> implements IStack<T> {
    private items: T[];

    constructor(initialItems?: T[]) {
        this.items = initialItems ? [...initialItems] : [];
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        if (this.isEmpty()) {
            console.warn("Attempting to pop from an empty stack");
            return undefined;
        }
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    clear(): void {
        this.items = [];
    }

    // Additional utility methods
    contains(item: T): boolean {
        return this.items.includes(item);
    }

    search(item: T): number {
        const index = this.items.lastIndexOf(item);
        return index !== -1 ? this.items.length - index : -1;
    }

    reverse(): void {
        this.items.reverse();
    }

    // Create a copy of the stack
    clone(): EnhancedStack<T> {
        return new EnhancedStack([...this.items]);
    }
}
// Using the enhanced stack
const stack = new EnhancedStack<number>();

// Push multiple items
[1, 2, 3, 4, 5].forEach(num => stack.push(num));

console.log("Stack size:", stack.size());
console.log("Contains 3:", stack.contains(3));
console.log("Position of 2:", stack.search(2));

// Reverse the stack
stack.reverse();
console.log("After reverse:", stack.toArray());

// Clone the stack
const clonedStack = stack.clone();
console.log("Cloned stack:", clonedStack.toArray());
function testStack() {
    const stack = new ArrayStack<number>();
    
    // Test push and size
    stack.push(10);
    stack.push(20);
    console.assert(stack.size() === 2, "Size should be 2");
    
    // Test peek
    console.assert(stack.peek() === 20, "Peek should return 20");
    
    // Test pop
    console.assert(stack.pop() === 20, "Pop should return 20");
    console.assert(stack.size() === 1, "Size should be 1 after pop");
    
    // Test isEmpty
    console.assert(!stack.isEmpty(), "Stack should not be empty");
    stack.pop();
    console.assert(stack.isEmpty(), "Stack should be empty");
    
    console.log("All tests passed!");
}

testStack();
