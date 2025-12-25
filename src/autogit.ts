interface SkipListNode<T> {
  value: T;
  next: (SkipListNode<T> | null)[];
}

class SkipList<T> {
  private head: SkipListNode<T>;
  private maxLevel: number;
  private probability: number;
  private size: number;

  constructor(maxLevel: number = 16, probability: number = 0.5) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.size = 0;
    
    // Create head node with maxLevel pointers
    this.head = {
      value: null as unknown as T, // Head doesn't store actual value
      next: new Array(maxLevel).fill(null)
    };
  }

  /**
   * Generate random level for a new node
   */
  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  /**
   * Insert a value into the skip list
   */
  insert(value: T): void {
    const newNodeLevel = this.randomLevel();
    const newNode: SkipListNode<T> = {
      value,
      next: new Array(newNodeLevel).fill(null)
    };

    let current = this.head;
    const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);

    // Find the insertion point at each level
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next[level] !== null && current.next[level]!.value < value) {
        current = current.next[level]!;
      }
      update[level] = current;
    }

    // Insert the new node at each appropriate level
    for (let level = 0; level < newNodeLevel; level++) {
      newNode.next[level] = update[level]!.next[level];
      update[level]!.next[level] = newNode;
    }

    this.size++;
  }

  /**
   * Search for a value in the skip list
   */
  search(value: T): boolean {
    let current = this.head;

    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next[level] !== null && current.next[level]!.value < value) {
        current = current.next[level]!;
      }
    }

    // Move to the next node at level 0
    current = current.next[0]!;
    return current !== null && current.value === value;
  }

  /**
   * Remove a value from the skip list
   */
  remove(value: T): boolean {
    const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);
    let current = this.head;

    // Find the node to remove and track update pointers
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next[level] !== null && current.next[level]!.value < value) {
        current = current.next[level]!;
      }
      update[level] = current;
    }

    current = current.next[0]!;

    // If value not found
    if (current === null || current.value !== value) {
      return false;
    }

    // Remove the node from all levels
    for (let level = 0; level < current.next.length; level++) {
      if (update[level]!.next[level] !== current) {
        break;
      }
      update[level]!.next[level] = current.next[level];
    }

    this.size--;
    return true;
  }

  /**
   * Get all values in sorted order
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head.next[0];

    while (current !== null) {
      result.push(current.value);
      current = current.next[0];
    }

    return result;
  }

  /**
   * Get the size of the skip list
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Check if the skip list is empty
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Visualize the skip list (useful for debugging)
   */
  visualize(): void {
    console.log("Skip List Visualization:");
    
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      let output = `Level ${level}: `;
      let current = this.head.next[level];
      
      while (current !== null) {
        output += `${current.value} -> `;
        current = current.next[level];
      }
      
      console.log(output + "null");
    }
  }
}
interface SkipListNode<T> {
  value: T;
  next: (SkipListNode<T> | null)[];
  level: number;
}

class EnhancedSkipList<T> {
  private head: SkipListNode<T>;
  private maxLevel: number;
  private probability: number;
  private size: number;
  private comparator: (a: T, b: T) => number;

  constructor(
    comparator?: (a: T, b: T) => number,
    maxLevel: number = 16,
    probability: number = 0.5
  ) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.size = 0;
    
    // Default comparator for primitive types
    this.comparator = comparator || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    this.head = {
      value: null as unknown as T,
      next: new Array(maxLevel).fill(null),
      level: maxLevel
    };
  }

  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  private compare(a: T, b: T): number {
    return this.comparator(a, b);
  }

  insert(value: T): void {
    const newNodeLevel = this.randomLevel();
    const newNode: SkipListNode<T> = {
      value,
      next: new Array(newNodeLevel).fill(null),
      level: newNodeLevel
    };

    let current = this.head;
    const update: SkipListNode<T>[] = new Array(this.maxLevel);
    
    for (let i = 0; i < this.maxLevel; i++) {
      update[i] = this.head;
    }

    // Find insertion points
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (
        current.next[level] !== null &&
        this.compare(current.next[level]!.value, value) < 0
      ) {
        current = current.next[level]!;
      }
      update[level] = current;
    }

    // Insert at each level
    for (let level = 0; level < newNodeLevel; level++) {
      newNode.next[level] = update[level].next[level];
      update[level].next[level] = newNode;
    }

    this.size++;
  }

  search(value: T): T | null {
    let current = this.head;

    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (
        current.next[level] !== null &&
        this.compare(current.next[level]!.value, value) < 0
      ) {
        current = current.next[level]!;
      }
    }

    current = current.next[0]!;
    return current !== null && this.compare(current.value, value) === 0 
      ? current.value 
      : null;
  }

  remove(value: T): boolean {
    const update: SkipListNode<T>[] = new Array(this.maxLevel);
    
    for (let i = 0; i < this.maxLevel; i++) {
      update[i] = this.head;
    }

    let current = this.head;

    // Find the node to remove
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (
        current.next[level] !== null &&
        this.compare(current.next[level]!.value, value) < 0
      ) {
        current = current.next[level]!;
      }
      update[level] = current;
    }

    current = current.next[0]!;

    if (current === null || this.compare(current.value, value) !== 0) {
      return false;
    }

    // Remove from all levels
    for (let level = 0; level < current.level; level++) {
      if (update[level].next[level] !== current) {
        break;
      }
      update[level].next[level] = current.next[level];
    }

    this.size--;
    return true;
  }

  *values(): IterableIterator<T> {
    let current = this.head.next[0];
    while (current !== null) {
      yield current.value;
      current = current.next[0];
    }
  }

  clear(): void {
    for (let level = 0; level < this.maxLevel; level++) {
      this.head.next[level] = null;
    }
    this.size = 0;
  }
}
// Basic usage with numbers
const skipList = new SkipList<number>();

skipList.insert(10);
skipList.insert(5);
skipList.insert(15);
skipList.insert(7);

console.log(skipList.toArray()); // [5, 7, 10, 15]
console.log(skipList.search(7)); // true
console.log(skipList.search(20)); // false

skipList.remove(7);
console.log(skipList.toArray()); // [5, 10, 15]

// Enhanced version with custom comparator
interface Person {
  name: string;
  age: number;
}

const personSkipList = new EnhancedSkipList<Person>(
  (a, b) => a.age - b.age
);

personSkipList.insert({ name: "Alice", age: 30 });
personSkipList.insert({ name: "Bob", age: 25 });
personSkipList.insert({ name: "Charlie", age: 35 });

for (const person of personSkipList.values()) {
  console.log(person); // Bob (25), Alice (30), Charlie (35)
}
