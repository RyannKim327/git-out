class QueueNode<T> {
    value: T;
    next: QueueNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
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
        const newNode = new QueueNode(value);
        
        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear!.next = newNode;
            this.rear = newNode;
        }
        
        this.size++;
    }

    // Remove element from the front of the queue
    dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        const removedValue = this.front!.value;
        this.front = this.front!.next;

        // If queue becomes empty after dequeue
        if (this.front === null) {
            this.rear = null;
        }

        this.size--;
        return removedValue;
    }

    // Get the front element without removing it
    peek(): T | null {
        return this.isEmpty() ? null : this.front!.value;
    }

    // Check if queue is empty
    isEmpty(): boolean {
        return this.size === 0;
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

    // Convert queue to array (for debugging/display purposes)
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

// Example usage:
const queue = new Queue<number>();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log(queue.toArray()); // [10, 20, 30]
console.log(queue.dequeue());  // 10
console.log(queue.peek());     // 20
console.log(queue.getSize());  // 2
console.log(queue.isEmpty());  // false

queue.clear();
console.log(queue.isEmpty());  // true
