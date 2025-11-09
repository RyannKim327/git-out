/**
 * Interface defining the contract for a Stack data structure.
 * @template T The type of elements the stack will hold.
 */
interface IStack<T> {
    /**
     * Adds an element to the top of the stack.
     * @param item The element to add.
     */
    push(item: T): void;

    /**
     * Removes and returns the element at the top of the stack.
     * Returns undefined if the stack is empty.
     */
    pop(): T | undefined;

    /**
     * Returns the element at the top of the stack without removing it.
     * Returns undefined if the stack is empty.
     */
    peek(): T | undefined;

    /**
     * Checks if the stack is empty.
     * @returns True if the stack is empty, false otherwise.
     */
    isEmpty(): boolean;

    /**
     * Returns the number of elements in the stack.
     * @returns The current size of the stack.
     */
    size(): number;

    /**
     * Returns a string representation of the stack.
     * @returns A string like "[item1, item2, item3]"
     */
    toString(): string;
}

/**
 * Implements a Stack data structure using a TypeScript array.
 * This implementation uses the end of the array as the "top" of the stack
 * for O(1) performance on push, pop, and peek operations.
 * @template T The type of elements the stack will hold.
 */
class Stack<T> implements IStack<T> {
    private items: T[]; // The array to store stack elements

    constructor() {
        this.items = [];
    }

    /**
     * Adds an element to the top of the stack.
     * Time Complexity: O(1) - Amortized constant time.
     * @param item The element to add.
     */
    push(item: T): void {
        this.items.push(item);
    }

    /**
     * Removes and returns the element at the top of the stack.
     * Returns undefined if the stack is empty.
     * Time Complexity: O(1) - Constant time.
     * @returns The removed element, or undefined if the stack was empty.
     */
    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined; // Stack is empty, nothing to pop
        }
        return this.items.pop(); // Array's pop method removes from the end
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * Returns undefined if the stack is empty.
     * Time Complexity: O(1) - Constant time.
     * @returns The top element, or undefined if the stack was empty.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined; // Stack is empty, no element to peek
        }
        // Access the last element of the array
        return this.items[this.items.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * Time Complexity: O(1) - Constant time.
     * @returns True if the stack contains no elements, false otherwise.
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * Time Complexity: O(1) - Constant time.
     * @returns The current number of elements in the stack.
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Returns a string representation of the stack, with the top element
     * being the rightmost in the string.
     * @returns A string like "[item1, item2, item3]"
     */
    toString(): string {
        return `[${this.items.join(', ')}]`;
    }
}

// --- Example Usage ---

console.log("--- Number Stack ---");
const numberStack = new Stack<number>();

console.log("Is empty?", numberStack.isEmpty()); // true
console.log("Size:", numberStack.size());         // 0
console.log("Stack:", numberStack.toString());    // []
console.log("Pop from empty:", numberStack.pop()); // undefined
console.log("Peek from empty:", numberStack.peek()); // undefined

numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log("Stack:", numberStack.toString());    // [10, 20, 30]
console.log("Size:", numberStack.size());         // 3
console.log("Is empty?", numberStack.isEmpty()); // false
console.log("Peek:", numberStack.peek());         // 30

const poppedItem = numberStack.pop();
console.log("Popped:", poppedItem);             // 30
console.log("Stack after pop:", numberStack.toString()); // [10, 20]
console.log("Size after pop:", numberStack.size()); // 2
console.log("Peek after pop:", numberStack.peek()); // 20

numberStack.push(40);
console.log("Stack after push:", numberStack.toString()); // [10, 20, 40]
console.log("Peek after push:", numberStack.peek()); // 40

while (!numberStack.isEmpty()) {
    console.log(`Popping: ${numberStack.pop()}, Remaining: ${numberStack.toString()}`);
}
console.log("Is empty now?", numberStack.isEmpty()); // true


console.log("\n--- String Stack ---");
const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
stringStack.push("typescript");
console.log("String Stack:", stringStack.toString()); // [hello, world, typescript]
console.log("String Peek:", stringStack.peek());     // typescript
console.log("String Pop:", stringStack.pop());       // typescript
console.log("String Stack:", stringStack.toString()); // [hello, world]
