interface PriorityQueueItem<T> {
  value: T;
  priority: number;
}

class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = [];

  constructor(private comparator: (a: PriorityQueueItem<T>, b: PriorityQueueItem<T>) => number = 
    (a, b) => a.priority - b.priority
  ) {}

  // Public methods
  enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): T | null {
    if (this.isEmpty()) return null;
    
    const min = this.heap[0];
    const end = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    
    return min.value;
  }

  peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }

  // Heap maintenance methods
  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (this.comparator(element, parent) >= 0) break;
      
      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    const element = this.heap[index];
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swap: number | null = null;
      let leftChild: PriorityQueueItem<T>;
      let rightChild: PriorityQueueItem<T>;
      
      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.comparator(leftChild, element) < 0) {
          swap = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && this.comparator(rightChild, element) < 0) ||
          (swap !== null && this.comparator(rightChild, leftChild!) < 0)
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
}
// Example 1: Basic usage with default comparator (min-heap)
const pq = new PriorityQueue<number>();
pq.enqueue("Task A", 3);
pq.enqueue("Task B", 1);
pq.enqueue("Task C", 2);

console.log(pq.dequeue()); // "Task B" (highest priority)
console.log(pq.dequeue()); // "Task C"
console.log(pq.dequeue()); // "Task A"

// Example 2: Max-heap using custom comparator
const maxHeap = new PriorityQueue<string>((a, b) => b.priority - a.priority);
maxHeap.enqueue("Low Priority", 1);
maxHeap.enqueue("High Priority", 3);
maxHeap.enqueue("Medium Priority", 2);

console.log(maxHeap.dequeue()); // "High Priority"

// Example 3: Complex objects
interface Patient {
  name: string;
  condition: 'critical' | 'urgent' | 'stable';
}

const hospitalQueue = new PriorityQueue<Patient>((a, b) => {
  const priorityMap = { critical: 0, urgent: 1, stable: 2 };
  return priorityMap[a.priority] - priorityMap[b.priority];
});

hospitalQueue.enqueue(
  { name: "John", condition: "stable" }, 
  "stable"
);
hospitalQueue.enqueue(
  { name: "Sarah", condition: "critical" }, 
  "critical"
);

console.log(hospitalQueue.dequeue()?.name); // "Sarah"
