// Define the node interface
interface QueueNode<T> {
    value: T;
    next: QueueNode<T> | null;
}

class Queue<T> {
    private front: QueueNode<T> | null;
    private rear: QueueNode<T> | null;
    private size: number;

    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    // Add element to the end of the queue
    enqueue(value: T): void {
        const newNode: QueueNode<T> = {
            value,
            next: null
        };

        if (this.rear === null) {
            // Queue is empty
            this.front = newNode;
            this.rear = newNode;
        } else {
            // Add to the end
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.size++;
    }

    // Remove element from the front of the queue
    dequeue(): T | null {
        if (this.front === null) {
            return null; // Queue is empty
        }

        const value = this.front.value;
        this.front = this.front.next;

        // If queue becomes empty, update rear as well
        if (this.front === null) {
            this.rear = null;
        }

        this.size--;
        return value;
    }

    // Get the front element without removing it
    peek(): T | null {
        return this.front?.value ?? null;
    }

    // Check if queue is empty
    isEmpty(): boolean {
        return this.front === null;
    }

    // Get the size of the queue
    getSize(): number {
        return this.size;
    }

    // Clear the queue
    clear(): void {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    // Convert queue to array (for debugging/testing)
    toArray(): T[] {
        const result: T[] = [];
        let current = this.front;
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}
class LinkedListQueue<T> {
    private head: QueueNode<T> | null;
    private tail: QueueNode<T> | null;
    private count: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    enqueue(item: T): void {
        const newNode: QueueNode<T> = {
            value: item,
            next: null
        };

        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.count++;
    }

    dequeue(): T {
        if (this.head === null) {
            throw new Error("Queue is empty");
        }

        const value = this.head.value;
        this.head = this.head.next;
        
        if (this.head === null) {
            this.tail = null;
        }
        
        this.count--;
        return value;
    }

    peek(): T {
        if (this.head === null) {
            throw new Error("Queue is empty");
        }
        return this.head.value;
    }

    get length(): number {
        return this.count;
    }

    get isEmpty(): boolean {
        return this.count === 0;
    }
}
// Basic usage
const queue = new Queue<number>();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.peek()); // 1
console.log(queue.dequeue()); // 1
console.log(queue.getSize()); // 2
console.log(queue.isEmpty()); // false

console.log(queue.toArray()); // [2, 3]

// String queue example
const stringQueue = new Queue<string>();
stringQueue.enqueue("first");
stringQueue.enqueue("second");
stringQueue.enqueue("third");

while (!stringQueue.isEmpty()) {
    console.log(stringQueue.dequeue());
}
// Output: first, second, third

// Advanced queue with error handling
const advancedQueue = new LinkedListQueue<number>();
try {
    advancedQueue.enqueue(10);
    advancedQueue.enqueue(20);
    console.log(advancedQueue.dequeue()); // 10
    console.log(advancedQueue.peek()); // 20
    console.log(advancedQueue.length); // 1
} catch (error) {
    console.error(error);
}
