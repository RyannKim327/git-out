interface SkipListNode<T> {
  value: T;
  next: (SkipListNode<T> | null)[];
  prev?: SkipListNode<T> | null;
}

class SkipList<T> {
  private head: SkipListNode<T>;
  private tail: SkipListNode<T> | null = null;
  private maxLevel: number;
  private probability: number;
  private size: number = 0;
  private compare: (a: T, b: T) => number;

  constructor(maxLevel: number = 16, probability: number = 0.5, compare?: (a: T, b: T) => number) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.compare = compare || this.defaultCompare;
    
    // Create head node with maxLevel pointers
    this.head = {
      value: null as unknown as T, // Head doesn't store actual value
      next: new Array(maxLevel).fill(null),
    };
  }

  private defaultCompare(a: T, b: T): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  insert(value: T): void {
    const newNode: SkipListNode<T> = {
      value,
      next: new Array(this.randomLevel()).fill(null),
    };

    let current = this.head;
    const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);

    // Find the insertion point and track nodes to update
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (
        current.next[level] !== null &&
        this.compare(current.next[level]!.value, value) < 0
      ) {
        current = current.next[level]!;
      }
      update[level] = current;
    }

    // Insert at all levels
    for (let level = 0; level < newNode.next.length; level++) {
      const prevNode = update[level];
      if (prevNode) {
        newNode.next[level] = prevNode.next[level];
        prevNode.next[level] = newNode;
      }
    }

    // Set previous pointer for level 0 (optional, for backwards traversal)
    if (update[0] !== this.head) {
      newNode.prev = update[0];
    }

    // Update tail if this is the last node
    if (newNode.next[0] === null) {
      this.tail = newNode;
    }

    this.size++;
  }

  search(value: T): SkipListNode<T> | null {
    let current = this.head;

    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (
        current.next[level] !== null &&
        this.compare(current.next[level]!.value, value) <= 0
      ) {
        if (this.compare(current.next[level]!.value, value) === 0) {
          return current.next[level];
        }
        current = current.next[level]!;
      }
    }

    return null;
  }

  delete(value: T): boolean {
    const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);
    let current = this.head;

    // Find the node to delete and track nodes to update
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (
        current.next[level] !== null &&
        this.compare(current.next[level]!.value, value) < 0
      ) {
        current = current.next[level]!;
      }
      update[level] = current;
    }

    const nodeToDelete = current.next[0];
    if (!nodeToDelete || this.compare(nodeToDelete.value, value) !== 0) {
      return false; // Node not found
    }

    // Remove from all levels
    for (let level = 0; level < nodeToDelete.next.length; level++) {
      const prevNode = update[level];
      if (prevNode && prevNode.next[level] === nodeToDelete) {
        prevNode.next[level] = nodeToDelete.next[level];
      }
    }

    // Update tail if we deleted the last node
    if (nodeToDelete.next[0] === null) {
      this.tail = update[0] === this.head ? null : update[0];
    }

    this.size--;
    return true;
  }

  contains(value: T): boolean {
    return this.search(value) !== null;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  // Iterator methods
  *values(): IterableIterator<T> {
    let current = this.head.next[0];
    while (current !== null) {
      yield current.value;
      current = current.next[0];
    }
  }

  toArray(): T[] {
    return Array.from(this.values());
  }

  // Print for debugging
  print(): void {
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      let current = this.head.next[level];
      let output = `Level ${level}: HEAD -> `;
      
      while (current !== null) {
        output += `${current.value} -> `;
        current = current.next[level];
      }
      
      output += "NULL";
      console.log(output);
    }
  }
}

// Example usage
const skipList = new SkipList<number>();

// Insert values
skipList.insert(3);
skipList.insert(1);
skipList.insert(4);
skipList.insert(1);
skipList.insert(5);
skipList.insert(9);
skipList.insert(2);

console.log("Skip List structure:");
skipList.print();

console.log("\nSearch for 4:", skipList.contains(4)); // true
console.log("Search for 7:", skipList.contains(7)); // false

console.log("\nValues in order:", skipList.toArray()); // [1, 1, 2, 3, 4, 5, 9]

// Delete a value
skipList.delete(4);
console.log("\nAfter deleting 4:");
skipList.print();
console.log("Values:", skipList.toArray()); // [1, 1, 2, 3, 5, 9]

// Custom comparator example
const stringSkipList = new SkipList<string>(16, 0.5, (a, b) => a.localeCompare(b));
stringSkipList.insert("apple");
stringSkipList.insert("banana");
stringSkipList.insert("cherry");

console.log("\nString Skip List:");
stringSkipList.print();
