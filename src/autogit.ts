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

  /**
   * Get parent index
   */
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Get left child index
   */
  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  /**
   * Get right child index
   */
  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  /**
   * Check if heap has higher priority
   */
  private hasHigherPriority(a: number, b: number): boolean {
    return this.isMinHeap ? a < b : a > b;
  }

  /**
   * Swap two elements in the heap
   */
  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  /**
   * Move element up the heap (heapify up)
   */
  private heapifyUp(index: number): void {
    if (index === 0) return;

    const parentIndex = this.getParentIndex(index);
    const current = this.heap[index].priority;
    const parent = this.heap[parentIndex].priority;

    if (this.hasHigherPriority(current, parent)) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex);
    }
  }

  /**
   * Move element down the heap (heapify down)
   */
  private heapifyDown(index: number): void {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    
    let highestPriorityIndex = index;
    const size = this.heap.length;

    if (leftChildIndex < size && 
        this.hasHigherPriority(
          this.heap[leftChildIndex].priority, 
          this.heap[highestPriorityIndex].priority
        )) {
      highestPriorityIndex = leftChildIndex;
    }

    if (rightChildIndex < size && 
        this.hasHigherPriority(
          this.heap[rightChildIndex].priority, 
          this.heap[highestPriorityIndex].priority
        )) {
      highestPriorityIndex = rightChildIndex;
    }

    if (highestPriorityIndex !== index) {
      this.swap(index, highestPriorityIndex);
      this.heapifyDown(highestPriorityIndex);
    }
  }

  /**
   * Add an element to the priority queue
   */
  enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * Remove and return the element with highest priority
   */
  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop()!.value;
    }

    const highestPriority = this.heap[0].value;
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);

    return highestPriority;
  }

  /**
   * Peek at the element with highest priority without removing it
   */
  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].value;
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
   * Convert queue to array (for debugging)
   */
  toArray(): PriorityQueueItem<T>[] {
    return [...this.heap];
  }
}
// Example 1: Min-heap (default)
const minQueue = new PriorityQueue<number>();
minQueue.enqueue(10, 3);
minQueue.enqueue(20, 1);
minQueue.enqueue(30, 2);

console.log(minQueue.dequeue()); // 20 (priority 1)
console.log(minQueue.dequeue()); // 30 (priority 2)
console.log(minQueue.dequeue()); // 10 (priority 3)

// Example 2: Max-heap
const maxQueue = new PriorityQueue<string>(false);
maxQueue.enqueue("Task A", 5);
maxQueue.enqueue("Task B", 10);
maxQueue.enqueue("Task C", 3);

console.log(maxQueue.dequeue()); // "Task B" (priority 10)
console.log(maxQueue.dequeue()); // "Task A" (priority 5)
console.log(maxQueue.dequeue()); // "Task C" (priority 3)

// Example 3: Complex objects
interface Task {
  id: number;
  description: string;
  deadline: Date;
}

const taskQueue = new PriorityQueue<Task>();
const now = new Date();

taskQueue.enqueue(
  { id: 1, description: "Urgent task", deadline: new Date(now.getTime() + 1000) },
  1
);

taskQueue.enqueue(
  { id: 2, description: "Regular task", deadline: new Date(now.getTime() + 5000) },
  3
);

taskQueue.enqueue(
  { id: 3, description: "Important task", deadline: new Date(now.getTime() + 2000) },
  2
);

while (!taskQueue.isEmpty()) {
  console.log(taskQueue.dequeue()?.description);
}
// Output: "Urgent task", "Important task", "Regular task"
