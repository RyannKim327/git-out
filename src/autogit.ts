class Node<T> {
    value: T;
    next: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}
class Queue<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private length: number = 0;

    // Add item to the end (enqueue)
    enqueue(value: T): void {
        const node = new Node(value);
        if (!this.tail) { // queue is empty
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    // Remove item from front (dequeue)
    dequeue(): T | undefined {
        if (!this.head) return undefined;
        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) { // queue is now empty
            this.tail = null;
        }
        this.length--;
        return value;
    }

    // Peek at front item
    peek(): T | undefined {
        return this.head?.value;
    }

    // Get current size
    size(): number {
        return this.length;
    }

    // Check if empty
    isEmpty(): boolean {
        return this.length === 0;
    }
}
const queue = new Queue<number>();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log(queue.dequeue()); // 10
console.log(queue.peek());    // 20
console.log(queue.size());    // 2
console.log(queue.isEmpty()); // false
