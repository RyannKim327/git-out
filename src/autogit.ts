interface SkipListNode<T> {
  value: T;
  next: (SkipListNode<T> | null)[];
}

interface SkipListConfig {
  maxLevel: number;
  probability: number;
}
class SkipList<T> {
  private head: SkipListNode<T>;
  private level: number;
  private size: number;
  private readonly maxLevel: number;
  private readonly probability: number;

  constructor(config: Partial<SkipListConfig> = {}) {
    this.maxLevel = config.maxLevel || 16;
    this.probability = config.probability || 0.5;
    this.level = 1;
    this.size = 0;
    
    // Create head node with maxLevel next pointers
    this.head = {
      value: null as T, // Sentinel value
      next: new Array(this.maxLevel).fill(null)
    };
  }

  /**
   * Generate a random level for a new node
   */
  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  /**
   * Find the node with the largest value less than or equal to target
   * Returns update array for insertion/deletion
   */
  private find(value: T): [SkipListNode<T>[], SkipListNode<T> | null] {
    const update: SkipListNode<T>[] = new Array(this.maxLevel);
    let current: SkipListNode<T> = this.head;
    
    // Start from highest level and work down
    for (let i = this.level - 1; i >= 0; i--) {
      while (current.next[i] !== null && current.next[i].value < value) {
        current = current.next[i];
      }
      update[i] = current;
    }
    
    // Move to the next node at level 0 (if it exists)
    const found = current.next[0];
    return [update, found];
  }

  /**
   * Insert a value into the skip list
   */
  insert(value: T): void {
    const [update, found] = this.find(value);
    
    // If value already exists, we can choose to update or skip
    // For this implementation, we'll allow duplicates
    // if (found !== null && found.value === value) {
    //   return; // Or update the value
    // }
    
    const newLevel = this.randomLevel();
    const newNode: SkipListNode<T> = {
      value,
      next: new Array(newLevel).fill(null)
    };
    
    // Update the skip list structure
    for (let i = 0; i < newLevel; i++) {
      if (i < this.level) {
        newNode.next[i] = update[i].next[i];
        update[i].next[i] = newNode;
      } else {
        // For levels beyond current skip list level
        this.head.next[i] = newNode;
      }
    }
    
    // Update the current level if needed
    if (newLevel > this.level) {
      this.level = newLevel;
    }
    
    this.size++;
  }

  /**
   * Search for a value in the skip list
   */
  search(value: T): boolean {
    const [, found] = this.find(value);
    return found !== null && found.value === value;
  }

  /**
   * Delete a value from the skip list
   */
  delete(value: T): boolean {
    const [update, found] = this.find(value);
    
    if (found === null || found.value !== value) {
      return false; // Value not found
    }
    
    // Update pointers at all levels
    for (let i = 0; i < this.level; i++) {
      if (update[i].next[i] !== found) {
        break;
      }
      update[i].next[i] = found.next[i];
    }
    
    // Update the current level if necessary
    while (this.level > 1 && this.head.next[this.level - 1] === null) {
      this.level--;
    }
    
    this.size--;
    return true;
  }

  /**
   * Get the minimum value (first element)
   */
  getMin(): T | null {
    return this.head.next[0]?.value || null;
  }

  /**
   * Get the maximum value (last element)
   */
  getMax(): T | null {
    let current = this.head;
    while (current.next[0] !== null) {
      current = current.next[0];
    }
    return current === this.head ? null : current.value;
  }

  /**
   * Check if the skip list is empty
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Get the number of elements
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Convert skip list to array (in-order traversal)
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
   * Visualize the skip list structure (for debugging)
   */
  visualize(): void {
    console.log(`Skip List (level: ${this.level}, size: ${this.size})`);
    
    for (let i = this.level - 1; i >= 0; i--) {
      let line = `Level ${i}: HEAD -> `;
      let current: SkipListNode<T> | null = this.head.next[i];
      
      while (current !== null) {
        line += `${current.value} -> `;
        current = current.next[i];
      }
      
      line += 'NULL';
      console.log(line);
    }
  }
}
// Basic usage
const skipList = new SkipList<number>();

// Insert values
skipList.insert(3);
skipList.insert(6);
skipList.insert(7);
skipList.insert(9);
skipList.insert(12);
skipList.insert(19);
skipList.insert(17);
skipList.insert(26);
skipList.insert(21);
skipList.insert(25);

// Search
console.log('Contains 17:', skipList.search(17)); // true
console.log('Contains 100:', skipList.search(100)); // false

// Delete
console.log('Deleted 17:', skipList.delete(17)); // true
console.log('Contains 17 after deletion:', skipList.search(17)); // false

// Min/Max
console.log('Min:', skipList.getMin()); // 3
console.log('Max:', skipList.getMax()); // 26

// Convert to array
console.log('All values:', skipList.toArray()); // [3, 6, 7, 9, 12, 19, 21, 25, 26]

// Visualization
skipList.visualize();

// Custom configuration
const customSkipList = new SkipList<number>({
  maxLevel: 20,
  probability: 0.3
});
class SkipListWithComparator<T> extends SkipList<T> {
  private compare: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number, config: Partial<SkipListConfig> = {}) {
    super(config);
    this.compare = compareFn;
  }

  protected find(value: T): [SkipListNode<T>[], SkipListNode<T> | null] {
    const update: SkipListNode<T>[] = new Array(this.maxLevel);
    let current: SkipListNode<T> = this.head;
    
    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.next[i] !== null && 
        this.compare(current.next[i].value, value) < 0
      ) {
        current = current.next[i];
      }
      update[i] = current;
    }
    
    const found = current.next[0];
    return [update, found];
  }
}

// Usage with custom comparator
const skipListString = new SkipListWithComparator<string>(
  (a, b) => a.localeCompare(b)
);

skipListString.insert('apple');
skipListString.insert('banana');
skipListString.insert('cherry');
console.log(skipListString.toArray()); // ['apple', 'banana', 'cherry']
