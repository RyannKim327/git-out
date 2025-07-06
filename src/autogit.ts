class Node<T> {
    constructor(public value: T, public priority: number) {}
}

class PriorityQueue<T> {
    private heap: Node<T>[] = [];

    // Inserts a new element into the priority queue
    insert(value: T, priority: number): void {
        const newNode = new Node(value, priority);
        this.heap.push(newNode);
        this.bubbleUp(this.heap.length - 1);
    }

    // Removes and returns the highest priority element
    remove(): T | undefined {
        if (this.heap.length === 0) return undefined;
        
        // Swap the first node with the last node
        const root = this.heap[0].value;
        const lastNode = this.heap.pop();
        
        if (this.heap.length > 0 && lastNode) {
            this.heap[0] = lastNode;
            this.bubbleDown(0);
        }
        
        return root;
    }

    // Returns the highest priority element without removing it
    peek(): T | undefined {
        return this.heap.length === 0 ? undefined : this.heap[0].value;
    }

    // Checks if the priority queue is empty
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    // Helper to maintain the heap property after insertion
    private bubbleUp(index: number): void {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[currentIndex].priority <= this.heap[parentIndex].priority) break;
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    // Helper to maintain the heap property after removal
    private bubbleDown(index: number): void {
        const length = this.heap.length;
        let currentIndex = index;
        while (true) {
            let largestIndex = currentIndex;
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;

            if (leftChildIndex < length && this.heap[leftChildIndex].priority > this.heap[largestIndex].priority) {
                largestIndex = leftChildIndex;
            }

            if (rightChildIndex < length && this.heap[rightChildIndex].priority > this.heap[largestIndex].priority) {
                largestIndex = rightChildIndex;
            }

            if (largestIndex === currentIndex) break;
            this.swap(currentIndex, largestIndex);
            currentIndex = largestIndex;
        }
    }

    // Helper to swap two nodes in the heap
    private swap(indexA: number, indexB: number): void {
        [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]];
    }
}

// Usage example
const pq = new PriorityQueue<string>();
pq.insert("task1", 2);
pq.insert("task2", 1);
pq.insert("task3", 3);
console.log(pq.peek()); // Outputs: "task3"
console.log(pq.remove()); // Outputs: "task3"
console.log(pq.remove()); // Outputs: "task1"
console.log(pq.isEmpty()); // Outputs: false
console.log(pq.remove()); // Outputs: "task2"
console.log(pq.isEmpty()); // Outputs: true
