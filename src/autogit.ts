interface HeapItem<T> {
  value: T;
  priority: number;
}

class PriorityQueue<T> {
  private heap: HeapItem<T>[] = [];
  
  constructor(private readonly isMinHeap: boolean = true) {}

  // Add an element with priority to the queue
  public enqueue(value: T, priority: number): void {
    const item: HeapItem<T> = { value, priority };
    this.heap.push(item);
    this.bubbleUp();
  }

  // Remove and return the highest priority element
  public dequeue(): T | null {
    if (this.isEmpty()) return null;
    
    const min = this.heap[0];
    const last = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown();
    }
    
    return min.value;
  }

  // Peek at the highest priority element without removing it
  public peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  // Get the size of the queue
  public size(): number {
    return this.heap.length;
  }

  // Check if the queue is empty
  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // Private helper methods
  private bubbleUp(): void {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (this.shouldSwap(parent.priority, element.priority)) break;

      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  private sinkDown(): void {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let leftChild: HeapItem<T> | null = null;
      let rightChild: HeapItem<T> | null = null;
      let swap: number | null = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.shouldSwap(element.priority, leftChild.priority)) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && this.shouldSwap(element.priority, rightChild.priority)) ||
          (swap !== null && leftChild && this.shouldSwap(leftChild.priority, rightChild.priority))
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  private shouldSwap(parentPriority: number, childPriority: number): boolean {
    return this.isMinHeap 
      ? parentPriority > childPriority  // For min-heap: swap if parent > child
      : parentPriority < childPriority; // For max-heap: swap if parent < child
  }
}
interface HeapItem<T> {
  value: T;
  priority: number;
  timestamp: number; // For tie-breaking
}

class EnhancedPriorityQueue<T> {
  private heap: HeapItem<T>[] = [];
  private counter: number = 0; // For stable ordering

  constructor(
    private readonly isMinHeap: boolean = true,
    private readonly tieBreaker: 'fifo' | 'lifo' = 'fifo'
  ) {}

  public enqueue(value: T, priority: number): void {
    const item: HeapItem<T> = {
      value,
      priority,
      timestamp: this.counter++
    };
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  public dequeue(): T | null {
    if (this.isEmpty()) return null;
    
    this.swap(0, this.heap.length - 1);
    const item = this.heap.pop()!;
    
    if (!this.isEmpty()) {
      this.sinkDown(0);
    }
    
    return item.value;
  }

  public peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  public updatePriority(predicate: (value: T) => boolean, newPriority: number): boolean {
    let found = false;
    
    for (let i = 0; i < this.heap.length; i++) {
      if (predicate(this.heap[i].value)) {
        const oldPriority = this.heap[i].priority;
        this.heap[i].priority = newPriority;
        
        if (this.shouldSwap(oldPriority, newPriority)) {
          this.bubbleUp(i);
        } else {
          this.sinkDown(i);
        }
        
        found = true;
      }
    }
    
    return found;
  }

  public size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  public clear(): void {
    this.heap = [];
  }

  public toArray(): T[] {
    return [...this.heap].sort((a, b) => {
      const priorityCompare = this.isMinHeap 
        ? a.priority - b.priority 
        : b.priority - a.priority;
      
      if (priorityCompare !== 0) return priorityCompare;
      
      return this.tieBreaker === 'fifo' 
        ? a.timestamp - b.timestamp 
        : b.timestamp - a.timestamp;
    }).map(item => item.value);
  }

  // Private helper methods
  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      
      if (!this.shouldSwap(this.heap[parentIndex], this.heap[index])) break;
      
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    
    while (true) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      let candidateIndex = index;

      if (leftChildIndex < length && 
          this.shouldSwap(this.heap[candidateIndex], this.heap[leftChildIndex])) {
        candidateIndex = leftChildIndex;
      }

      if (rightChildIndex < length && 
          this.shouldSwap(this.heap[candidateIndex], this.heap[rightChildIndex])) {
        candidateIndex = rightChildIndex;
      }

      if (candidateIndex === index) break;

      this.swap(index, candidateIndex);
      index = candidateIndex;
    }
  }

  private shouldSwap(parent: HeapItem<T>, child: HeapItem<T>): boolean {
    if (parent.priority !== child.priority) {
      return this.isMinHeap 
        ? parent.priority > child.priority
        : parent.priority < child.priority;
    }
    
    // Tie-breaking logic
    return this.tieBreaker === 'fifo' 
      ? parent.timestamp > child.timestamp
      : parent.timestamp < child.timestamp;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }
}
// Min-heap (default) - lower numbers = higher priority
const minQueue = new PriorityQueue<number>();
minQueue.enqueue('Task A', 3);
minQueue.enqueue('Task B', 1);
minQueue.enqueue('Task C', 2);

console.log(minQueue.dequeue()); // 'Task B' (priority 1)
console.log(minQueue.dequeue()); // 'Task C' (priority 2)
console.log(minQueue.dequeue()); // 'Task A' (priority 3)

// Max-heap - higher numbers = higher priority
const maxQueue = new PriorityQueue<number>(false);
maxQueue.enqueue('Task A', 3);
maxQueue.enqueue('Task B', 1);
maxQueue.enqueue('Task C', 2);

console.log(maxQueue.dequeue()); // 'Task A' (priority 3)
console.log(maxQueue.dequeue()); // 'Task C' (priority 2)
console.log(maxQueue.dequeue()); // 'Task B' (priority 1)

// Using the enhanced version
const enhancedQueue = new EnhancedPriorityQueue<string>();
enhancedQueue.enqueue('Urgent', 1);
enhancedQueue.enqueue('Medium', 3);
enhancedQueue.enqueue('High', 2);

// Update priority
enhancedQueue.updatePriority(value => value === 'Medium', 0);
console.log(enhancedQueue.dequeue()); // 'Medium' (now priority 0)
