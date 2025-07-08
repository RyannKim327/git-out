class MaxHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    // Insert an element into the heap
    public insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    // Remove and return the maximum element (root of the heap)
    public extractMax(): number | null {
        if (this.heap.length === 0) {
            return null; // or throw an error
        }
        const max = this.heap[0];
        const end = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return max;
    }

    // Peek at the maximum element without removing it
    public peek(): number | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    // Check if the heap is empty
    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    // Get the size of the heap
    public size(): number {
        return this.heap.length;
    }

    // Bubble up the last element to maintain the heap property
    private bubbleUp(): void {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] <= this.heap[parentIndex]) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // Bubble down the root element to maintain the heap property
    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild > element) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild > element) ||
                    (swap !== null && rightChild > leftChild!)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
            index = swap;
        }
    }
}

class PriorityQueue {
    private heap: MaxHeap;

    constructor() {
        this.heap = new MaxHeap();
    }

    public enqueue(value: number): void {
        this.heap.insert(value);
    }

    public dequeue(): number | null {
        return this.heap.extractMax();
    }

    public peek(): number | null {
        return this.heap.peek();
    }

    public isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    public size(): number {
        return this.heap.size();
    }
}

// Example usage
const pq = new PriorityQueue();
pq.enqueue(5);
pq.enqueue(1);
pq.enqueue(3);
pq.enqueue(10);

console.log(pq.dequeue()); // 10
console.log(pq.peek());    // 5
console.log(pq.dequeue()); // 5
console.log(pq.isEmpty()); // false
console.log(pq.dequeue()); // 3
console.log(pq.dequeue()); // 1
console.log(pq.isEmpty()); // true
