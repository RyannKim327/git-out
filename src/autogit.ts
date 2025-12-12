// Node class for the linked list
class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

// Queue implementation using linked list
class Queue<T> {
  private front: QueueNode<T> | null;
  private rear: QueueNode<T> | null;
  private size: number;

  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  // Add an element to the end of the queue (enqueue)
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

  // Remove and return the front element (dequeue)
  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    
    const removedValue = this.front!.value;
    this.front = this.front!.next;
    
    // If the queue becomes empty after dequeue
    if (this.front === null) {
      this.rear = null;
    }
    
    this.size--;
    return removedValue;
  }

  // Get the front element without removing it
  peek(): T | null {
    return this.front?.value ?? null;
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Get the current size of the queue
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

  // Print the queue (for debugging)
  print(): void {
    console.log(this.toArray().join(' -> '));
  }
}

// Example usage
const queue = new Queue<number>();

// Enqueue operations
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log('Queue after enqueues:');
queue.print(); // Output: 10 -> 20 -> 30

// Peek operation
console.log('Front element:', queue.peek()); // Output: 10

// Dequeue operations
console.log('Dequeued:', queue.dequeue()); // Output: 10
console.log('Dequeued:', queue.dequeue()); // Output: 20

console.log('Queue after dequeues:');
queue.print(); // Output: 30

// Check if empty
console.log('Is empty:', queue.isEmpty()); // Output: false

// Get size
console.log('Size:', queue.getSize()); // Output: 1

// Clear queue
queue.clear();
console.log('Is empty after clear:', queue.isEmpty()); // Output: true
class SimpleQueue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;
  private length = 0;

  enqueue(value: T): void {
    const node = new QueueNode(value);
    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = this.tail = node;
    }
    this.length++;
  }

  dequeue(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  get isEmpty(): boolean {
    return this.length === 0;
  }

  get size(): number {
    return this.length;
  }
}
