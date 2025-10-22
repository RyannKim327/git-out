interface SkipListNode<T> {
  value: T;
  next: SkipListNode<T> | null;
  below: SkipListNode<T> | null;
}

class SkipList<T> {
  private head: SkipListNode<T>;
  private readonly maxLevel: number;
  private readonly probability: number;
  private size: number;

  constructor(maxLevel: number = 16, probability: number = 0.5) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.head = this.createNode(null as T); // Sentinel node
    this.size = 0;
    
    // Initialize multiple levels
    let current = this.head;
    for (let i = 1; i < maxLevel; i++) {
      current.below = this.createNode(null as T);
      current = current.below;
    }
  }

  private createNode(value: T): SkipListNode<T> {
    return { value, next: null, below: null };
  }

  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  insert(value: T): void {
    const level = this.randomLevel();
    const newNode = this.createNode(value);
    
    let current = this.head;
    let levelCounter = this.maxLevel - 1;
    const update: SkipListNode<T>[] = [];

    // Find insertion points at each level
    while (current !== null) {
      // Move right until we find the correct position
      while (current.next !== null && current.next.value < value) {
        current = current.next;
      }
      
      // Save the node for potential update
      if (levelCounter <= level) {
        update.push(current);
      }
      
      current = current.below!;
      levelCounter--;
    }

    // Insert at each level
    let belowNode: SkipListNode<T> | null = null;
    for (let i = 0; i < Math.min(level, update.length); i++) {
      const node = update[update.length - 1 - i];
      const newNodeCopy = this.createNode(value);
      newNodeCopy.next = node.next;
      node.next = newNodeCopy;
      
      if (belowNode !== null) {
        belowNode.below = newNodeCopy;
      }
      belowNode = newNodeCopy;
    }

    this.size++;
  }

  search(value: T): boolean {
    let current = this.head;

    while (current !== null) {
      // Move right
      while (current.next !== null && current.next.value < value) {
        current = current.next;
      }

      // Check if found
      if (current.next !== null && current.next.value === value) {
        return true;
      }

      // Move down
      current = current.below!;
    }

    return false;
  }

  delete(value: T): boolean {
    let found = false;
    let current = this.head;

    while (current !== null) {
      // Move right
      while (current.next !== null && current.next.value < value) {
        current = current.next;
      }

      // Delete if found
      if (current.next !== null && current.next.value === value) {
        current.next = current.next.next;
        found = true;
      }

      // Move down
      current = current.below!;
    }

    if (found) this.size--;
    return found;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.getBottomHead().next;

    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  private getBottomHead(): SkipListNode<T> {
    let current = this.head;
    while (current.below !== null) {
      current = current.below;
    }
    return current;
  }

  getSize(): number {
    return this.size;
  }

  // For visualization/debugging
  printLevels(): void {
    let levelHead = this.head;
    let level = this.maxLevel;

    while (levelHead !== null) {
      console.log(`Level ${level}:`);
      let current = levelHead.next;
      const values: string[] = [];
      
      while (current !== null) {
        values.push(String(current.value));
        current = current.next;
      }
      
      console.log(values.join(' -> ') || 'Empty');
      levelHead = levelHead.below!;
      level--;
    }
  }
}
// Create a skip list for numbers
const skipList = new SkipList<number>();

// Insert values
skipList.insert(10);
skipList.insert(5);
skipList.insert(20);
skipList.insert(15);
skipList.insert(25);

// Search for values
console.log('Contains 15:', skipList.search(15)); // true
console.log('Contains 30:', skipList.search(30)); // false

// Delete values
console.log('Deleted 15:', skipList.delete(15)); // true
console.log('Contains 15:', skipList.search(15)); // false

// Get all values in order
console.log('All values:', skipList.toArray()); // [5, 10, 20, 25]

// Get size
console.log('Size:', skipList.getSize()); // 4

// Visualize levels (for debugging)
skipList.printLevels();
// Custom configuration
const customSkipList = new SkipList<string>(20, 0.3); // More levels, lower probability

// For custom types, ensure they're comparable
interface Person {
  id: number;
  name: string;
}

const personSkipList = new SkipList<Person>(undefined, undefined);
personSkipList.insert({ id: 1, name: 'Alice' });
personSkipList.insert({ id: 2, name: 'Bob' });

// You might want to provide a custom comparator for complex types
