interface IQueueNode<T> {
    value: T;
    next: IQueueNode<T> | null;
}

class QueueNode<T> implements IQueueNode<T> {
    constructor(
        public value: T,
        public next: IQueueNode<T> | null = null
    ) {}
}
interface IQueue<T> {
    enqueue(value: T): void;
    dequeue(): T | null;
    peek(): T | null;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
}

class LinkedListQueue<T> implements IQueue<T> {
    private front: IQueueNode<T> | null = null;
    private rear: IQueueNode<T> | null = null;
    private count: number = 0;

    // Add element to the rear of the queue
    enqueue(value: T): void {
        const newNode = new QueueNode(value);
        
        if (this.isEmpty()) {
            // If queue is empty, both front and rear point to new node
            this.front = newNode;
            this.rear = newNode;
        } else {
            // Add new node at the end and update rear
            this.rear!.next = newNode;
            this.rear = newNode;
        }
        this.count++;
    }

    // Remove and return element from the front of the queue
    dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        const removedValue = this.front!.value;
        this.front = this.front!.next;
        this.count--;

        // If queue becomes empty, update rear to null
        if (this.isEmpty()) {
            this.rear = null;
        }

        return removedValue;
    }

    // Return the front element without removing it
    peek(): T | null {
        return this.front?.value ?? null;
    }

    // Check if queue is empty
    isEmpty(): boolean {
        return this.count === 0;
    }

    // Get the number of elements in the queue
    size(): number {
        return this.count;
    }

    // Clear all elements from the queue
    clear(): void {
        this.front = null;
        this.rear = null;
        this.count = 0;
    }

    // Optional: Convert queue to array for debugging/display
    toArray(): T[] {
        const result: T[] = [];
        let current = this.front;
        
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        
        return result;
    }

    // Optional: Print the queue (for debugging)
    print(): void {
        console.log(this.toArray().join(' -> '));
    }
}
// Example usage
const queue = new LinkedListQueue<number>();

// Enqueue elements
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log('Queue after enqueuing 10, 20, 30:');
queue.print(); // Output: 10 -> 20 -> 30

console.log('Front element:', queue.peek()); // Output: 10
console.log('Queue size:', queue.size()); // Output: 3

// Dequeue elements
console.log('Dequeued:', queue.dequeue()); // Output: 10
console.log('Dequeued:', queue.dequeue()); // Output: 20

queue.print(); // Output: 30

queue.enqueue(40);
queue.enqueue(50);

console.log('After adding 40 and 50:');
queue.print(); // Output: 30 -> 40 -> 50

console.log('Is empty?', queue.isEmpty()); // Output: false

// Clear the queue
queue.clear();
console.log('After clear - Is empty?', queue.isEmpty()); // Output: true
// Example with strings
const stringQueue = new LinkedListQueue<string>();

stringQueue.enqueue('Apple');
stringQueue.enqueue('Banana');
stringQueue.enqueue('Cherry');

console.log('String queue:', stringQueue.toArray()); // Output: ['Apple', 'Banana', 'Cherry']
console.log('Dequeued:', stringQueue.dequeue()); // Output: 'Apple'
