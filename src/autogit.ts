class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class Queue<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private length: number = 0;

    // Add an element to the end of the queue
    enqueue(value: T): void {
        const newNode = new Node(value);
        if (this.tail) {
            this.tail.next = newNode; // Link the old tail to the new node
        }
        this.tail = newNode; // Update the tail to the new node
        if (!this.head) {
            this.head = newNode; // If the queue was empty, head is also the new node
        }
        this.length++;
    }

    // Remove and return the element from the front of the queue
    dequeue(): T | null {
        if (!this.head) {
            return null; // Queue is empty
        }
        const value = this.head.value; // Get the value from the head
        this.head = this.head.next; // Move the head to the next node
        if (!this.head) {
            this.tail = null; // If the queue is now empty, reset the tail
        }
        this.length--;
        return value;
    }

    // Peek at the front element without removing it
    peek(): T | null {
        return this.head ? this.head.value : null;
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.length === 0;
    }

    // Get the size of the queue
    size(): number {
        return this.length;
    }
}

// Example usage:
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // Output: 1
console.log(queue.peek());     // Output: 2
console.log(queue.size());     // Output: 2
console.log(queue.isEmpty());  // Output: false
