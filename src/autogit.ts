class PriorityQueue<T> {
  private heap: [T, number][] = []; // [item, priority] pairs
  private size: number = 0;

  constructor() {}

  /**
   * Insert an item with a given priority into the queue
   * @param item - The item to insert
   * @param priority - The priority (lower numbers = higher priority)
   */
  insert(item: T, priority: number): void {
    this.heap[this.size] = [item, priority];
    this.size++;
    this._bubbleUp(this.size - 1);
  }

  /**
   * Remove and return the item with the highest priority
   * @returns The item with highest priority or undefined if empty
   */
  extractMin(): T | undefined {
    if (this.size === 0) return undefined;

    const min = this.heap[0][0];
    this.size--;
    
    // Move last element to root
    this.heap[0] = this.heap[this.size];
    
    // Heapify down
    this._bubbleDown(0);
    
    return min;
  }

  /**
   * Get the item with highest priority without removing it
   * @returns The item with highest priority or undefined if empty
   */
  peek(): T | undefined {
    return this.size > 0 ? this.heap[0][0] : undefined;
  }

  /**
   * Check if the queue is empty
   * @returns true if empty, false otherwise
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Get the current size of the queue
   * @returns Number of items in queue
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Bubble up the element at given index
   * @private
   */
  private _bubbleUp(index: number): void {
    const element = this.heap[index];
    const parentIndex = Math.floor((index - 1) / 2);

    // While not root and parent's priority is greater than current
    while (index > 0 && this.heap[parentIndex][1] > element[1]) {
      this.heap[index] = this.heap[parentIndex];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }

    this.heap[index] = element;
  }

  /**
   * Bubble down the element at given index
   * @private
   */
  private _bubbleDown(index: number): void {
    const element = this.heap[index];
    let smallest = index;
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;

    // Check if left child exists and has smaller priority
    if (leftChild < this.size && this.heap[leftChild][1] < this.heap[smallest][1]) {
      smallest = leftChild;
    }

    // Check if right child exists and has smaller priority
    if (rightChild < this.size && this.heap[rightChild][1] < this.heap[smallest][1]) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      // Swap with smallest child
      this.heap[index] = this.heap[smallest];
      this.heap[smallest] = element;
      
      // Continue bubbling down
      this._bubbleDown(smallest);
    }
  }

  /**
   * Remove all elements from the queue
   */
  clear(): void {
    this.heap = [];
    this.size = 0;
  }

  /**
   * Check if an item exists in the queue
   * Note: This is O(n) operation
   * @param item - The item to search for
   * @param compareFn - Optional comparison function
   * @returns true if item exists, false otherwise
   */
  contains(item: T, compareFn?: (a: T, b: T) => boolean): boolean {
    if (compareFn) {
      return this.heap.some(([heapItem]) => compareFn(heapItem, item));
    }
    
    const itemStr = JSON.stringify(item);
    return this.heap.some(([heapItem]) => JSON.stringify(heapItem) === itemStr);
  }
}

// Usage example
class Task {
  constructor(public name: string, public duration: number) {}
  
  toString(): string {
    return `${this.name} (${this.duration}s)`;
  }
}

// Example usage
function demonstratePriorityQueue() {
  const taskQueue = new PriorityQueue<Task>();

  // Insert tasks with priorities (lower number = higher priority)
  taskQueue.insert(new Task("Fix critical bug", 30), 1);    // High priority
  taskQueue.insert(new Task("Update documentation", 15), 3); // Low priority
  taskQueue.insert(new Task("Add new feature", 120), 2);    // Medium priority
  taskQueue.insert(new Task("Review code", 45), 1);         // High priority

  console.log("Queue size:", taskQueue.getSize()); // 4

  // Process tasks in priority order
  while (!taskQueue.isEmpty()) {
    const nextTask = taskQueue.extractMin();
    if (nextTask) {
      console.log(`Processing: ${nextTask.toString()}`);
    }
  }
}

// Run the demonstration
demonstratePriorityQueue();
