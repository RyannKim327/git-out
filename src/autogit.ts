interface IStack<T> {
    /**
     * Adds an element to the top of the stack.
     * @param item The element to add.
     */
    push(item: T): void;

    /**
     * Removes and returns the element at the top of the stack.
     * Returns `undefined` if the stack is empty.
     */
    pop(): T | undefined;

    /**
     * Returns the element at the top of the stack without removing it.
     * Returns `undefined` if the stack is empty.
     */
    peek(): T | undefined;

    /**
     * Checks if the stack is empty.
     * @returns `true` if the stack contains no elements, `false` otherwise.
     */
    isEmpty(): boolean;

    /**
     * Returns the number of elements in the stack.
     */
    size(): number;

    /**
     * Removes all elements from the stack.
     */
    clear(): void;
}
class ArrayStack<T> implements IStack<T> {
    private elements: T[]; // The array to store stack elements

    constructor() {
        this.elements = []; // Initialize an empty array
    }

    /**
     * Adds an element to the top of the stack.
     * Corresponds to `array.push()`.
     */
    push(item: T): void {
        this.elements.push(item);
    }

    /**
     * Removes and returns the element at the top of the stack.
     * Corresponds to `array.pop()`.
     * Returns `undefined` if the stack is empty.
     */
    pop(): T | undefined {
        // `pop()` on an empty array returns undefined, which matches our interface.
        return this.elements.pop();
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * Accesses the last element of the array.
     * Returns `undefined` if the stack is empty.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.elements[this.elements.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * @returns `true` if the stack contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     */
    size(): number {
        return this.elements.length;
    }

    /**
     * Removes all elements from the stack.
     * Resets the internal array.
     */
    clear(): void {
        this.elements = [];
    }
}
// --- Example 1: Stack of Numbers ---
console.log("--- Stack of Numbers ---");
const numberStack = new ArrayStack<number>();

console.log("Is empty?", numberStack.isEmpty()); // true
console.log("Size:", numberStack.size());       // 0

numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log("Pushed 10, 20, 30");
console.log("Is empty?", numberStack.isEmpty()); // false
console.log("Size:", numberStack.size());       // 3
console.log("Peek:", numberStack.peek());       // 30 (top element)

let poppedItem = numberStack.pop();
console.log("Popped:", poppedItem);             // 30
console.log("Size after pop:", numberStack.size()); // 2
console.log("Peek after pop:", numberStack.peek()); // 20

numberStack.push(40);
console.log("Pushed 40");
console.log("Peek:", numberStack.peek());       // 40
console.log("Size:", numberStack.size());       // 3

while (!numberStack.isEmpty()) {
    console.log("Popping:", numberStack.pop());
}
console.log("Is empty after popping all?", numberStack.isEmpty()); // true
console.log("Popping from empty stack:", numberStack.pop()); // undefined

// --- Example 2: Stack of Strings ---
console.log("\n--- Stack of Strings ---");
const stringStack = new ArrayStack<string>();

stringStack.push("Apple");
stringStack.push("Banana");
stringStack.push("Cherry");

console.log("String Stack Size:", stringStack.size());   // 3
console.log("String Stack Peek:", stringStack.peek());   // Cherry
console.log("Popped string:", stringStack.pop());         // Cherry
console.log("Popped string:", stringStack.pop());         // Banana

stringStack.clear();
console.log("String Stack after clear - Size:", stringStack.size()); // 0
console.log("String Stack after clear - Is empty:", stringStack.isEmpty()); // true

// --- Example 3: Stack of Custom Objects ---
console.log("\n--- Stack of Custom Objects ---");

interface User {
    id: number;
    name: string;
}

const userStack = new ArrayStack<User>();

userStack.push({ id: 1, name: "Alice" });
userStack.push({ id: 2, name: "Bob" });

console.log("User Stack Size:", userStack.size());   // 2
console.log("User Stack Peek:", userStack.peek());   // { id: 2, name: "Bob" }
const poppedUser = userStack.pop();
console.log("Popped User:", poppedUser?.name);         // Bob
