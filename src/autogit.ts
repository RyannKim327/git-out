// Node class representing each element in the linked list
class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// Queue class implementing the queue using a linked list
class Queue<T> {
    private front: Node<T> | null;
    private back: Node<T> | null;
    private size: number;

    constructor() {
        this.front = null;
        this.back = null;
        this.size = 0;
    }

    // Add an element to the back of the queue
    enqueue(value: T): void {
        const newNode = new Node(value);
        if (this.back) {
            this.back.next = newNode; // Link the old back to the new node
        }
        this.back = newNode; // Update the back to the new node
        if (!this.front) {
            this.front = newNode; // If the queue was empty, set front to the new node
        }
        this.size++;
    }

    // Remove and return the front element of the queue
    dequeue(): T | null {
        if (!this.front) {
            return null; // Queue is empty
        }
        const value = this.front.value; // Get the value from the front node
        this.front = this.front.next; // Move front to the next node
        if (!this.front) {
            this.back = null; // If the queue is now empty, set back to null
        }
        this.size--;
        return value;
    }

    // Peek at the front element without removing it
    peek(): T | null {
        return this.front ? this.front.value : null;
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.size === 0;
    }

    // Get the size of the queue
    getSize(): number {
        return this.size;
    }
}

// Example usage
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // Output: 1
console.log(queue.peek());    // Output: 2
console.log(queue.getSize()); // Output: 2
console.log(queue.isEmpty());  // Output: false
