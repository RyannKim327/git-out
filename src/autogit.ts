class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue<T> {
  private front: QueueNode<T> | null;
  private rear: QueueNode<T> | null;
  private size: number;

  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  // Enqueue: Add element to the rear
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

  // Dequeue: Remove element from the front
  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const removedValue = this.front!.value;
    this.front = this.front!.next;
    this.size--;

    // If queue becomes empty, update rear as well
    if (this.isEmpty()) {
      this.rear = null;
    }

    return removedValue;
  }

  // Peek: Get front element without removing
  peek(): T | null {
    return this.front?.value ?? null;
  }

  // Check if queue is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Get queue size
  getSize(): number {
    return this.size;
  }

  // Clear the queue
  clear(): void {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  // Convert queue to array (for debugging/display)
  toArray(): T[] {
    const result: T[] = [];
    let current = this.front;
    
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }
}
// Create a queue
const queue = new LinkedListQueue<number>();

// Enqueue elements
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log(queue.toArray()); // [10, 20, 30]
console.log(queue.peek());    // 10
console.log(queue.getSize()); // 3

// Dequeue elements
console.log(queue.dequeue()); // 10
console.log(queue.dequeue()); // 20
console.log(queue.toArray()); // [30]

// Check empty state
console.log(queue.isEmpty()); // false
console.log(queue.dequeue()); // 30
console.log(queue.isEmpty()); // true
console.log(queue.dequeue()); // null
class EnhancedLinkedListQueue<T> {
  private front: QueueNode<T> | null = null;
  private rear: QueueNode<T> | null = null;
  private size: number = 0;

  enqueue(value: T): void {
    const newNode = new QueueNode(value);
    
    if (this.isEmpty()) {
      this.front = newNode;
    } else {
      this.rear!.next = newNode;
    }
    
    this.rear = newNode;
    this.size++;
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const removedValue = this.front!.value;
    this.front = this.front!.next;
    this.size--;

    if (this.isEmpty()) {
      this.rear = null;
    }

    return removedValue;
  }

  // Additional utility methods
  contains(value: T): boolean {
    let current = this.front;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  // Iterator for easier traversal
  *[Symbol.iterator](): Iterator<T> {
    let current = this.front;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}

// Usage with iterator
const enhancedQueue = new EnhancedLinkedListQueue<string>();
enhancedQueue.enqueue("first");
enhancedQueue.enqueue("second");
enhancedQueue.enqueue("third");

for (const item of enhancedQueue) {
  console.log(item); // "first", "second", "third"
}
