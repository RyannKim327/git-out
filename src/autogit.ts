interface PriorityQueueItem<T> {
    priority: number;
    data: T;
}

class PriorityQueue<T> {
    private heap: PriorityQueueItem<T>[] = [];

    constructor(private readonly isMinHeap: boolean = true) {
        // Default to min-heap (lower priority numbers have higher priority)
    }

    // Public methods
    public enqueue(data: T, priority: number): void {
        this.heap.push({ data, priority });
        this.bubbleUp(this.heap.length - 1);
    }

    public dequeue(): T | null {
        if (this.isEmpty()) return null;
        
        const item = this.heap[0];
        const last = this.heap.pop()!;
        
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        
        return item.data;
    }

    public peek(): T | null {
        return this.isEmpty() ? null : this.heap[0].data;
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

    // Helper methods
    private bubbleUp(index: number): void {
        const element = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            
            if (this.shouldSwap(parent.priority, element.priority)) {
                this.heap[parentIndex] = element;
                this.heap[index] = parent;
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
                if (this.shouldSwap(element.priority, leftChild.priority)) {
                    swapIndex = leftChildIndex;
                }
            }
            
            if (rightChildIndex < length) {
                const rightChild = this.heap[rightChildIndex];
                if (this.shouldSwap(
                    (swapIndex === -1 ? element.priority : this.heap[leftChildIndex].priority),
                    rightChild.priority
                )) {
                    swapIndex = rightChildIndex;
                }
            }
            
            if (swapIndex === -1) break;
            
            this.heap[index] = this.heap[swapIndex];
            this.heap[swapIndex] = element;
            index = swapIndex;
        }
    }

    private shouldSwap(parentPriority: number, childPriority: number): boolean {
        return this.isMinHeap 
            ? parentPriority > childPriority  // For min-heap: parent should be smaller
            : parentPriority < childPriority; // For max-heap: parent should be larger
    }
}

// Example usage
interface Task {
    name: string;
    importance: number;
}

// Min-heap example (lower numbers have higher priority)
const minQueue = new PriorityQueue<Task>(true);
minQueue.enqueue({ name: "Critical bug fix", importance: 1 }, 1);
minQueue.enqueue({ name: "Feature development", importance: 3 }, 3);
minQueue.enqueue({ name: "Urgent client request", importance: 2 }, 2);

console.log("Min-heap priority queue:");
while (!minQueue.isEmpty()) {
    console.log(minQueue.dequeue());
}

// Max-heap example (higher numbers have higher priority)
const maxQueue = new PriorityQueue<Task>(false);
maxQueue.enqueue({ name: "Low priority task", importance: 1 }, 1);
maxQueue.enqueue({ name: "High priority task", importance: 3 }, 3);
maxQueue.enqueue({ name: "Medium priority task", importance: 2 }, 2);

console.log("\nMax-heap priority queue:");
while (!maxQueue.isEmpty()) {
    console.log(maxQueue.dequeue());
}
class MinPriorityQueue<T> {
    private heap: { data: T; priority: number }[] = [];

    enqueue(data: T, priority: number): void {
        this.heap.push({ data, priority });
        this.bubbleUp(this.heap.length - 1);
    }

    dequeue(): T | null {
        if (this.heap.length === 0) return null;
        
        const min = this.heap[0];
        const end = this.heap.pop()!;
        
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        
        return min.data;
    }

    private bubbleUp(index: number): void {
        const element = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            
            if (element.priority >= parent.priority) break;
            
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
            let swap = null;
            
            if (leftChildIndex < length) {
                const leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }
            
            if (rightChildIndex < length) {
                const rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < this.heap[swap].priority)) {
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
