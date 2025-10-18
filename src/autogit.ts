interface PriorityQueueItem<T> {
  priority: number;
  value: T;
}

class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = [];
  private readonly isMinHeap: boolean;

  constructor(isMinHeap: boolean = true) {
    this.isMinHeap = isMinHeap;
  }

  // Add element to the priority queue
  enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  // Remove and return the highest priority element
  dequeue(): T | null {
    if (this.isEmpty()) return null;
    
    const root = this.heap[0];
    const last = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    
    return root.value;
  }

  // Peek at the highest priority element without removing it
  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  // Check if queue is empty
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // Get queue size
  size(): number {
    return this.heap.length;
  }

  // Clear the queue
  clear(): void {
    this.heap = [];
  }

  // Move element up to maintain heap property
  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (this.hasHigherPriority(element.priority, parent.priority)) {
        this.heap[index] = parent;
        this.heap[parentIndex] = element;
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Move element down to maintain heap property
  private sinkDown(index: number): void {
    const length = this.heap.length;
    const element = this.heap[index];
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = -1;
      
      // Check left child
      if (leftChildIndex < length) {
        if (this.hasHigherPriority(
          this.heap[leftChildIndex].priority, 
          element.priority
        )) {
          swapIndex = leftChildIndex;
        }
      }
      
      // Check right child
      if (rightChildIndex < length) {
        const comparisonPriority = swapIndex === -1 
          ? element.priority 
          : this.heap[leftChildIndex].priority;
          
        if (this.hasHigherPriority(
          this.heap[rightChildIndex].priority,
          comparisonPriority
        )) {
          swapIndex = rightChildIndex;
        }
      }
      
      if (swapIndex === -1) break;
      
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }

  // Compare priorities based on heap type
  private hasHigherPriority(a: number, b: number): boolean {
    return this.isMinHeap ? a < b : a > b;
  }

  // Convert queue to array (for debugging)
  toArray(): PriorityQueueItem<T>[] {
    return [...this.heap];
  }
}
// Example 1: Min-Heap (default)
const minQueue = new PriorityQueue<string>(true);
minQueue.enqueue("Task 1", 3);
minQueue.enqueue("Task 2", 1);
minQueue.enqueue("Task 3", 2);

console.log(minQueue.dequeue()); // "Task 2" (priority 1)
console.log(minQueue.dequeue()); // "Task 3" (priority 2)
console.log(minQueue.dequeue()); // "Task 1" (priority 3)

// Example 2: Max-Heap
const maxQueue = new PriorityQueue<number>(false);
maxQueue.enqueue(100, 1);
maxQueue.enqueue(200, 3);
maxQueue.enqueue(300, 2);

console.log(maxQueue.dequeue()); // 200 (priority 3 - highest)
console.log(maxQueue.dequeue()); // 300 (priority 2)
console.log(maxQueue.dequeue()); // 100 (priority 1)

// Example 3: Custom objects
interface Task {
  name: string;
  deadline: Date;
}

const taskQueue = new PriorityQueue<Task>();
taskQueue.enqueue(
  { name: "Write report", deadline: new Date("2023-12-31") },
  2
);
taskQueue.enqueue(
  { name: "Fix bug", deadline: new Date("2023-12-15") },
  1
);
taskQueue.enqueue(
  { name: "Meeting", deadline: new Date("2024-01-15") },
  3
);

console.log(taskQueue.dequeue()?.name); // "Fix bug" (priority 1)
class AdvancedPriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = [];
  private readonly comparator: (a: number, b: number) => boolean;

  constructor(
    comparator: (a: number, b: number) => boolean = (a, b) => a < b
  ) {
    this.comparator = comparator;
  }

  // ... same methods as before, but use comparator instead of hasHigherPriority

  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (this.comparator(element.priority, parent.priority)) {
        this.heap[index] = parent;
        this.heap[parentIndex] = element;
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Custom comparator example
  static createMinHeapQueue<T>(): AdvancedPriorityQueue<T> {
    return new AdvancedPriorityQueue<T>((a, b) => a < b);
  }

  static createMaxHeapQueue<T>(): AdvancedPriorityQueue<T> {
    return new AdvancedPriorityQueue<T>((a, b) => a > b);
  }
}

// Usage with custom comparator
const customQueue = new AdvancedPriorityQueue<string>((a, b) => a > b); // Max-heap
