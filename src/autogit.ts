// node.ts or within the same file
class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null; // Initially, this node doesn't point to anything
    }
}
// queue.ts or within the same file

// (Optional) Define an interface for the Queue for better type safety
interface IQueue<T> {
    enqueue(value: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    readonly size: number;
    toArray(): T[]; // For easy visualization/debugging
}

class Queue<T> implements IQueue<T> {
    private head: Node<T> | null; // Front of the queue
    private tail: Node<T> | null; // Back of the queue
    private _size: number;       // Keep track of the number of elements

    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /**
     * Adds an element to the back (tail) of the queue.
     * Time complexity: O(1)
     * @param value The value to add to the queue.
     */
    enqueue(value: T): void {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            // If the queue is empty, the new node is both head and tail
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Otherwise, link the current tail to the new node and update the tail
            this.tail!.next = newNode; // '!' asserts that tail is not null
            this.tail = newNode;
        }
        this._size++;
    }

    /**
     * Removes and returns the element from the front (head) of the queue.
     * Returns `undefined` if the queue is empty.
     * Time complexity: O(1)
     * @returns The value removed from the queue, or `undefined` if the queue was empty.
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined; // Nothing to dequeue
        }

        const value = this.head!.value; // '!' asserts that head is not null
        this.head = this.head!.next;    // Move head to the next node
        this._size--;

        if (this.head === null) {
            // If head became null, the queue is now empty, so tail should also be null
            this.tail = null;
        }

        return value;
    }

    /**
     * Returns the element at the front (head) of the queue without removing it.
     * Returns `undefined` if the queue is empty.
     * Time complexity: O(1)
     * @returns The value at the front of the queue, or `undefined` if the queue was empty.
     */
    peek(): T | undefined {
        return this.head?.value; // Uses optional chaining for concise check
    }

    /**
     * Checks if the queue is empty.
     * Time complexity: O(1)
     * @returns `true` if the queue contains no elements, `false` otherwise.
     */
    isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * Returns the number of elements in the queue.
     * Time complexity: O(1)
     * @returns The current size of the queue.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Converts the queue to an array for easy inspection/debugging.
     * Time complexity: O(N)
     * @returns An array containing all elements in the queue, from front to back.
     */
    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}
// Create a queue for strings
const stringQueue = new Queue<string>();

console.log("Is empty?", stringQueue.isEmpty()); // true
console.log("Size:", stringQueue.size);       // 0
console.log("Peek (empty):", stringQueue.peek()); // undefined
console.log("Dequeue (empty):", stringQueue.dequeue()); // undefined

// Enqueue elements
stringQueue.enqueue("Alice");
stringQueue.enqueue("Bob");
stringQueue.enqueue("Charlie");
console.log("\nEnqueued Alice, Bob, Charlie.");
console.log("Queue content:", stringQueue.toArray()); // ["Alice", "Bob", "Charlie"]
console.log("Size:", stringQueue.size);       // 3
console.log("Peek:", stringQueue.peek());     // Alice

// Dequeue elements
console.log("\nDequeued:", stringQueue.dequeue()); // Alice
console.log("Queue content:", stringQueue.toArray()); // ["Bob", "Charlie"]
console.log("Size:", stringQueue.size);       // 2
console.log("Peek:", stringQueue.peek());     // Bob

stringQueue.enqueue("David");
console.log("\nEnqueued David.");
console.log("Queue content:", stringQueue.toArray()); // ["Bob", "Charlie", "David"]
console.log("Size:", stringQueue.size);       // 3

console.log("\nDequeued:", stringQueue.dequeue()); // Bob
console.log("Dequeued:", stringQueue.dequeue()); // Charlie
console.log("Dequeued:", stringQueue.dequeue()); // David (Queue is now empty)
console.log("Queue content:", stringQueue.toArray()); // []
console.log("Size:", stringQueue.size);          // 0
console.log("Is empty?", stringQueue.isEmpty()); // true
console.log("Peek (empty):", stringQueue.peek()); // undefined
