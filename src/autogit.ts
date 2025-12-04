class PriorityQueue<T> {
    private heap: T[];
    private comparator: (a: T, b: T) => number;

    /**
     * Creates a new PriorityQueue instance.
     * @param comparator Optional comparison function that defines the priority order.
     *                   Defaults to min-heap behavior for numbers: (a, b) => a - b.
     *                   For max-heap, use: (a, b) => b - a.
     */
    constructor(comparator: (a: T, b: T) => number = (a: T, b: T) => (a as any) - (b as any)) {
        this.heap = [];
        this.comparator = comparator;
    }

    /**
     * Adds an element to the priority queue.
     * @param element The element to add.
     */
    enqueue(element: T): void {
        this.heap.push(element);
        this.bubbleUp(this.heap.length - 1);
    }

    /**
     * Removes and returns the element with the highest priority.
     * @returns The highest priority element or undefined if empty.
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        
        const top = this.heap[0];
        const end = this.heap.pop();
        
        if (!this.isEmpty() && end !== undefined) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return top;
    }

    /**
     * Returns the element with the highest priority without removing it.
     * @returns The highest priority element or undefined if empty.
     */
    peek(): T | undefined {
        return this.heap[0];
    }

    /**
     * Returns the number of elements in the queue.
     */
    size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the queue is empty.
     */
    isEmpty(): boolean {
        return this.size() === 0;
    }

    // Private helper methods for maintaining heap property

    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.shouldSwap(index, parentIndex)) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private sinkDown(index: number): void {
        const length = this.size();
        let current = index;

        while (true) {
            const leftChild = 2 * current + 1;
            const rightChild = 2 * current + 2;
            let candidate = current;

            if (leftChild < length && this.shouldSwap(leftChild, candidate)) {
                candidate = leftChild;
            }

            if (rightChild < length && this.shouldSwap(rightChild, candidate)) {
                candidate = rightChild;
            }

            if (candidate !== current) {
                [this.heap[current], this.heap[candidate]] = [this.heap[candidate], this.heap[current]];
                current = candidate;
            } else {
                break;
            }
        }
    }

    private shouldSwap(a: number, b: number): boolean {
        return this.comparator(this.heap[a], this.heap[b]) < 0;
    }
}
const minQueue = new PriorityQueue<number>();
minQueue.enqueue(5);
minQueue.enqueue(2);
minQueue.enqueue(8);
minQueue.dequeue(); // Returns 2 (smallest element first)
const maxQueue = new PriorityQueue<number>((a, b) => b - a);
maxQueue.enqueue(5);
maxQueue.enqueue(2);
maxQueue.enqueue(8);
maxQueue.dequeue(); // Returns 8 (largest element first)
type Patient = { name: string; severity: number };
const ERQueue = new PriorityQueue<Patient>((a, b) => b.severity - a.severity);

ERQueue.enqueue({ name: "Alice", severity: 3 });
ERQueue.enqueue({ name: "Bob", severity: 5 });
ERQueue.enqueue({ name: "Charlie", severity: 1 });

ERQueue.dequeue(); // Returns Bob (highest severity)
