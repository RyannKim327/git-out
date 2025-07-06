class MinHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    // Get the index of the parent of a node
    private parentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    // Get the index of the left child of a node
    private leftChildIndex(index: number): number {
        return 2 * index + 1;
    }

    // Get the index of the right child of a node
    private rightChildIndex(index: number): number {
        return 2 * index + 2;
    }

    // Swap two elements in the heap
    private swap(index1: number, index2: number): void {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Insert a new value into the heap
    public insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    // Bubble up the last element to maintain the heap property
    private bubbleUp(): void {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = this.parentIndex(index);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    // Remove and return the minimum value (root of the heap)
    public remove(): number | null {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop()!;

        const minValue = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown();
        return minValue;
    }

    // Bubble down the root element to maintain the heap property
    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            const leftIndex = this.leftChildIndex(index);
            const rightIndex = this.rightChildIndex(index);
            let smallestIndex = index;

            if (leftIndex < length && this.heap[leftIndex] < this.heap[smallestIndex]) {
                smallestIndex = leftIndex;
            }
            if (rightIndex < length && this.heap[rightIndex] < this.heap[smallestIndex]) {
                smallestIndex = rightIndex;
            }
            if (smallestIndex === index) break;

            this.swap(index, smallestIndex);
            index = smallestIndex;
        }
    }

    // Get the size of the heap
    public size(): number {
        return this.heap.length;
    }

    // Peek at the minimum value without removing it
    public peek(): number | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
}

class PriorityQueue {
    private heap: MinHeap;

    constructor() {
        this.heap = new MinHeap();
    }

    // Add an element to the priority queue
    public enqueue(value: number): void {
        this.heap.insert(value);
    }

    // Remove and return the highest priority element
    public dequeue(): number | null {
        return this.heap.remove();
    }

    // Get the size of the priority queue
    public size(): number {
        return this.heap.size();
    }

    // Peek at the highest priority element without removing it
    public peek(): number | null {
        return this.heap.peek();
    }
}

// Example usage:
const pq = new PriorityQueue();
pq.enqueue(5);
pq.enqueue(3);
pq.enqueue(8);
console.log(pq.peek()); // 3
console.log(pq.dequeue()); // 3
console.log(pq.size()); // 2
