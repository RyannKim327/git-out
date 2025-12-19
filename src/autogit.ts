interface PriorityQueueItem<T> {
  item: T;
  priority: number;
}

class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = [];
  private readonly isMinHeap: boolean;

  constructor(isMinHeap: boolean = true) {
    this.isMinHeap = isMinHeap;
  }

  /**
   * Add an item to the priority queue
   */
  enqueue(item: T, priority: number): void {
    const queueItem: PriorityQueueItem<T> = { item, priority };
    this.heap.push(queueItem);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Remove and return the highest priority item
   */
  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }

    return min.item;
  }

  /**
   * Peek at the highest priority item without removing it
   */
  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].item;
  }

  /**
   * Check if the queue is empty
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Get the size of the queue
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Clear the queue
   */
  clear(): void {
    this.heap = [];
  }

  /**
   * Move an element up the heap to maintain heap property
   */
  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (this.shouldSwap(parent.priority, element.priority)) {
        break;
      }
      
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  /**
   * Move an element down the heap to maintain heap property
   */
  private sinkDown(index: number): void {
    const length = this.heap.length;
    const element = this.heap[index];
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex: number | null = null;
      let leftChild: PriorityQueueItem<T> | null = null;
      let rightChild: PriorityQueueItem<T> | null = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.shouldSwap(element.priority, leftChild.priority)) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && this.shouldSwap(element.priority, rightChild.priority)) ||
          (swapIndex !== null && leftChild && this.shouldSwap(leftChild.priority, rightChild.priority))
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) {
        break;
      }

      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = element;
      index = swapIndex;
    }
  }

  /**
   * Determine if elements should be swapped based on heap type
   */
  private shouldSwap(parentPriority: number, childPriority: number): boolean {
    return this.isMinHeap 
      ? parentPriority > childPriority 
      : parentPriority < childPriority;
  }

  /**
   * Convert the priority queue to an array (for debugging/testing)
   */
  toArray(): T[] {
    return this.heap.map(item => item.item);
  }

  /**
   * Convert the priority queue to an array with priorities
   */
  toArrayWithPriorities(): PriorityQueueItem<T>[] {
    return [...this.heap];
  }
}

// Example usage and testing
function demonstratePriorityQueue(): void {
  // Min-heap (default) - lower numbers have higher priority
  const minQueue = new PriorityQueue<string>();
  
  minQueue.enqueue("Task C", 3);
  minQueue.enqueue("Task A", 1);
  minQueue.enqueue("Task B", 2);
  minQueue.enqueue("Task D", 4);
  
  console.log("Min-heap priority order:");
  while (!minQueue.isEmpty()) {
    console.log(minQueue.dequeue());
  }
  // Output: Task A, Task B, Task C, Task D

  // Max-heap - higher numbers have higher priority
  const maxQueue = new PriorityQueue<number>(false);
  
  maxQueue.enqueue(10, 10);
  maxQueue.enqueue(30, 30);
  maxQueue.enqueue(20, 20);
  maxQueue.enqueue(40, 40);
  
  console.log("\nMax-heap priority order:");
  while (!maxQueue.isEmpty()) {
    console.log(maxQueue.dequeue());
  }
  // Output: 40, 30, 20, 10
}

// Run the demonstration
demonstratePriorityQueue();
// Patient triage system
interface Patient {
  name: string;
  condition: string;
}

const emergencyRoom = new PriorityQueue<Patient>();
emergencyRoom.enqueue({ name: "John", condition: "mild fever" }, 3);
emergencyRoom.enqueue({ name: "Sarah", condition: "chest pain" }, 1);
emergencyRoom.enqueue({ name: "Mike", condition: "broken arm" }, 2);

// Process patients in priority order
while (!emergencyRoom.isEmpty()) {
  const patient = emergencyRoom.dequeue();
  console.log(`Treating: ${patient?.name} (${patient?.condition})`);
}
