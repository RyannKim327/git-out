class BinaryHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    // Insert a new value into the heap
    public insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    // Remove and return the minimum value from the heap
    public removeMin(): number | null {
        if (this.heap.length === 0) {
            return null; // or throw an error
        }
        const min = this.heap[0];
        const end = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return min;
    }

    // Get the minimum value without removing it
    public peek(): number | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    // Get the size of the heap
    public size(): number {
        return this.heap.length;
    }

    // Bubble up the last element to maintain the heap property
    private bubbleUp(index: number): void {
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element >= parent) break; // Correct position found
            this.heap[index] = parent; // Move parent down
            index = parentIndex; // Move up the tree
        }
        this.heap[index] = element; // Place the element in its correct position
    }

    // Bubble down the element at the given index to maintain the heap property
    private bubbleDown(index: number): void {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild: number, rightChild: number;
            let swapIndex: number = -1;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild < element) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swapIndex === -1 && rightChild < element) ||
                    (swapIndex !== -1 && rightChild < leftChild)
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === -1) break; // Correct position found
            this.heap[index] = this.heap[swapIndex]; // Move child up
            index = swapIndex; // Move down the tree
        }
        this.heap[index] = element; // Place the element in its correct position
    }
}

// Example usage:
const pq = new BinaryHeap();
pq.insert(5);
pq.insert(3);
pq.insert(8);
pq.insert(1);

console.log(pq.peek()); // Output: 1
console.log(pq.removeMin()); // Output: 1
console.log(pq.peek()); // Output: 3
console.log(pq.size()); // Output: 3
