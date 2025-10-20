interface PriorityQueueItem<T> {
  priority: number;
  value: T;
}

class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[];
  private isMinHeap: boolean;

  constructor(isMinHeap: boolean = true) {
    this.heap = [];
    this.isMinHeap = isMinHeap;
  }

  // Add an item to the priority queue
  enqueue(value: T, priority: number): void {
    const item: PriorityQueueItem<T> = { priority, value };
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  // Remove and return the highest priority item
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

  // Peek at the highest priority item without removing it
  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  // Get queue size
  size(): number {
    return this.heap.length;
  }

  // Check if queue is empty
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // Move element up the heap to maintain heap property
  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (this.compare(element.priority, parent.priority)) {
        this.heap[index] = parent;
        this.heap[parentIndex] = element;
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Move element down the heap to maintain heap property
  private sinkDown(index: number): void {
    const length = this.heap.length;
    const element = this.heap[index];
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = null;
      let leftChild: PriorityQueueItem<T> | null = null;
      let rightChild: PriorityQueueItem<T> | null = null;
      
      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.compare(leftChild.priority, element.priority)) {
          swapIndex = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && this.compare(rightChild.priority, element.priority)) ||
          (swapIndex !== null && this.compare(rightChild.priority, leftChild!.priority))
        ) {
          swapIndex = rightChildIndex;
        }
      }
      
      if (swapIndex === null) break;
      
      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }

  // Compare priorities based on heap type
  private compare(a: number, b: number): boolean {
    return this.isMinHeap ? a < b : a > b;
  }

  // Optional: Convert heap to array for debugging
  toArray(): PriorityQueueItem<T>[] {
    return [...this.heap];
  }
}
// Example 1: Min-heap (default)
const minQueue = new PriorityQueue<number>();
minQueue.enqueue("Task A", 3);
minQueue.enqueue("Task B", 1);
minQueue.enqueue("Task C", 2);

console.log(minQueue.dequeue()); // "Task B" (priority 1)
console.log(minQueue.dequeue()); // "Task C" (priority 2)
console.log(minQueue.dequeue()); // "Task A" (priority 3)

// Example 2: Max-heap
const maxQueue = new PriorityQueue<string>(false);
maxQueue.enqueue("Low Priority", 1);
maxQueue.enqueue("High Priority", 3);
maxQueue.enqueue("Medium Priority", 2);

console.log(maxQueue.dequeue()); // "High Priority" (priority 3)
console.log(maxQueue.dequeue()); // "Medium Priority" (priority 2)

// Example 3: Custom objects
interface Patient {
  name: string;
  condition: string;
}

const emergencyQueue = new PriorityQueue<Patient>();
emergencyQueue.enqueue(
  { name: "John", condition: "stable" },
  3
);
emergencyQueue.enqueue(
  { name: "Sarah", condition: "critical" },
  1
);
emergencyQueue.enqueue(
  { name: "Mike", condition: "urgent" },
  2
);

console.log(emergencyQueue.dequeue()); // Sarah (critical)
