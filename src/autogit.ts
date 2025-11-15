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

    // Add an item with priority
    enqueue(item: T, priority: number): void {
        const newItem: PriorityQueueItem<T> = { item, priority };
        this.heap.push(newItem);
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
        
        return root.item;
    }

    // Peek at the highest priority item without removing it
    peek(): T | null {
        return this.isEmpty() ? null : this.heap[0].item;
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

    // Convert to array for debugging/inspection
    toArray(): PriorityQueueItem<T>[] {
        return [...this.heap];
    }

    // Private helper methods
    private compare(priority1: number, priority2: number): boolean {
        return this.isMinHeap ? priority1 < priority2 : priority1 > priority2;
    }

    private bubbleUp(index: number): void {
        const element = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            
            if (!this.compare(element.priority, parent.priority)) break;
            
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
            let swapIndex = null;
            
            if (leftChildIndex < length) {
                if (this.compare(this.heap[leftChildIndex].priority, element.priority)) {
                    swapIndex = leftChildIndex;
                }
            }
            
            if (rightChildIndex < length) {
                if (
                    (swapIndex === null && this.compare(this.heap[rightChildIndex].priority, element.priority)) ||
                    (swapIndex !== null && this.compare(this.heap[rightChildIndex].priority, this.heap[leftChildIndex].priority))
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
}
// Min-heap (default) - lower numbers = higher priority
const minQueue = new PriorityQueue<number>(true);
minQueue.enqueue("Task A", 3);
minQueue.enqueue("Task B", 1);
minQueue.enqueue("Task C", 2);

console.log(minQueue.dequeue()); // "Task B" (priority 1)
console.log(minQueue.dequeue()); // "Task C" (priority 2)
console.log(minQueue.dequeue()); // "Task A" (priority 3)

// Max-heap - higher numbers = higher priority
const maxQueue = new PriorityQueue<string>(false);
maxQueue.enqueue("Low Priority", 1);
maxQueue.enqueue("High Priority", 10);
maxQueue.enqueue("Medium Priority", 5);

console.log(maxQueue.dequeue()); // "High Priority" (priority 10)
console.log(maxQueue.dequeue()); // "Medium Priority" (priority 5)
console.log(maxQueue.dequeue()); // "Low Priority" (priority 1)

// Custom object example
interface Task {
    name: string;
    description: string;
}

const taskQueue = new PriorityQueue<Task>();
taskQueue.enqueue({ name: "Bug Fix", description: "Fix critical bug" }, 1);
taskQueue.enqueue({ name: "Feature", description: "Implement new feature" }, 3);
taskQueue.enqueue({ name: "Refactor", description: "Code cleanup" }, 2);

console.log(taskQueue.dequeue()); // Bug Fix task
