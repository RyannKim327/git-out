interface PriorityQueueItem<T> {
  value: T;
  priority: number;
}

class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = [];

  constructor(private isMinHeap: boolean = true) {}

  // Add an item to the queue
  enqueue(value: T, priority: number): void {
    const item: PriorityQueueItem<T> = { value, priority };
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  // Remove and return the highest/lowest priority item
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

  // Peek at the highest/lowest priority item without removing it
  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // Get the size of the queue
  size(): number {
    return this.heap.length;
  }

  // Clear the queue
  clear(): void {
    this.heap = [];
  }

  // Move element up the heap to maintain heap property
  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (this.shouldSwap(parent.priority, element.priority)) {
        this.swap(index, parentIndex);
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
      let swapIndex: number | null = null;
      
      // Check left child
      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (this.shouldSwap(element.priority, leftChild.priority)) {
          swapIndex = leftChildIndex;
        }
      }
      
      // Check right child
      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        const comparisonPriority = swapIndex === null 
          ? element.priority 
          : this.heap[leftChildIndex].priority;
        
        if (this.shouldSwap(comparisonPriority, rightChild.priority)) {
          swapIndex = rightChildIndex;
        }
      }
      
      if (swapIndex === null) break;
      
      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }

  // Helper method to determine if elements should be swapped
  private shouldSwap(parentPriority: number, childPriority: number): boolean {
    return this.isMinHeap 
      ? parentPriority > childPriority 
      : parentPriority < childPriority;
  }

  // Swap two elements in the heap
  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = 
    [this.heap[index2], this.heap[index1]];
  }

  // Convert heap to array for debugging/inspection
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

const patientQueue = new PriorityQueue<Patient>();
patientQueue.enqueue(
  { name: "John", condition: "stable" }, 
  2
);
patientQueue.enqueue(
  { name: "Sarah", condition: "critical" }, 
  1
);

console.log(patientQueue.dequeue()); // Sarah object
