class PriorityQueue<T> {
  private heap: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator?: (a: T, b: T) => number) {
    this.heap = [];
    // Default comparator for numbers (max-heap: larger numbers have higher priority)
    this.comparator = comparator || ((a: T, b: T) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return b - a; // Max-heap for numbers
      }
      throw new Error('Default comparator only works with numbers');
    });
  }

  // Get parent index
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // Get left child index
  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  // Get right child index
  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  // Check if node has left child
  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  // Check if node has right child
  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  // Swap elements at two indices
  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = 
      [this.heap[index2], this.heap[index1]];
  }

  // Compare two elements based on comparator
  private compare(a: T, b: T): boolean {
    return this.comparator(a, b) > 0;
  }

  // Heapify up from given index
  private heapifyUp(index: number): void {
    let currentIndex = index;
    let parentIndex = this.getParentIndex(currentIndex);

    while (
      currentIndex > 0 &&
      this.compare(this.heap[currentIndex], this.heap[parentIndex])
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  // Heapify down from given index
  private heapifyDown(index: number): void {
    let currentIndex = index;
    let largest = currentIndex;

    while (this.hasLeftChild(currentIndex)) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);

      // Find the largest among current node and its children
      if (this.compare(this.heap[leftChildIndex], this.heap[largest])) {
        largest = leftChildIndex;
      }

      if (
        this.hasRightChild(currentIndex) &&
        this.compare(this.heap[rightChildIndex], this.heap[largest])
      ) {
        largest = rightChildIndex;
      }

      if (largest === currentIndex) {
        break;
      }

      this.swap(currentIndex, largest);
      currentIndex = largest;
    }
  }

  // Insert element into priority queue
  insert(item: T): void {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  // Remove and return highest priority element
  extractMax(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return max;
  }

  // Peek at highest priority element without removing it
  peek(): T | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  // Check if priority queue is empty
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // Get size of priority queue
  size(): number {
    return this.heap.length;
  }

  // Remove specific element (not efficient - O(n))
  remove(item: T): boolean {
    const index = this.heap.indexOf(item);
    if (index === -1) {
      return false;
    }

    // Replace with last element and heapify
    this.heap[index] = this.heap.pop()!;
    if (index < this.heap.length) {
      // Need to heapify up or down
      const parentIndex = this.getParentIndex(index);
      if (
        index > 0 &&
        this.compare(this.heap[index], this.heap[parentIndex])
      ) {
        this.heapifyUp(index);
      } else {
        this.heapifyDown(index);
      }
    }
    return true;
  }

  // Clear the priority queue
  clear(): void {
    this.heap = [];
  }
}

// Example usage with different data types

// 1. Basic usage with numbers (max-heap)
const numberPQ = new PriorityQueue<number>();
numberPQ.insert(10);
numberPQ.insert(30);
numberPQ.insert(20);
numberPQ.insert(5);

console.log('Number PQ:');
console.log('Size:', numberPQ.size()); // 4
console.log('Peek:', numberPQ.peek()); // 30
console.log('Extract:', numberPQ.extractMax()); // 30
console.log('Extract:', numberPQ.extractMax()); // 20
console.log('Is empty?', numberPQ.isEmpty()); // false

// 2. Custom objects with custom comparator
interface Task {
  id: number;
  name: string;
  priority: number;
  deadline: Date;
}

const taskComparator = (a: Task, b: Task): number => {
  // Primary: higher priority first
  // Secondary: earlier deadline first
  // Tertiary: lower ID first (for stability)
  const priorityDiff = b.priority - a.priority;
  if (priorityDiff !== 0) return priorityDiff;

  const deadlineDiff = a.deadline.getTime() - b.deadline.getTime();
  if (deadlineDiff !== 0) return deadlineDiff;

  return b.id - a.id;
};

const taskPQ = new PriorityQueue<Task>(taskComparator);

const tasks = [
  { id: 1, name: 'Fix login bug', priority: 3, deadline: new Date('2023-12-15') },
  { id: 2, name: 'Add user profile', priority: 2, deadline: new Date('2023-12-10') },
  { id: 3, name: 'Update documentation', priority: 1, deadline: new Date('2023-12-12') },
  { id: 4, name: 'Critical security patch', priority: 5, deadline: new Date('2023-12-08') },
];

tasks.forEach(task => taskPQ.insert(task));

console.log('\nTask PQ:');
console.log('Highest priority task:', taskPQ.peek());
console.log('Extracted tasks in priority order:');
while (!taskPQ.isEmpty()) {
  const task = taskPQ.extractMax()!;
  console.log(`${task.name} (Priority: ${task.priority}, Deadline: ${task.deadline.toDateString()})`);
}

// 3. Min-heap example (using negative values or custom comparator)
const minHeapComparator = (a: number, b: number): number => a - b; // Min-heap
const minPQ = new PriorityQueue<number>(minHeapComparator);
minPQ.insert(10);
minPQ.insert(5);
minPQ.insert(20);
minPQ.insert(1);

console.log('\nMin-heap PQ:');
console.log('Extract smallest:', minPQ.extractMax()); // 1 (smallest)
console.log('Extract next smallest:', minPQ.extractMax()); // 5
