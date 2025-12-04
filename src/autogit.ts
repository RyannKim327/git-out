/**
 * A generic Stack implementation using a TypeScript array.
 * @template T The type of elements stored in the stack.
 */
class Stack<T> {
    private items: T[] = []; // The internal array to store stack elements

    /**
     * Creates an instance of Stack.
     * Optionally initializes the stack with an array of elements.
     * @param initialItems An optional array of items to initialize the stack.
     */
    constructor(initialItems?: T[]) {
        if (initialItems) {
            this.items = [...initialItems]; // Create a shallow copy to avoid reference issues
        }
    }

    /**
     * Adds an element to the top of the stack.
     * @param element The element to be added.
     */
    push(element: T): void {
        this.items.push(element);
    }

    /**
     * Removes and returns the element at the top of the stack.
     * Returns `undefined` if the stack is empty.
     * @returns The element removed from the top of the stack, or `undefined` if the stack is empty.
     */
    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined; // Stack is empty, nothing to pop
        }
        return this.items.pop(); // Array's pop method removes and returns the last element
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * Returns `undefined` if the stack is empty.
     * @returns The element at the top of the stack, or `undefined` if the stack is empty.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined; // Stack is empty, nothing to peek
        }
        // Access the last element without removing it
        return this.items[this.items.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * @returns `true` if the stack contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * @returns The number of elements in the stack.
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Clears all elements from the stack.
     */
    clear(): void {
        this.items = [];
    }

    /**
     * Returns a string representation of the stack, with the top element listed last.
     * @returns A string representation of the stack.
     */
    toString(): string {
        return this.items.join(', ');
    }
}

// --- Example Usage ---

console.log("--- Number Stack ---");
const numberStack = new Stack<number>();

console.log("Is stack empty?", numberStack.isEmpty()); // true
console.log("Stack size:", numberStack.size());       // 0

numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log("Pushed 10, 20, 30. Stack:", numberStack.toString()); // "10, 20, 30"
console.log("Stack size:", numberStack.size());                 // 3
console.log("Top element (peek):", numberStack.peek());         // 30

console.log("Pop:", numberStack.pop());                         // 30
console.log("Stack after pop:", numberStack.toString());         // "10, 20"
console.log("Top element (peek):", numberStack.peek());         // 20

numberStack.push(40);
console.log("Pushed 40. Stack:", numberStack.toString());         // "10, 20, 40"
console.log("Pop:", numberStack.pop());                         // 40
console.log("Pop:", numberStack.pop());                         // 20
console.log("Pop:", numberStack.pop());                         // 10

console.log("Is stack empty?", numberStack.isEmpty()); // true
console.log("Pop from empty stack:", numberStack.pop()); // undefined
console.log("Peek from empty stack:", numberStack.peek()); // undefined

console.log("\n--- String Stack ---");
const stringStack = new Stack<string>(["apple", "banana"]); // Initialize with items
console.log("Initial String Stack:", stringStack.toString()); // "apple, banana"
stringStack.push("cherry");
console.log("Pushed cherry. Stack:", stringStack.toString()); // "apple, banana, cherry"
console.log("Pop:", stringStack.pop());                       // "cherry"
console.log("Stack size:", stringStack.size());               // 2
stringStack.clear();
console.log("Cleared stack. Is empty?", stringStack.isEmpty()); // true
