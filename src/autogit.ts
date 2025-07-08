class MinHeap {
    private heap: number[];

    constructor() {
        // Initialize the heap as an empty array
        this.heap = [];
    }

    // Insert a new value
    public insert(val: number): void {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    // Remove and return the minimum value
    public extractMin(): number | null {
        if (this.heap.length === 0) {
            return null; // or throw an error if preferred
        }
        if (this.heap.length === 1) {
            return this.heap.pop()!;
        }

        const minValue = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown(0);
        return minValue;
    }

    // Peek the minimum value without removing it
    public peek(): number | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    // Returns the current size of the heap
    public size(): number {
        return this.heap.length;
    }

    // Helper function to maintain the heap property after inserting
    private bubbleUp(index: number): void {
        let parentIndex = Math.floor((index - 1) / 2);
        while (index > 0 && this.heap[index] < this.heap[parentIndex]) {
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    // Helper function to maintain the heap property after removing
    private bubbleDown(index: number): void {
        const length = this.heap.length;
        let minIndex = index;

        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;

        if (leftChild < length && this.heap[leftChild] < this.heap[minIndex]) {
            minIndex = leftChild;
        }

        if (rightChild < length && this.heap[rightChild] < this.heap[minIndex]) {
            minIndex = rightChild;
        }

        if (minIndex !== index) {
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            this.bubbleDown(minIndex);
        }
    }
}

// Example usage
const priorityQueue = new MinHeap();
priorityQueue.insert(5);
priorityQueue.insert(3);
priorityQueue.insert(8);
priorityQueue.insert(1);

console.log(priorityQueue.extractMin()); // 1
console.log(priorityQueue.peek()); // 3
console.log(priorityQueue.size()); // 3
