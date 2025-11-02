// src/Node.ts
class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}
// src/LinkedListQueue.ts
import { Node } from './Node'; // Assuming Node.ts is in the same directory or properly imported

class LinkedListQueue<T> {
    private head: Node<T> | null; // Front of the queue
    private tail: Node<T> | null; // Back of the queue
    private _size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /**
     * Adds an element to the back (tail) of the queue.
     * @param item The element to add.
     */
    enqueue(item: T): void {
        const newNode = new Node(item);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Append new node to the current tail's next
            this.tail!.next = newNode;
            // Update tail to be the new node
            this.tail = newNode;
        }
        this._size++;
    }

    /**
     * Removes and returns the element from the front (head) of the queue.
     * Returns undefined if the queue is empty.
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const value = this.head!.value; // Store the value of the head
        this.head = this.head!.next;     // Move head to the next node

        // If head becomes null, the queue is now empty, so tail must also be null
        if (this.head === null) {
            this.tail = null;
        }
        this._size--;
        return value;
    }

    /**
     * Returns the element at the front (head) of the queue without removing it.
     * Returns undefined if the queue is empty.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.head!.value;
    }

    /**
     * Checks if the queue is empty.
     * @returns True if the queue is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this.head === null; // or this._size === 0;
    }

    /**
     * Returns the number of elements in the queue.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Clears all elements from the queue.
     */
    clear(): void {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /**
     * Converts the queue elements to an array (for debugging/inspection).
     * @returns An array containing all elements in the queue, from head to tail.
     */
    toArray(): T[] {
        const elements: T[] = [];
        let current = this.head;
        while (current !== null) {
            elements.push(current.value);
            current = current.next;
        }
        return elements;
    }

    /**
     * Returns a string representation of the queue.
     */
    toString(): string {
        return this.toArray().join(' -> ');
    }
}
// main.ts (or wherever you want to use the queue)
import { LinkedListQueue } from './LinkedListQueue';

const myQueue = new LinkedListQueue<string>();

console.log("Is queue empty?", myQueue.isEmpty()); // true
console.log("Queue size:", myQueue.size);       // 0

myQueue.enqueue("Apple");
myQueue.enqueue("Banana");
myQueue.enqueue("Cherry");

console.log("\nAfter enqueuing Apple, Banana, Cherry:");
console.log("Queue:", myQueue.toString());         // Apple -> Banana -> Cherry
console.log("Queue size:", myQueue.size);         // 3
console.log("Front element (peek):", myQueue.peek()); // Apple
console.log("Is queue empty?", myQueue.isEmpty()); // false

const dequeued1 = myQueue.dequeue();
console.log("\nDequeued:", dequeued1);             // Apple
console.log("Queue:", myQueue.toString());         // Banana -> Cherry
console.log("Queue size:", myQueue.size);         // 2
console.log("Front element (peek):", myQueue.peek()); // Banana

myQueue.enqueue("Date");
console.log("\nAfter enqueuing Date:");
console.log("Queue:", myQueue.toString());         // Banana -> Cherry -> Date
console.log("Queue size:", myQueue.size);         // 3

const dequeued2 = myQueue.dequeue();
const dequeued3 = myQueue.dequeue();
const dequeued4 = myQueue.dequeue();
console.log("\nDequeued three more times:", dequeued2, dequeued3, dequeued4); // Banana, Cherry, Date
console.log("Queue:", myQueue.toString());         // (empty string)
console.log("Queue size:", myQueue.size);         // 0
console.log("Front element (peek):", myQueue.peek()); // undefined
console.log("Is queue empty?", myQueue.isEmpty()); // true

const dequeuedEmpty = myQueue.dequeue();
console.log("\nAttempt to dequeue from empty queue:", dequeuedEmpty); // undefined

const numQueue = new LinkedListQueue<number>();
numQueue.enqueue(10);
numQueue.enqueue(20);
console.log("\nNumber Queue:", numQueue.toString()); // 10 -> 20
numQueue.clear();
console.log("Number Queue after clear:", numQueue.toString()); // (empty string)
console.log("Number Queue size:", numQueue.size);             // 0
