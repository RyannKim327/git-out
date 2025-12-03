class Stack<T> {
    private elements: T[] = [];
    private readonly capacity: number;

    /**
     * Creates a new Stack instance.
     * @param capacity Optional maximum size of the stack (default = Infinity)
     */
    constructor(capacity: number = Infinity) {
        this.capacity = capacity;
    }

    /**
     * Adds an element to the top of the stack
     * @param element Element to add
     * @throws {Error} If stack is full
     */
    push(element: T): void {
        if (this.isFull()) {
            throw new Error("Stack overflow: Cannot push to a full stack");
        }
        this.elements.push(element);
    }

    /**
     * Removes and returns the top element of the stack
     * @returns Top element or undefined if empty
     * @throws {Error} If stack is empty
     */
    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: Cannot pop from an empty stack");
        }
        return this.elements.pop()!;
    }

    /**
     * Returns the top element without removing it
     * @returns Top element or undefined if empty
     */
    peek(): T | undefined {
        return this.elements[this.elements.length - 1];
    }

    /**
     * Checks if the stack is empty
     * @returns True if stack is empty, false otherwise
     */
    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    /**
     * Checks if the stack is full
     * @returns True if stack is full, false otherwise
     */
    isFull(): boolean {
        return this.elements.length >= this.capacity;
    }

    /**
     * Gets the current number of elements in the stack
     * @returns Number of elements
     */
    size(): number {
        return this.elements.length;
    }

    /**
     * Removes all elements from the stack
     */
    clear(): void {
        this.elements = [];
    }
}
// Create a number stack with capacity 3
const numberStack = new Stack<number>(3);

// Push elements
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log(numberStack.peek());  // 3
console.log(numberStack.size());  // 3
console.log(numberStack.isFull()); // true

try {
    numberStack.push(4); // Throws "Stack overflow" error
} catch (e) {
    console.error(e.message);
}

console.log(numberStack.pop()); // 3
console.log(numberStack.pop()); // 2
console.log(numberStack.isEmpty()); // false

numberStack.clear();
console.log(numberStack.isEmpty()); // true
const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");

console.log(stringStack.pop()); // "World"
console.log(stringStack.peek()); // "Hello"
