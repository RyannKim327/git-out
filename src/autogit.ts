/**
 * Represents a single node in the linked list.
 * @template T The type of the value stored in the node.
 */
class Node<T> {
    value: T;
    next: Node<T> | null; // Reference to the next node in the list

    constructor(value: T) {
        this.value = value;
        this.next = null; // Initially, a new node doesn't point to anything
    }
}
/**
 * Implements a Queue data structure using a singly linked list.
 * Follows the FIFO (First-In, First-Out) principle.
 * @template T The type of elements stored in the queue.
 */
class Queue<T> {
    private head: Node<T> | null; // The front of the queue
    private tail: Node<T> | null; // The rear of the queue
    private _size: number;        // Current number of elements in the queue

    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /**
     * Adds an element to the rear of the queue.
     * @param value The element to add.
     * @returns The new size of the queue.
     * Time Complexity: O(1) - Constant time.
     */
    enqueue(value: T): number {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            // If the queue is empty, the new node is both head and tail
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Otherwise, link the current tail to the new node and update the tail
            this.tail!.next = newNode; // '!' asserts that tail is not null here
            this.tail = newNode;
        }

        this._size++;
        return this._size;
    }

    /**
     * Removes and returns the element from the front of the queue.
     * @returns The element removed, or `undefined` if the queue is empty.
     * Time Complexity: O(1) - Constant time.
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined; // Queue is empty, nothing to dequeue
        }

        const removedValue = this.head!.value; // '!' asserts that head is not null here
        this.head = this.head!.next;          // Move head to the next node

        if (this.head === null) {
            // If head became null, it means the queue is now empty
            this.tail = null; // So tail must also be null
        }

        this._size--;
        return removedValue;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * @returns The element at the front, or `undefined` if the queue is empty.
     * Time Complexity: O(1) - Constant time.
     */
    peek(): T | undefined {
        return this.head?.value; // Uses optional chaining for safe access
    }

    /**
     * Checks if the queue is empty.
     * @returns `true` if the queue is empty, `false` otherwise.
     * Time Complexity: O(1) - Constant time.
     */
    isEmpty(): boolean {
        return this.head === null; // Or this._size === 0
    }

    /**
     * Returns the number of elements in the queue.
     * @returns The current size of the queue.
     * Time Complexity: O(1) - Constant time.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Clears all elements from the queue.
     * Time Complexity: O(1) - Constant time.
     */
    clear(): void {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /**
     * Returns a string representation of the queue.
     * @returns A string like "Queue [1, 2, 3]"
     */
    toString(): string {
        if (this.isEmpty()) {
            return "Queue []";
        }
        let current = this.head;
        const elements: T[] = [];
        while (current) {
            elements.push(current.value);
            current = current.next;
        }
        return `Queue [${elements.join(', ')}]`;
    }
}
// Create a queue of numbers
const numberQueue = new Queue<number>();

console.log("Is empty?", numberQueue.isEmpty()); // true
console.log("Size:", numberQueue.size);         // 0

numberQueue.enqueue(10);
numberQueue.enqueue(20);
numberQueue.enqueue(30);

console.log("After enqueuing 10, 20, 30:");
console.log(numberQueue.toString());            // Queue [10, 20, 30]
console.log("Is empty?", numberQueue.isEmpty()); // false
console.log("Size:", numberQueue.size);         // 3
console.log("Front element (peek):", numberQueue.peek()); // 10

const dequeued1 = numberQueue.dequeue();
console.log("Dequeued:", dequeued1);            // 10
console.log(numberQueue.toString());            // Queue [20, 30]
console.log("Size:", numberQueue.size);         // 2
console.log("Front element (peek):", numberQueue.peek()); // 20

numberQueue.enqueue(40);
console.log("After enqueuing 40:");
console.log(numberQueue.toString());            // Queue [20, 30, 40]
console.log("Size:", numberQueue.size);         // 3

const dequeued2 = numberQueue.dequeue();
const dequeued3 = numberQueue.dequeue();
const dequeued4 = numberQueue.dequeue();

console.log("Dequeued all remaining:", dequeued2, dequeued3, dequeued4); // 20 30 40
console.log(numberQueue.toString());            // Queue []
console.log("Is empty?", numberQueue.isEmpty()); // true
console.log("Size:", numberQueue.size);         // 0
console.log("Front element (peek):", numberQueue.peek()); // undefined

const dequeuedEmpty = numberQueue.dequeue();
console.log("Dequeue from empty queue:", dequeuedEmpty); // undefined

// Create a queue of strings
const stringQueue = new Queue<string>();
stringQueue.enqueue("Alice");
stringQueue.enqueue("Bob");
console.log(stringQueue.toString());             // Queue [Alice, Bob]
console.log("Dequeued string:", stringQueue.dequeue()); // Alice
console.log(stringQueue.toString());             // Queue [Bob]

stringQueue.clear();
console.log("After clearing:", stringQueue.toString()); // Queue []
