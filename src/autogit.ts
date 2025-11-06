class Stack<T> {
  private items: T[] = [];

  // Add an item to the top (push)
  push(element: T): void {
    this.items.push(element);
  }

  // Remove and return the top item (pop)
  pop(): T | undefined {
    return this.items.pop();
  }

  // Look at the top item without removing it
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

  // Optional: clear the stack
  clear(): void {
    this.items = [];
  }
}
const stack = new Stack<number>();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.pop());  // 20
console.log(stack.isEmpty()); // false
