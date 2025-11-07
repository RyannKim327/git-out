// 1. Define an interface for the Priority Queue
interface IPriorityQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
}

// 2. Implement the PriorityQueue class
class PriorityQueue<T> implements IPriorityQueue<T> {
    // The heap array to store elements
    // Using '#' for private class fields (TypeScript 3.8+ / ES2019)
    #heap: T[] = [];
    // Comparator function to determine priority
    #comparator: (a: T, b: T) => number;

    /**
     * Creates a new PriorityQueue.
     * @param comparator A function that defines the priority.
     *                   Returns a negative number if `a` has higher priority than `b`.
     *                   Returns a positive number if `b` has higher priority than `a`.
     *                   Returns 0 if `a` and `b` have equal priority.
     *                   For a Min-Heap (smallest number = highest priority) use: `(a, b) => a - b`
     *                   For a Max-Heap (largest number = highest priority) use: `(a, b) => b - a`
     */
    constructor(comparator: (a: T, b: T) => number) {
        this.#comparator = comparator;
    }

    // --- Public methods ---

    /**
     * Adds an item to the priority queue.
     * Time Complexity: O(log N)
     * @param item The item to add.
     */
    enqueue(item: T): void {
        this.#heap.push(item);
        this.#heapifyUp(); // Maintain heap property by moving the new item up
    }

    /**
     * Removes and returns the highest priority item from the queue.
     * Time Complexity: O(log N)
     * @returns The highest priority item, or undefined if the queue is empty.
     */
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.#heap.pop(); // Only one element, just remove it
        }

        const item = this.#heap[0]; // The root is the highest priority item
        this.#heap[0] = this.#heap.pop()!; // Move the last item to the root
        this.#heapifyDown(); // Maintain heap property by moving the new root down
        return item;
    }

    /**
     * Returns the highest priority item without removing it.
     * Time Complexity: O(1)
     * @returns The highest priority item, or undefined if the queue is empty.
     */
    peek(): T | undefined {
        return this.isEmpty() ? undefined : this.#heap[0];
    }

    /**
     * Checks if the priority queue is empty.
     * Time Complexity: O(1)
     * @returns True if the queue is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this.#heap.length === 0;
    }

    /**
     * Returns the number of items in the priority queue.
     * Time Complexity: O(1)
     * @returns The number of items.
     */
    size(): number {
        return this.#heap.length;
    }

    // --- Private helper methods ---

    /**
     * Helper to get the index of the parent of a node.
     */
    #parentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    /**
     * Helper to get the index of the left child of a node.
     */
    #leftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    /**
     * Helper to get the index of the right child of a node.
     */
    #rightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    /**
     * Helper to check if a node has a parent.
     */
    #hasParent(index: number): boolean {
        return this.#parentIndex(index) >= 0;
    }

    /**
     * Helper to check if a node has a left child.
     */
    #hasLeftChild(index: number): boolean {
        return this.#leftChildIndex(index) < this.#heap.length;
    }

    /**
     * Helper to check if a node has a right child.
     */
    #hasRightChild(index: number): boolean {
        return this.#rightChildIndex(index) < this.#heap.length;
    }

    /**
     * Helper to get the element of the parent node.
     */
    #getParent(index: number): T {
        return this.#heap[this.#parentIndex(index)];
    }

    /**
     * Helper to get the element of the left child node.
     */
    #getLeftChild(index: number): T {
        return this.#heap[this.#leftChildIndex(index)];
    }

    /**
     * Helper to get the element of the right child node.
     */
    #getRightChild(index: number): T {
        return this.#heap[this.#rightChildIndex(index)];
    }

    /**
     * Helper to swap two elements in the heap array.
     */
    #swap(indexOne: number, indexTwo: number): void {
        [this.#heap[indexOne], this.#heap[indexTwo]] = [this.#heap[indexTwo], this.#heap[indexOne]];
    }

    /**
     * Restores the heap property by moving an element up the heap.
     * Called after `enqueue`.
     */
    #heapifyUp(): void {
        let currentIndex = this.#heap.length - 1; // Start from the last element (newly added)

        // While the current node has a parent and has higher priority than its parent
        while (this.#hasParent(currentIndex) &&
               this.#comparator(this.#heap[currentIndex], this.#getParent(currentIndex)) < 0) {
            this.#swap(currentIndex, this.#parentIndex(currentIndex));
            currentIndex = this.#parentIndex(currentIndex);
        }
    }

    /**
     * Restores the heap property by moving an element down the heap.
     * Called after `dequeue`.
     */
    #heapifyDown(): void {
        let currentIndex = 0; // Start from the root (newly swapped)

        // While the current node has at least a left child
        while (this.#hasLeftChild(currentIndex)) {
            let smallerChildIndex = this.#leftChildIndex(currentIndex); // Assume left child is smaller/higher priority

            // If there's a right child and it has higher priority than the left child
            if (this.#hasRightChild(currentIndex) &&
                this.#comparator(this.#getRightChild(currentIndex), this.#getLeftChild(currentIndex)) < 0) {
                smallerChildIndex = this.#rightChildIndex(currentIndex);
            }

            // If the current node already has higher priority than its highest priority child,
            // the heap property is satisfied.
            if (this.#comparator(this.#heap[currentIndex], this.#heap[smallerChildIndex]) < 0) {
                break;
            } else {
                // Otherwise, swap with the higher priority child and continue moving down
                this.#swap(currentIndex, smallerChildIndex);
                currentIndex = smallerChildIndex;
            }
        }
    }
}
console.log("--- Min-Heap Example (Numbers) ---");
const minHeap = new PriorityQueue<number>((a, b) => a - b);

minHeap.enqueue(5);
minHeap.enqueue(3);
minHeap.enqueue(8);
minHeap.enqueue(1);
minHeap.enqueue(10);
minHeap.enqueue(2);

console.log("Size:", minHeap.size()); // Output: 6
console.log("Peek:", minHeap.peek()); // Output: 1 (smallest)

console.log("Dequeue:", minHeap.dequeue()); // Output: 1
console.log("Dequeue:", minHeap.dequeue()); // Output: 2
console.log("Peek:", minHeap.peek());   // Output: 3
console.log("Dequeue:", minHeap.dequeue()); // Output: 3
console.log("Dequeue:", minHeap.dequeue()); // Output: 5
console.log("Dequeue:", minHeap.dequeue()); // Output: 8
console.log("Dequeue:", minHeap.dequeue()); // Output: 10
console.log("IsEmpty:", minHeap.isEmpty()); // Output: true
console.log("Dequeue (empty):", minHeap.dequeue()); // Output: undefined
console.log("\n--- Max-Heap Example (Numbers) ---");
const maxHeap = new PriorityQueue<number>((a, b) => b - a); // Note the comparator for max-heap

maxHeap.enqueue(5);
maxHeap.enqueue(3);
maxHeap.enqueue(8);
maxHeap.enqueue(1);
maxHeap.enqueue(10);
maxHeap.enqueue(2);

console.log("Size:", maxHeap.size()); // Output: 6
console.log("Peek:", maxHeap.peek()); // Output: 10 (largest)

console.log("Dequeue:", maxHeap.dequeue()); // Output: 10
console.log("Dequeue:", maxHeap.dequeue()); // Output: 8
console.log("Peek:", maxHeap.peek());   // Output: 5
console.log("Dequeue:", maxHeap.dequeue()); // Output: 5
console.log("Dequeue:", maxHeap.dequeue()); // Output: 3
console.log("Dequeue:", maxHeap.dequeue()); // Output: 2
console.log("Dequeue:", maxHeap.dequeue()); // Output: 1
console.log("IsEmpty:", maxHeap.isEmpty()); // Output: true
console.log("\n--- Custom Object Example (Tasks) ---");

interface Task {
    id: number;
    description: string;
    priority: 'high' | 'medium' | 'low';
}

// Define priority order: high > medium > low
const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };

const taskQueue = new PriorityQueue<Task>((a, b) => {
    // For a min-heap, we want the highest priority task to come first (smaller return value)
    // So, if a.priority is 'high' and b.priority is 'low', priorityOrder['high'] (3) > priorityOrder['low'] (1)
    // We want 'high' to be returned first, so it needs a smaller comparator result.
    // Therefore, we do b.priority - a.priority if using numbers like 1,2,3 directly.
    return priorityOrder[b.priority] - priorityOrder[a.priority];
});

taskQueue.enqueue({ id: 1, description: "Fix critical bug", priority: "high" });
taskQueue.enqueue({ id: 2, description: "Refactor old code", priority: "low" });
taskQueue.enqueue({ id: 3, description: "Implement new feature", priority: "medium" });
taskQueue.enqueue({ id: 4, description: "Write documentation", priority: "low" });
taskQueue.enqueue({ id: 5, description: "Review PR", priority: "high" });

console.log("Size:", taskQueue.size()); // Output: 5
console.log("Peek:", taskQueue.peek()?.description); // Output: Fix critical bug (or Review PR, if priorities are equal, order is insertion-dependent)

console.log("Dequeue:", taskQueue.dequeue()?.description); // Should be a 'high' priority task
console.log("Dequeue:", taskQueue.dequeue()?.description); // Another 'high' priority task
console.log("Peek:", taskQueue.peek()?.description); // Should be a 'medium' priority task

console.log("Dequeue:", taskQueue.dequeue()?.description); // A 'medium' task
console.log("Dequeue:", taskQueue.dequeue()?.description); // A 'low' task
console.log("Dequeue:", taskQueue.dequeue()?.description); // Another 'low' task
console.log("IsEmpty:", taskQueue.isEmpty()); // Output: true
