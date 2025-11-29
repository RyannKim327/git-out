type Comparator<T> = (a: T, b: T) => number;

/**
 * Default min-heap comparator for primitive types (numbers, strings).
 * Returns a negative value if a < b, positive if a > b, zero if a == b.
 */
const defaultMinComparator = <T>(a: T, b: T): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};

/**
 * A Min-Priority Queue implementation using a Binary Heap.
 * Generic type T allows storing any data type, requiring a custom comparator for complex objects.
 */
export class PriorityQueue<T> {
    private heap: T[] = [];
    private comparator: Comparator<T>;

    /**
     * Creates a new PriorityQueue.
     * @param comparator An optional function to compare two elements.
     *                   It should return:
     *                   - a negative value if `a` has higher priority than `b` (a comes before b)
     *                   - a positive value if `b` has higher priority than `a` (b comes before a)
     *                   - zero if `a` and `b` have equal priority.
     *                   For a Min-Priority Queue, if you want the "smallest" value to have highest priority,
     *                   the comparator should behave like `(a, b) => a - b` for numbers.
     */
    constructor(comparator: Comparator<T> = defaultMinComparator) {
        this.comparator = comparator;
    }

    /**
     * Returns the number of elements in the priority queue.
     */
    size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the priority queue is empty.
     */
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Returns the highest priority element without removing it.
     * For a Min-Priority Queue, this is the smallest element.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.heap[0];
    }

    /**
     * Adds an element to the priority queue.
     * @param item The element to add.
     */
    insert(item: T): void {
        this.heap.push(item);
        this.bubbleUp();
    }

    /**
     * Removes and returns the highest priority element.
     * For a Min-Priority Queue, this is the smallest element.
     */
    extractMin(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        if (this.size() === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!; // Move the last element to the root
        this.bubbleDown();
        return min;
    }

    // --- Helper Methods ---

    private getParentIndex(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private getLeftChildIndex(i: number): number {
        return 2 * i + 1;
    }

    private getRightChildIndex(i: number): number {
        return 2 * i + 2;
    }

    private hasParent(i: number): boolean {
        return this.getParentIndex(i) >= 0;
    }

    private hasLeftChild(i: number): boolean {
        return this.getLeftChildIndex(i) < this.heap.length;
    }

    private hasRightChild(i: number): boolean {
        return this.getRightChildIndex(i) < this.heap.length;
    }

    private parent(i: number): T {
        return this.heap[this.getParentIndex(i)];
    }

    private leftChild(i: number): T {
        return this.heap[this.getLeftChildIndex(i)];
    }

    private rightChild(i: number): T {
        return this.heap[this.getRightChildIndex(i)];
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    /**
     * Moves an element up the heap to maintain the heap property.
     * Used after insertion.
     */
    private bubbleUp(): void {
        let currentIndex = this.heap.length - 1;
        while (
            this.hasParent(currentIndex) &&
            this.comparator(this.heap[currentIndex], this.parent(currentIndex)) < 0
        ) {
            const parentIndex = this.getParentIndex(currentIndex);
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    /**
     * Moves an element down the heap to maintain the heap property.
     * Used after extraction (removing the root).
     */
    private bubbleDown(): void {
        let currentIndex = 0;
        while (this.hasLeftChild(currentIndex)) {
            let smallerChildIndex = this.getLeftChildIndex(currentIndex);

            // Check if right child exists and is smaller than left child
            if (
                this.hasRightChild(currentIndex) &&
                this.comparator(this.rightChild(currentIndex), this.leftChild(currentIndex)) < 0
            ) {
                smallerChildIndex = this.getRightChildIndex(currentIndex);
            }

            // If current element is already smaller than or equal to its smallest child,
            // then heap property is satisfied.
            if (
                this.comparator(this.heap[currentIndex], this.heap[smallerChildIndex]) <= 0
            ) {
                break;
            }

            this.swap(currentIndex, smallerChildIndex);
            currentIndex = smallerChildIndex;
        }
    }
}
import { PriorityQueue } from './PriorityQueue'; // Assuming you saved the class in PriorityQueue.ts

const pqNumbers = new PriorityQueue<number>();

pqNumbers.insert(10);
pqNumbers.insert(5);
pqNumbers.insert(15);
pqNumbers.insert(2);
pqNumbers.insert(8);

console.log("Size:", pqNumbers.size()); // Output: Size: 5
console.log("Peek:", pqNumbers.peek()); // Output: Peek: 2 (smallest value)

while (!pqNumbers.isEmpty()) {
    console.log("Extracted:", pqNumbers.extractMin());
}
// Expected Output:
// Extracted: 2
// Extracted: 5
// Extracted: 8
// Extracted: 10
// Extracted: 15
console.log("Is Empty:", pqNumbers.isEmpty()); // Output: Is Empty: true
interface Task {
    name: string;
    priority: number; // 1 = highest, 5 = lowest
}

// Custom comparator for Task objects
// For a Min-Priority Queue, we want tasks with smaller 'priority' numbers
// to come first (i.e., have higher priority).
const taskComparator = (a: Task, b: Task): number => {
    return a.priority - b.priority;
};

const pqTasks = new PriorityQueue<Task>(taskComparator);

pqTasks.insert({ name: "Write report", priority: 3 });
pqTasks.insert({ name: "Fix critical bug", priority: 1 });
pqTasks.insert({ name: "Schedule meeting", priority: 5 });
pqTasks.insert({ name: "Review code", priority: 2 });
pqTasks.insert({ name: "Answer emails", priority: 4 });

console.log("Task Queue Size:", pqTasks.size()); // Output: Task Queue Size: 5
console.log("Next Task:", pqTasks.peek()?.name); // Output: Next Task: Fix critical bug

while (!pqTasks.isEmpty()) {
    const task = pqTasks.extractMin();
    console.log(`Executing Task: ${task?.name} (Priority: ${task?.priority})`);
}
// Expected Output:
// Executing Task: Fix critical bug (Priority: 1)
// Executing Task: Review code (Priority: 2)
// Executing Task: Write report (Priority: 3)
// Executing Task: Answer emails (Priority: 4)
// Executing Task: Schedule meeting (Priority: 5)
