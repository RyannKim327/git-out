interface SkipListNode<T> {
  value: T;
  next: SkipListNode<T> | null;
  down: SkipListNode<T> | null;
}

class SkipList<T> {
  private head: SkipListNode<T>;
  private probability: number;
  private maxLevel: number;
  private size: number;

  constructor(probability = 0.5, maxLevel = 16) {
    this.probability = probability;
    this.maxLevel = maxLevel;
    this.size = 0;
    this.head = this.createNode(null as T); // Sentinel node
  }

  private createNode(value: T): SkipListNode<T> {
    return { value, next: null, down: null };
  }

  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  insert(value: T): void {
    const newLevel = this.randomLevel();
    const update: SkipListNode<T>[] = [];
    let current = this.head;
    
    // Find insertion points at each level
    while (current) {
      while (current.next && current.next.value < value) {
        current = current.next;
      }
      update.push(current);
      current = current.down;
    }

    let downNode: SkipListNode<T> | null = null;
    let level = update.length - 1;

    // Insert at each level up to newLevel
    for (let i = 0; i < newLevel; i++) {
      const node = this.createNode(value);
      node.down = downNode;
      downNode = node;

      if (level >= 0) {
        const prev = update[level];
        node.next = prev.next;
        prev.next = node;
        level--;
      } else {
        // Create new level
        const newHead = this.createNode(null as T);
        newHead.down = this.head;
        newHead.next = node;
        this.head = newHead;
      }
    }

    this.size++;
  }

  search(value: T): boolean {
    let current = this.head;
    
    while (current) {
      while (current.next && current.next.value <= value) {
        if (current.next.value === value) {
          return true;
        }
        current = current.next;
      }
      current = current.down;
    }
    
    return false;
  }

  delete(value: T): boolean {
    let deleted = false;
    let current = this.head;
    const update: SkipListNode<T>[] = [];

    // Find nodes to update
    while (current) {
      while (current.next && current.next.value < value) {
        current = current.next;
      }
      if (current.next && current.next.value === value) {
        update.push(current);
      }
      current = current.down;
    }

    // Remove nodes at each level
    for (const node of update) {
      node.next = node.next!.next;
      deleted = true;
    }

    // Remove empty levels
    while (this.head.next === null && this.head.down) {
      this.head = this.head.down;
    }

    if (deleted) this.size--;
    return deleted;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.getBottomHead();
    
    while (current) {
      if (current.value !== null) {
        result.push(current.value);
      }
      current = current.next;
    }
    
    return result;
  }

  private getBottomHead(): SkipListNode<T> {
    let current = this.head;
    while (current.down) {
      current = current.down;
    }
    return current;
  }

  getSize(): number {
    return this.size;
  }

  // Visual representation for debugging
  print(): void {
    let levelHead = this.head;
    let level = 0;
    
    while (levelHead) {
      console.log(`Level ${level}:`);
      let current = levelHead.next;
      const values: string[] = [];
      
      while (current) {
        values.push(String(current.value));
        current = current.next;
      }
      
      console.log(values.join(' -> ') || '(empty)');
      levelHead = levelHead.down;
      level++;
    }
  }
}
// Create a skip list with numbers
const skipList = new SkipList<number>();

// Insert values
skipList.insert(10);
skipList.insert(20);
skipList.insert(5);
skipList.insert(15);
skipList.insert(25);

// Search for values
console.log('Contains 15:', skipList.search(15)); // true
console.log('Contains 30:', skipList.search(30)); // false

// Delete a value
console.log('Deleted 15:', skipList.delete(15)); // true

// Convert to array
console.log('All values:', skipList.toArray()); // [5, 10, 20, 25]

// Get size
console.log('Size:', skipList.getSize()); // 4

// Print structure (for debugging)
skipList.print();
// Custom probability and max levels
const customSkipList = new SkipList<string>(0.3, 20);

// For custom objects, ensure they're comparable
interface CustomObject {
  id: number;
  name: string;
}

const objectSkipList = new SkipList<CustomObject>();
// You'll need to modify comparison logic for complex objects
