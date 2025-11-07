interface PriorityQueueItem<T> {
  priority: number;
  data: T;
}

class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = [];
  private isMinHeap: boolean;

  constructor(isMinHeap: boolean = true) {
    this.isMinHeap = isMinHeap;
  }

  // Add element to the queue
  enqueue(data: T, priority: number): void {
    const item: PriorityQueueItem<T> = { priority, data };
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  // Remove and return highest priority element
  dequeue(): T | null {
    if (this.isEmpty()) return null;
    
    const root = this.heap[0];
    const last = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    
    return root.data;
  }

  // Get highest priority element without removing
  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].data;
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

  // Helper methods for heap operations
  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (this.shouldSwap(element.priority, parent.priority)) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    const element = this.heap[index];
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = -1;
      
      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (this.shouldSwap(leftChild.priority, element.priority)) {
          swapIndex = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (this.shouldSwap(rightChild.priority, 
            (swapIndex === -1 ? element.priority : this.heap[leftChildIndex].priority))) {
          swapIndex = rightChildIndex;
        }
      }
      
      if (swapIndex === -1) break;
      
      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private shouldSwap(childPriority: number, parentPriority: number): boolean {
    return this.isMinHeap 
      ? childPriority < parentPriority 
      : childPriority > parentPriority;
  }
}
abstract class BinaryHeap<T> {
  protected heap: { priority: number; data: T }[] = [];

  constructor(items?: { priority: number; data: T }[]) {
    if (items) {
      this.heap = [...items];
      this.buildHeap();
    }
  }

  abstract shouldSwap(childPriority: number, parentPriority: number): boolean;

  enqueue(data: T, priority: number): void {
    this.heap.push({ priority, data });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): T | null {
    if (this.isEmpty()) return null;
    
    const root = this.heap[0];
    const last = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    
    return root.data;
  }

  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].data;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  clear(): void {
    this.heap = [];
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.shouldSwap(this.heap[index].priority, this.heap[parentIndex].priority)) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = -1;
      
      if (leftChildIndex < length) {
        if (this.shouldSwap(this.heap[leftChildIndex].priority, this.heap[index].priority)) {
          swapIndex = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        const comparePriority = swapIndex === -1 
          ? this.heap[index].priority 
          : this.heap[leftChildIndex].priority;
        
        if (this.shouldSwap(this.heap[rightChildIndex].priority, comparePriority)) {
          swapIndex = rightChildIndex;
        }
      }
      
      if (swapIndex === -1) break;
      
      this.swap(index, swapIndex);
      index = swapIndex;
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private buildHeap(): void {
    for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }
}

class MinHeap<T> extends BinaryHeap<T> {
  shouldSwap(childPriority: number, parentPriority: number): boolean {
    return childPriority < parentPriority;
  }
}

class MaxHeap<T> extends BinaryHeap<T> {
  shouldSwap(childPriority: number, parentPriority: number): boolean {
    return childPriority > parentPriority;
  }
}
// Using the generic priority queue
const minQueue = new PriorityQueue<number>(true); // Min-heap
minQueue.enqueue(10, 10);
minQueue.enqueue(20, 5);
minQueue.enqueue(30, 15);

console.log(minQueue.dequeue()); // 20 (priority 5)
console.log(minQueue.dequeue()); // 10 (priority 10)

// Using specialized heaps
const maxHeap = new MaxHeap<string>();
maxHeap.enqueue("Task A", 3);
maxHeap.enqueue("Task B", 1);
maxHeap.enqueue("Task C", 5);

console.log(maxHeap.dequeue()); // "Task C" (priority 5)
console.log(maxHeap.dequeue()); // "Task A" (priority 3)

// Custom object example
interface Task {
  name: string;
  description: string;
}

const taskQueue = new PriorityQueue<Task>();
taskQueue.enqueue(
  { name: "Urgent", description: "Fix critical bug" },
  1
);
taskQueue.enqueue(
  { name: "Normal", description: "Write documentation" },
  3
);

console.log(taskQueue.dequeue()); // { name: "Urgent", ... }
