// Node class for the linked list
class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

// Queue class using linked list
class Queue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;
  private size: number = 0;

  // Add element to the end of the queue (enqueue)
  enqueue(value: T): void {
    const newNode = new QueueNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If tail exists, connect the new node
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  // Remove and return the element from the front of the queue (dequeue)
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const removedNode = this.head!;
    this.head = this.head!.next;

    // If queue becomes empty, also set tail to null
    if (this.head === null) {
      this.tail = null;
    }

    this.size--;
    
    // Remove the reference to the removed node to help with garbage collection
    removedNode.next = null;
    
    return removedNode.value;
  }

  // Return the element at the front without removing it
  peek(): T | undefined {
    return this.head ? this.head.value : undefined;
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Get the current size of the queue
  getSize(): number {
    return this.size;
  }

  // Convert queue to array (from front to back)
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  // Clear the queue
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Check if queue contains a specific value
  contains(value: T): boolean {
    let current = this.head;
    
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    
    return false;
  }
}

// Usage example
function demonstrateQueue() {
  const queue = new Queue<string>();
  
  console.log("Queue is empty:", queue.isEmpty()); // true
  console.log("Size:", queue.getSize()); // 0
  
  // Enqueue elements
  queue.enqueue("First");
  queue.enqueue("Second");
  queue.enqueue("Third");
  
  console.log("After enqueuing:");
  console.log("Queue contents:", queue.toArray()); // ["First", "Second", "Third"]
  console.log("Peek:", queue.peek()); // "First"
  console.log("Size:", queue.getSize()); // 3
  
  // Dequeue elements
  console.log("Dequeue:", queue.dequeue()); // "First"
  console.log("Dequeue:", queue.dequeue()); // "Second"
  
  console.log("After dequeuing two elements:");
  console.log("Queue contents:", queue.toArray()); // ["Third"]
  console.log("Peek:", queue.peek()); // "Third"
  console.log("Size:", queue.getSize()); // 1
  
  // Check contains
  console.log("Contains 'Third':", queue.contains("Third")); // true
  console.log("Contains 'First':", queue.contains("First")); // false
  
  // Clear queue
  queue.clear();
  console.log("After clearing - is empty:", queue.isEmpty()); // true
}

// Run the demonstration
demonstrateQueue();
