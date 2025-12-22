interface PriorityQueueItem<T> {
    item: T;
    priority: number;
}

class PriorityQueue<T> {
    private heap: PriorityQueueItem<T>[];
    private readonly isMinHeap: boolean;

    constructor(isMinHeap: boolean = true) {
        this.heap = [];
        this.isMinHeap = isMinHeap;
    }

    // Add an item with priority to the queue
    enqueue(item: T, priority: number): void {
        const queueItem: PriorityQueueItem<T> = { item, priority };
        this.heap.push(queueItem);
        this.bubbleUp(this.heap.length - 1);
    }

    // Remove and return the highest priority item
    dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        const min = this.heap[0];
        const end = this.heap.pop()!;

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }

        return min.item;
    }

    // Peek at the highest priority item without removing it
    peek(): T | null {
        return this.isEmpty() ? null : this.heap[0].item;
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

    // Convert to array (for debugging/testing)
    toArray(): PriorityQueueItem<T>[] {
        return [...this.heap];
    }

    // Private helper methods
    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndex(index: number): number {
        return 2 * index + 1;
    }

    private getRightChildIndex(index: number): number {
        return 2 * index + 2;
    }

    private shouldSwap(parentIndex: number, childIndex: number): boolean {
        if (parentIndex < 0 || childIndex >= this.heap.length) {
            return false;
        }

        const parentPriority = this.heap[parentIndex].priority;
        const childPriority = this.heap[childIndex].priority;

        return this.isMinHeap 
            ? childPriority < parentPriority
            : childPriority > parentPriority;
    }

    private swap(index1: number, index2: number): void {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    private bubbleUp(index: number): void {
        let currentIndex = index;
        let parentIndex = this.getParentIndex(currentIndex);

        while (currentIndex > 0 && this.shouldSwap(parentIndex, currentIndex)) {
            this.swap(parentIndex, currentIndex);
            currentIndex = parentIndex;
            parentIndex = this.getParentIndex(currentIndex);
        }
    }

    private sinkDown(index: number): void {
        let currentIndex = index;
        let leftChildIndex = this.getLeftChildIndex(currentIndex);
        let rightChildIndex = this.getRightChildIndex(currentIndex);
        let swapIndex = currentIndex;

        // Check left child
        if (leftChildIndex < this.heap.length && this.shouldSwap(swapIndex, leftChildIndex)) {
            swapIndex = leftChildIndex;
        }

        // Check right child
        if (rightChildIndex < this.heap.length && this.shouldSwap(swapIndex, rightChildIndex)) {
            swapIndex = rightChildIndex;
        }

        // If we found a child that should be swapped
        if (swapIndex !== currentIndex) {
            this.swap(currentIndex, swapIndex);
            this.sinkDown(swapIndex);
        }
    }
}
// Example 1: Min-heap (default)
const minQueue = new PriorityQueue<string>();
minQueue.enqueue("Task A", 3);
minQueue.enqueue("Task B", 1);
minQueue.enqueue("Task C", 2);

console.log(minQueue.dequeue()); // "Task B" (priority 1)
console.log(minQueue.dequeue()); // "Task C" (priority 2)
console.log(minQueue.dequeue()); // "Task A" (priority 3)

// Example 2: Max-heap
const maxQueue = new PriorityQueue<number>(false);
maxQueue.enqueue(100, 5);
maxQueue.enqueue(200, 3);
maxQueue.enqueue(300, 7);

console.log(maxQueue.dequeue()); // 300 (priority 7)
console.log(maxQueue.dequeue()); // 100 (priority 5)
console.log(maxQueue.dequeue()); // 200 (priority 3)

// Example 3: Custom objects
interface Patient {
    name: string;
    severity: number;
}

const patientQueue = new PriorityQueue<Patient>();
patientQueue.enqueue({ name: "John", severity: 3 }, 3);
patientQueue.enqueue({ name: "Jane", severity: 1 }, 1);
patientQueue.enqueue({ name: "Bob", severity: 2 }, 2);

console.log(patientQueue.dequeue()); // { name: "Jane", severity: 1 }
class PriorityQueueWithComparator<T> {
    private heap: T[];
    private readonly comparator: (a: T, b: T) => number;

    constructor(comparator: (a: T, b: T) => number) {
        this.heap = [];
        this.comparator = comparator;
    }

    enqueue(item: T): void {
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    dequeue(): T | null {
        if (this.isEmpty()) return null;
        
        const first = this.heap[0];
        const last = this.heap.pop()!;
        
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        
        return first;
    }

    // ... other methods remain similar

    private shouldSwap(parentIndex: number, childIndex: number): boolean {
        return this.comparator(this.heap[parentIndex], this.heap[childIndex]) > 0;
    }
}

// Usage with custom comparator
const customQueue = new PriorityQueueWithComparator<{ priority: number }>(
    (a, b) => a.priority - b.priority // Min-heap comparator
);
