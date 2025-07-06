// Node class to hold the value and reference to the next node
class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// Queue class that uses linked list
class Queue<T> {
    private head: Node<T> | null = null; // Front of the queue
    private tail: Node<T> | null = null; // End of the queue
    private length: number = 0; // Size of the queue

    // Add an item to the end of the queue
    enqueue(value: T): void {
        const newNode = new Node(value);
        if (this.tail) {
            this.tail.next = newNode; // Set the next of the current tail to the new node
        }
        this.tail = newNode; // Update the tail to the new node
        if (!this.head) {
            this.head = newNode; // If the queue was empty, head is also new node
        }
        this.length++;
    }

    // Remove and return the item from the front of the queue
    dequeue(): T | null {
        if (!this.head) {
            return null; // If the queue is empty, return null
        }
        const value = this.head.value; // Get the value to return
        this.head = this.head.next; // Move head to the next node
        if (!this.head) {
            this.tail = null; // If the queue is now empty, set tail to null
        }
        this.length--;
        return value; // Return the removed value
    }

    // Peek at the front item of the queue without removing it
    peek(): T | null {
        return this.head ? this.head.value : null;
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.length === 0;
    }

    // Get the number of items in the queue
    size(): number {
        return this.length;
    }
}

// Usage example
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.peek()); // Output: 1
console.log(queue.dequeue()); // Output: 1
console.log(queue.size()); // Output: 2
console.log(queue.isEmpty()); // Output: false
