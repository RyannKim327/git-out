class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedListQueue<T> {
    private front: ListNode<T> | null;
    private rear: ListNode<T> | null;
    private _size: number;

    constructor() {
        this.front = null;
        this.rear = null;
        this._size = 0;
    }

    // Add element to the end of the queue
    enqueue(value: T): void {
        const newNode = new ListNode(value);

        if (this.isEmpty()) {
            // If queue is empty, both front and rear point to new node
            this.front = newNode;
            this.rear = newNode;
        } else {
            // Add new node at the end and update rear
            this.rear!.next = newNode;
            this.rear = newNode;
        }

        this._size++;
    }

    // Remove and return element from the front of the queue
    dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        // Store front node to return later
        const removedNode = this.front!;
        
        // Move front to the next node
        this.front = this.front!.next;

        // If front becomes null, then rear should also become null
        if (this.front === null) {
            this.rear = null;
        }

        this._size--;
        return removedNode.value;
    }

    // View the front element without removing it
    peek(): T | null {
        return this.front?.value ?? null;
    }

    // Check if queue is empty
    isEmpty(): boolean {
        return this.front === null;
    }

    // Get the size of the queue
    get size(): number {
        return this._size;
    }

    // Convert queue to array (for debugging/display)
    toArray(): T[] {
        const result: T[] = [];
        let current = this.front;
        
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        
        return result;
    }

    // Clear the queue
    clear(): void {
        this.front = null;
        this.rear = null;
        this._size = 0;
    }
}
class LinkedListQueueEnhanced<T> {
    private front: ListNode<T> | null;
    private rear: ListNode<T> | null;
    private _size: number;

    constructor() {
        this.front = null;
        this.rear = null;
        this._size = 0;
    }

    enqueue(value: T): void {
        const newNode = new ListNode(value);

        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear!.next = newNode;
            this.rear = newNode;
        }

        this._size++;
    }

    dequeue(): T {
        if (this.isEmpty()) {
            throw new Error("Queue is empty. Cannot dequeue.");
        }

        const removedNode = this.front!;
        this.front = this.front!.next;

        if (this.front === null) {
            this.rear = null;
        }

        this._size--;
        return removedNode.value;
    }

    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Queue is empty. Cannot peek.");
        }
        return this.front!.value;
    }

    isEmpty(): boolean {
        return this.front === null;
    }

    get size(): number {
        return this._size;
    }

    toArray(): T[] {
        const result: T[] = [];
        let current = this.front;
        
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        
        return result;
    }

    clear(): void {
        this.front = null;
        this.rear = null;
        this._size = 0;
    }

    *[Symbol.iterator](): IterableIterator<T> {
        let current = this.front;
        while (current !== null) {
            yield current.value;
            current = current.next;
        }
    }
}
// Basic usage
const queue = new LinkedListQueue<number>();

// Enqueue elements
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.toArray()); // [1, 2, 3]
console.log(queue.peek());    // 1
console.log(queue.size);      // 3

// Dequeue elements
console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2
console.log(queue.isEmpty()); // false

// String queue
const stringQueue = new LinkedListQueue<string>();
stringQueue.enqueue("hello");
stringQueue.enqueue("world");
console.log(stringQueue.dequeue()); // "hello"

// Using iterator (enhanced version)
const enhancedQueue = new LinkedListQueueEnhanced<number>();
enhancedQueue.enqueue(10);
enhancedQueue.enqueue(20);
enhancedQueue.enqueue(30);

for (const item of enhancedQueue) {
    console.log(item); // 10, 20, 30
}
