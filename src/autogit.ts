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
        return this.items.pop();
    }
    
    // Peek at the top element without removing it
    peek(): T | undefined {
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
    
    // Print the stack (useful for debugging)
    print(): void {
        console.log(this.items.toString());
    }
}
class StackWithCapacity<T> {
    private items: T[];
    private capacity: number;
    
    constructor(capacity: number) {
        this.items = [];
        this.capacity = capacity;
    }
    
    push(element: T): boolean {
        if (this.isFull()) {
            console.warn("Stack is full. Cannot push element.");
            return false;
        }
        this.items.push(element);
        return true;
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    isFull(): boolean {
        return this.items.length >= this.capacity;
    }
    
    size(): number {
        return this.items.length;
    }
    
    clear(): void {
        this.items = [];
    }
}
// Example with number stack
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(numberStack.peek()); // 30
console.log(numberStack.pop());  // 30
console.log(numberStack.size()); // 2

// Example with string stack
const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
stringStack.push("!");

while (!stringStack.isEmpty()) {
    console.log(stringStack.pop()); // "!", "World", "Hello"
}

// Example with capacity limit
const limitedStack = new StackWithCapacity<number>(3);
limitedStack.push(1); // true
limitedStack.push(2); // true
limitedStack.push(3); // true
limitedStack.push(4); // false (stack is full)
function isBalancedParentheses(expression: string): boolean {
    const stack = new Stack<string>();
    
    for (const char of expression) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.isEmpty()) {
                return false;
            }
            stack.pop();
        }
    }
    
    return stack.isEmpty();
}

// Test the function
console.log(isBalancedParentheses("((a+b))")); // true
console.log(isBalancedParentheses("((a+b)"));  // false
