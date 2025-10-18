interface PriorityQueueItem<T> {
    item: T;
    priority: number;
}

class PriorityQueue<T> {
    private heap: PriorityQueueItem<T>[] = [];
    private comparator: (a: PriorityQueueItem<T>, b: PriorityQueueItem<T>) => number;

    constructor(priorityOrder: 'min' | 'max' = 'min') {
        this.comparator = priorityOrder === 'min' 
            ? (a, b) => a.priority - b.priority
            : (a, b) => b.priority - a.priority;
    }

    /**
     * Add an item with priority to the queue
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
        if (this.isEmpty()) return null;
        
        const root = this.heap[0];
        const last = this.heap.pop()!;
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        
        return root.item;
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
     * Move an element up the heap to maintain heap property
     */
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

    /**
     * Move an element down the heap to maintain heap property
     */
    private sinkDown(index: number): void {
        const length = this.heap.length;
        const element = this.heap[index];
        
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swap: number | null = null;
            let leftChild: PriorityQueueItem<T>, rightChild: PriorityQueueItem<T>;
            
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

    /**
     * Clear the priority queue
     */
    clear(): void {
        this.heap = [];
    }

    /**
     * Convert the queue to an array (for debugging)
     */
    toArray(): PriorityQueueItem<T>[] {
        return [...this.heap];
    }
}
// Example 1: Min Priority Queue (default)
const minQueue = new PriorityQueue<number>();
minQueue.enqueue('Task A', 3);
minQueue.enqueue('Task B', 1);
minQueue.enqueue('Task C', 2);

console.log(minQueue.dequeue()); // 'Task B' (priority 1)
console.log(minQueue.dequeue()); // 'Task C' (priority 2)
console.log(minQueue.dequeue()); // 'Task A' (priority 3)

// Example 2: Max Priority Queue
const maxQueue = new PriorityQueue<string>('max');
maxQueue.enqueue('Low Priority', 1);
maxQueue.enqueue('High Priority', 3);
maxQueue.enqueue('Medium Priority', 2);

console.log(maxQueue.dequeue()); // 'High Priority' (priority 3)
console.log(maxQueue.dequeue()); // 'Medium Priority' (priority 2)
console.log(maxQueue.dequeue()); // 'Low Priority' (priority 1)

// Example 3: Custom Objects
interface Patient {
    name: string;
    condition: string;
}

const emergencyQueue = new PriorityQueue<Patient>('max');
emergencyQueue.enqueue({ name: 'John', condition: 'mild' }, 1);
emergencyQueue.enqueue({ name: 'Jane', condition: 'critical' }, 10);
emergencyQueue.enqueue({ name: 'Bob', condition: 'serious' }, 5);

console.log(emergencyQueue.dequeue()); // Jane (priority 10)
console.log(emergencyQueue.dequeue()); // Bob (priority 5)
console.log(emergencyQueue.dequeue()); // John (priority 1)
