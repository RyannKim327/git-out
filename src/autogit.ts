class PriorityQueue<T> {
    private heap: T[] = [];
    private comparator: (a: T, b: T) => number;

    constructor(comparator: (a: T, b: T) => number) {
        this.comparator = comparator;
    }

    // Insert a new element into the priority queue
    public enqueue(element: T): void {
        this.heap.push(element);
        this.bubbleUp();
    }

    // Remove and return the highest priority element
    public dequeue(): T | undefined {
        if (this.heap.length === 0) {
            return undefined;
        }

        const root = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0 && end !== undefined) {
            this.heap[0] = end;
            this.bubbleDown();
        }

        return root;
    }

    // Return the highest priority element without removing it
    public peek(): T | undefined {
        return this.heap[0];
    }

    // Check if the priority queue is empty
    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    // Get the size of the priority queue
    public size(): number {
        return this.heap.length;
    }

    // Bubble up the last element to maintain the heap property
    private bubbleUp(): void {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) {
                break; // The heap property is satisfied
            }
            // Swap
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // Bubble down the root element to maintain the heap property
    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && this.comparator(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = leftChildIndex;
            }

            if (rightChildIndex < length && this.comparator(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex === index) {
                break; // The heap property is satisfied
            }

            // Swap
            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            index = smallestIndex;
        }
    }
}
// Min-heap comparator
const minHeapComparator = (a: number, b: number): number => a - b;

// Max-heap comparator
const maxHeapComparator = (a: number, b: number): number => b - a;
const minHeap = new PriorityQueue<number>(minHeapComparator);
minHeap.enqueue(5);
minHeap.enqueue(2);
minHeap.enqueue(8);
minHeap.enqueue(1);

console.log(minHeap.peek()); // Output: 1 (the smallest element)
console.log(minHeap.dequeue()); // Output: 1
console.log(minHeap.dequeue()); // Output: 2
console.log(minHeap.size()); // Output: 2

const maxHeap = new PriorityQueue<number>(maxHeapComparator);
maxHeap.enqueue(5);
maxHeap.enqueue(2);
maxHeap.enqueue(8);
maxHeap.enqueue(1);

console.log(maxHeap.peek()); // Output: 8 (the largest element)
console.log(maxHeap.dequeue()); // Output: 8
console.log(maxHeap.dequeue()); // Output: 5
console.log(maxHeap.size()); // Output: 2
