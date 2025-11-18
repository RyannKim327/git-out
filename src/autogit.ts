interface PriorityQueueItem<T> {
  value: T;
  priority: number;
}

class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = [];

  constructor(private comparator: (a: number, b: number) => boolean = (a, b) => a < b) {
    // Default is min-heap (lower priority numbers have higher priority)
  }

  // Public methods
  public enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  public dequeue(): T | null {
    if (this.isEmpty()) return null;
    
    const min = this.heap[0];
    const end = this.heap.pop();
    
    if (this.heap.length > 0 && end) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    
    return min.value;
  }

  public peek(): T | null {
    return this.isEmpty() ? null : this.heap[0].value;
  }

  public peekPriority(): number | null {
    return this.isEmpty() ? null : this.heap[0].priority;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  public size(): number {
    return this.heap.length;
  }

  public clear(): void {
    this.heap = [];
  }

  // Private helper methods
  private bubbleUp(index: number): void {
    const element = this.heap[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      
      if (this.comparator(parent.priority, element.priority)) break;
      
      this.heap[index] = parent;
      index = parentIndex;
    }
    
    this.heap[index] = element;
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    const element = this.heap[index];
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swap: number | null = null;
      let leftChild: PriorityQueueItem<T> | null = null;
      let rightChild: PriorityQueueItem<T> | null = null;
      
      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.comparator(leftChild.priority, element.priority)) {
          swap = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && this.comparator(rightChild.priority, element.priority)) ||
          (swap !== null && leftChild && this.comparator(rightChild.priority, leftChild.priority))
        ) {
          swap = rightChildIndex;
        }
      }
      
      if (swap === null) break;
      
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    
    this.heap[index] = element;
  }
}

// Factory functions for common queue types
export class PriorityQueueFactory {
  static createMinPriorityQueue<T>(): PriorityQueue<T> {
    return new PriorityQueue<T>((a, b) => a < b);
  }

  static createMaxPriorityQueue<T>(): PriorityQueue<T> {
    return new PriorityQueue<T>((a, b) => a > b);
  }
}
// Example 1: Min Priority Queue (lower numbers = higher priority)
const minQueue = PriorityQueueFactory.createMinPriorityQueue<string>();

minQueue.enqueue("Task A", 3);
minQueue.enqueue("Task B", 1);  // Highest priority
minQueue.enqueue("Task C", 2);
minQueue.enqueue("Task D", 5);  // Lowest priority

console.log(minQueue.dequeue()); // "Task B" (priority 1)
console.log(minQueue.dequeue()); // "Task C" (priority 2)
console.log(minQueue.peek());    // "Task A" (priority 3)

// Example 2: Max Priority Queue (higher numbers = higher priority)
const maxQueue = PriorityQueueFactory.createMaxPriorityQueue<string>();

maxQueue.enqueue("Task X", 10);
maxQueue.enqueue("Task Y", 30);  // Highest priority
maxQueue.enqueue("Task Z", 20);

console.log(maxQueue.dequeue()); // "Task Y" (priority 30)
console.log(maxQueue.dequeue()); // "Task Z" (priority 20)

// Example 3: Custom objects
interface Patient {
  name: string;
  condition: 'critical' | 'urgent' | 'stable';
}

const patientQueue = PriorityQueueFactory.createMinPriorityQueue<Patient>();

// Assign numeric priorities based on condition
const priorityMap = {
  critical: 1,
  urgent: 2,
  stable: 3
};

patientQueue.enqueue({ name: "John", condition: "stable" }, priorityMap.stable);
patientQueue.enqueue({ name: "Alice", condition: "critical" }, priorityMap.critical);
patientQueue.enqueue({ name: "Bob", condition: "urgent" }, priorityMap.urgent);

console.log(patientQueue.dequeue()); // Alice (critical)
console.log(patientQueue.dequeue()); // Bob (urgent)
console.log(patientQueue.dequeue()); // John (stable)

// Example 4: Processing tasks with priorities
interface Task {
  id: number;
  description: string;
  estimatedTime: number;
}

const taskQueue = PriorityQueueFactory.createMinPriorityQueue<Task>();

taskQueue.enqueue({ id: 1, description: "Quick email", estimatedTime: 5 }, 2);
taskQueue.enqueue({ id: 2, description: "System backup", estimatedTime: 30 }, 3);
taskQueue.enqueue({ id: 3, description: "Emergency fix", estimatedTime: 10 }, 1);

while (!taskQueue.isEmpty()) {
  const task = taskQueue.dequeue();
  console.log(`Processing: ${task?.description}`);
}
