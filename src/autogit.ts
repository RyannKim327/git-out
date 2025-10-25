class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}
class Queue<T> {
  private front: Node<T> | null; 
  private rear: Node<T> | null; 
  private count: number;

  constructor() {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }

  /**
   * Add an item to the end of the queue
   */
  enqueue(value: T): void {
    const newNode = new Node(value);
    
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear!.next = newNode; // Existing rear's next points to new node
      this.rear = newNode;       // Update rear to new node
    }
    this.count++;
  }

  /**
   * Remove and return the item from the front of the queue
   */
  dequeue(): T | null {
    if (this.isEmpty()) return null;

    const removedNode = this.front;
    this.front = this.front!.next;

    // If queue becomes empty, update rear to null
    if (this.front === null) {
      this.rear = null;
    }

    this.count--;
    return removedNode!.value;
  }

  /**
   * Get the front item without removing it
   */
  peek(): T | null {
    return this.front?.value ?? null;
  }

  /**
   * Check if the queue is empty
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Get the number of items in the queue
   */
  size(): number {
    return this.count;
  }

  /**
   * Clear the queue
   */
  clear(): void {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }
}
const queue = new Queue<number>();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log(queue.size());   // 3
console.log(queue.peek());   // 10
console.log(queue.dequeue()); // 10
console.log(queue.peek());   // 20

queue.clear();
console.log(queue.isEmpty()); // true
