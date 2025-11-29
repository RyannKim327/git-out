class Stack<T> {
    private elements: T[];
    private readonly capacity: number | undefined;

    /**
     * @param capacity Optional maximum size for the stack
     */
    constructor(capacity?: number) {
        this.elements = [];
        this.capacity = capacity;
    }

    /**
     * Add an item to the top of the stack
     * @throws Error If stack is full
     */
    push(item: T): void {
        if (this.isFull()) {
            throw new Error("Stack overflow: Cannot push to a full stack");
        }
        this.elements.push(item);
    }

    /**
     * Remove and return the top item from the stack
     * @throws Error If stack is empty
     */
    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: Cannot pop from an empty stack");
        }
        return this.elements.pop() as T;
    }

    /** Return the top item without removing it */
    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.elements[this.elements.length - 1];
    }

    /** Check if stack is empty */
    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    /** Check if stack is full (only when capacity is set) */
    isFull(): boolean {
        return this.capacity !== undefined && this.elements.length >= this.capacity;
    }

    /** Get current number of elements */
    size(): number {
        return this.elements.length;
    }

    /** Clear the stack */
    clear(): void {
        this.elements = [];
    }
}
// Create a stack with capacity 3
const numberStack = new Stack<number>(3);

numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek()); // 30
console.log(numberStack.size()); // 3
console.log(numberStack.isFull()); // true

try {
    numberStack.push(40); // Throws "Stack overflow" error
} catch (e) {
    console.error(e.message);
}

numberStack.pop();

console.log(numberStack.size()); // 2
console.log(numberStack.peek()); // 20
