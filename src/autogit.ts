interface SkipListNode<T> {
  value: T;
  next: (SkipListNode<T> | null)[];
  prev: (SkipListNode<T> | null)[];
}

interface SkipListOptions {
  maxLevel?: number;
  probability?: number;
}
class SkipList<T> {
  private head: SkipListNode<T>;
  private tail: SkipListNode<T>;
  private level: number;
  private maxLevel: number;
  private probability: number;
  private size: number;

  constructor(options: SkipListOptions = {}) {
    this.maxLevel = options.maxLevel || 16;
    this.probability = options.probability || 0.5;
    this.level = 0;
    this.size = 0;

    // Create head and tail nodes
    this.head = this.createNode(undefined as T, this.maxLevel);
    this.tail = this.createNode(undefined as T, this.maxLevel);

    // Initialize head's next pointers to tail
    for (let i = 0; i < this.maxLevel; i++) {
      this.head.next[i] = this.tail;
      this.tail.prev[i] = this.head;
    }
  }

  private createNode(value: T, level: number): SkipListNode<T> {
    return {
      value,
      next: new Array(level).fill(null),
      prev: new Array(level).fill(null),
    };
  }

  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  insert(value: T): void {
    const update: SkipListNode<T>[] = new Array(this.maxLevel).fill(this.head);
    const currentNode = this.head;

    // Track the path for updating pointers
    for (let i = this.level - 1; i >= 0; i--) {
      while (
        currentNode.next[i] !== this.tail &&
        currentNode.next[i].value < value
      ) {
        currentNode = currentNode.next[i];
      }
      update[i] = currentNode;
    }

    currentNode = currentNode.next[0];

    // If value already exists, update it or handle as needed
    if (currentNode !== this.tail && currentNode.value === value) {
      // For simplicity, we'll just update the value
      currentNode.value = value;
      return;
    }

    // Create new node with random level
    const newNodeLevel = this.randomLevel();
    const newNode = this.createNode(value, newNodeLevel);

    // Update the maximum level if needed
    if (newNodeLevel > this.level) {
      for (let i = this.level; i < newNodeLevel; i++) {
        update[i] = this.head;
      }
      this.level = newNodeLevel;
    }

    // Update next and previous pointers
    for (let i = 0; i < newNodeLevel; i++) {
      newNode.next[i] = update[i].next[i];
      newNode.prev[i] = update[i];
      update[i].next[i].prev[i] = newNode;
      update[i].next[i] = newNode;
    }

    this.size++;
  }

  search(value: T): boolean {
    let currentNode = this.head;

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        currentNode.next[i] !== this.tail &&
        currentNode.next[i].value < value
      ) {
        currentNode = currentNode.next[i];
      }
    }

    currentNode = currentNode.next[0];
    return currentNode !== this.tail && currentNode.value === value;
  }

  delete(value: T): boolean {
    const update: SkipListNode<T>[] = new Array(this.maxLevel).fill(null);
    let currentNode = this.head;

    // Find the node and track the update path
    let found = false;
    for (let i = this.level - 1; i >= 0; i--) {
      while (
        currentNode.next[i] !== this.tail &&
        currentNode.next[i].value < value
      ) {
        currentNode = currentNode.next[i];
      }
      update[i] = currentNode;
    }

    currentNode = currentNode.next[0];

    // Verify we found the exact node
    if (currentNode !== this.tail && currentNode.value === value) {
      // Update next pointers
      for (let i = 0; i < this.level; i++) {
        if (update[i].next[i] !== currentNode) {
          break;
        }
        update[i].next[i] = currentNode.next[i];
      }

      // Update previous pointers
      for (let i = 0; i < currentNode.next.length; i++) {
        if (currentNode.next[i].prev[i] === currentNode) {
          currentNode.next[i].prev[i] = currentNode.prev[i];
        }
      }

      // Update level if necessary
      while (this.level > 0 && this.head.next[this.level - 1] === this.tail) {
        this.level--;
      }

      this.size--;
      return true;
    }

    return false;
  }

  getMin(): T | null {
    const firstNode = this.head.next[0];
    return firstNode !== this.tail ? firstNode.value : null;
  }

  getMax(): T | null {
    const lastNode = this.tail.prev[0];
    return lastNode !== this.head ? lastNode.value : null;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  // Generator method for iteration
  *[Symbol.iterator](): Generator<T> {
    let currentNode = this.head.next[0];
    while (currentNode !== this.tail) {
      yield currentNode.value;
      currentNode = currentNode.next[0];
    }
  }

  // Utility method to visualize the skip list (for debugging)
  toArray(): T[] {
    return Array.from(this);
  }

  // Print method for debugging
  print(): void {
    for (let i = this.level - 1; i >= 0; i--) {
      let output = `Level ${i}: HEAD -> `;
      let currentNode = this.head.next[i];
      
      while (currentNode !== this.tail) {
        output += `${currentNode.value} -> `;
        currentNode = currentNode.next[i];
      }
      
      output += "TAIL";
      console.log(output);
    }
  }
}
// Create a skip list with default options
const skipList = new SkipList<number>();

// Insert values
skipList.insert(3);
skipList.insert(6);
skipList.insert(7);
skipList.insert(9);
skipList.insert(12);
skipList.insert(19);
skipList.insert(17);

// Search for values
console.log(skipList.search(6)); // true
console.log(skipList.search(15)); // false

// Delete values
console.log(skipList.delete(7)); // true
console.log(skipList.delete(20)); // false

// Get min and max
console.log(skipList.getMin()); // 3
console.log(skipList.getMax()); // 19

// Iterate through values
for (const value of skipList) {
  console.log(value);
}

// Convert to array
console.log(skipList.toArray()); // [3, 6, 9, 12, 17, 19]

// Print structure (for debugging)
skipList.print();
class ComparableSkipList<T> extends SkipList<T> {
  private compare: (a: T, b: T) => number;

  constructor(
    compareFn: (a: T, b: T) => number,
    options: SkipListOptions = {}
  ) {
    super(options);
    this.compare = compareFn;
  }

  protected compareValues(a: T, b: T): number {
    return this.compare(a, b);
  }

  // You would need to override insert, search, and delete methods
  // to use the custom comparison instead of the default < operator
}
