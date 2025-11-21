export class Stack<T> {
  private items: T[];

  /**
   * Creates a new Stack instance.
   * @param initialItems Optional initial items to populate the stack.
   * Can be a single item or an array of items.
   */
  constructor(initialItems?: T | T[]) {
    if (Array.isArray(initialItems)) {
      this.items = [...initialItems];
    } else if (initialItems !== undefined) {
      this.items = [initialItems];
    } else {
      this.items = [];
    }
  }

  /**
   * Adds an item to the top of the stack.
   * @param item The item to push onto the stack
   */
  push(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes and returns the top item from the stack.
   * @returns The top item or undefined if the stack is empty
   */
  pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * Returns the top item without removing it.
   * @returns The top item or undefined if the stack is empty
   */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Checks if the stack is empty.
   * @returns True if the stack is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Gets the current number of items in the stack.
   */
  get size(): number {
    return this.items.length;
  }

  /**
   * Removes all items from the stack.
   */
  clear(): void {
    this.items = [];
  }
}

// Example Usage
const numberStack = new Stack<number>([1, 2, 3]);
numberStack.push(4);          // [1, 2, 3, 4]
console.log(numberStack.pop()); // 4
console.log(numberStack.peek()); // 3
console.log(numberStack.size);   // 3

const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // "World"
console.log(stringStack.isEmpty()); // false
stringStack.clear();
console.log(stringStack.isEmpty()); // true
