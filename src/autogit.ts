class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    // Push element onto the stack
    push(element: T): void {
        this.items.push(element);
    }

    // Remove and return top element
    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack underflow - Cannot pop from empty stack");
        }
        return this.items.pop() as T;
    }

    // View top element without removal
    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get stack size
    size(): number {
        return this.items.length;
    }

    // Clear the stack
    clear(): void {
        this.items = [];
    }

    // Print stack contents (optional)
    print(): void {
        console.log(this.items.toString());
    }
}

// Example Usage
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek());  // Output: 30
console.log(numberStack.pop());   // Output: 30
console.log(numberStack.size());  // Output: 2
console.log(numberStack.isEmpty()); // Output: false
numberStack.print();             // Output: 10,20
