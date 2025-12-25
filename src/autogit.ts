interface SkipListNode<T> {
  value: T;
  next: SkipListNode<T> | null;
  down: SkipListNode<T> | null;
  level: number;
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
    
    // Create head node with max level
    this.head = this.createNode(null as T, maxLevel);
    
    // Initialize all head pointers to null
    let current: SkipListNode<T> = this.head;
    for (let i = maxLevel - 1; i >= 0; i--) {
      current.next = null;
      if (i > 0) {
        current.down = this.createNode(null as T, i);
        current = current.down;
      }
    }
  }

  private createNode(value: T, level: number): SkipListNode<T> {
    return {
      value,
      next: null,
      down: null,
      level
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
    const newLevel = this.randomLevel();
    const newNode = this.createNode(value, newLevel);
    
    let current = this.head;
    const update: SkipListNode<T>[] = new Array(this.maxLevel).fill(null);
    
    // Find insertion points at each level
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next && current.next.value < value) {
        current = current.next;
      }
      update[level] = current;
      
      // Move down to next level
      if (current.down) {
        current = current.down;
      }
    }
    
    // Insert the node at each appropriate level
    for (let level = 0; level < newLevel; level++) {
      const updateNode = update[level];
      if (updateNode) {
        newNode.next = updateNode.next;
        updateNode.next = newNode;
        
        // Create down pointer for next level
        if (level < newLevel - 1) {
          newNode.down = this.createNode(value, level);
          newNode = newNode.down;
        }
      }
    }
    
    this.size++;
  }

  search(value: T): boolean {
    let current = this.head;
    
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next && current.next.value <= value) {
        if (current.next.value === value) {
          return true;
        }
        current = current.next;
      }
      
      if (current.down) {
        current = current.down;
      }
    }
    
    return false;
  }

  delete(value: T): boolean {
    let current = this.head;
    let found = false;
    const update: SkipListNode<T>[] = new Array(this.maxLevel).fill(null);
    
    // Find the node and track update points
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next && current.next.value < value) {
        current = current.next;
      }
      update[level] = current;
      
      if (current.down) {
        current = current.down;
      }
    }
    
    // Delete the node at all levels
    for (let level = 0; level < this.maxLevel; level++) {
      const updateNode = update[level];
      if (updateNode && updateNode.next && updateNode.next.value === value) {
        updateNode.next = updateNode.next.next;
        found = true;
      }
    }
    
    if (found) {
      this.size--;
    }
    
    return found;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    // Go to bottom level
    while (current.down) {
      current = current.down;
    }
    
    // Traverse bottom level
    current = current.next;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  getSize(): number {
    return this.size;
  }

  // Debugging method to visualize the skip list
  print(): void {
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      let current = this.head;
      let output = `Level ${level}: `;
      
      // Find the head at this level
      while (current.level > level) {
        if (current.down) {
          current = current.down;
        }
      }
      
      current = current.next;
      while (current) {
        output += `${current.value} -> `;
        current = current.next;
      }
      
      console.log(output + 'null');
    }
  }
}
interface SkipListNode<T> {
  value: T;
  next: SkipListNode<T> | null;
  down: SkipListNode<T> | null;
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
    
    this.head = this.createNode(null as T, maxLevel);
    this.initializeHead();
  }

  private initializeHead(): void {
    let current: SkipListNode<T> = this.head;
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      current.next = null;
      if (i > 0) {
        current.down = this.createNode(null as T, i);
        current = current.down;
      }
    }
  }

  private createNode(value: T, level: number): SkipListNode<T> {
    return { value, next: null, down: null, level };
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
    const newLevel = this.randomLevel();
    let newNode = this.createNode(value, newLevel);
    
    let current = this.head;
    const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);
    
    // Find insertion points
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next && this.compare(current.next.value, value) < 0) {
        current = current.next;
      }
      update[level] = current;
      
      if (current.down) {
        current = current.down;
      }
    }
    
    // Insert at all appropriate levels
    for (let level = 0; level < newLevel; level++) {
      const updateNode = update[level];
      if (updateNode) {
        newNode.next = updateNode.next;
        updateNode.next = newNode;
        
        // Prepare down node for next level
        if (level < newLevel - 1) {
          const downNode = this.createNode(value, level);
          newNode.down = downNode;
          newNode = downNode;
        }
      }
    }
    
    this.size++;
  }

  search(value: T): boolean {
    let current = this.head;
    
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next && this.compare(current.next.value, value) <= 0) {
        if (this.compare(current.next.value, value) === 0) {
          return true;
        }
        current = current.next;
      }
      
      if (current.down) {
        current = current.down;
      }
    }
    
    return false;
  }

  delete(value: T): boolean {
    let current = this.head;
    let found = false;
    const update: (SkipListNode<T> | null)[] = new Array(this.maxLevel).fill(null);
    
    // Find node and update points
    for (let level = this.maxLevel - 1; level >= 0; level--) {
      while (current.next && this.compare(current.next.value, value) < 0) {
        current = current.next;
      }
      update[level] = current;
      
      if (current.down) {
        current = current.down;
      }
    }
    
    // Remove node from all levels
    for (let level = 0; level < this.maxLevel; level++) {
      const updateNode = update[level];
      if (updateNode && updateNode.next && 
          this.compare(updateNode.next.value, value) === 0) {
        updateNode.next = updateNode.next.next;
        found = true;
      }
    }
    
    if (found) {
      this.size--;
    }
    
    return found;
  }

  // Get minimum value
  min(): T | null {
    let current = this.head;
    while (current.down) {
      current = current.down;
    }
    return current.next ? current.next.value : null;
  }

  // Get maximum value
  max(): T | null {
    let current = this.head;
    while (current.down) {
      current = current.down;
    }
    
    while (current.next) {
      current = current.next;
    }
    
    return current.value !== null ? current.value : null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    // Navigate to bottom level
    while (current.down) {
      current = current.down;
    }
    
    // Collect all values
    current = current.next;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
// Basic usage with numbers
const skipList = new SkipList<number>();

skipList.insert(10);
skipList.insert(5);
skipList.insert(15);
skipList.insert(20);
skipList.insert(3);

console.log(skipList.toArray()); // [3, 5, 10, 15, 20]
console.log(skipList.search(10)); // true
console.log(skipList.search(7)); // false

skipList.delete(10);
console.log(skipList.toArray()); // [3, 5, 15, 20]

// Usage with custom comparator for objects
interface Person {
  name: string;
  age: number;
}

const personSkipList = new EnhancedSkipList<Person>(
  (a, b) => a.age - b.age
);

personSkipList.insert({ name: "Alice", age: 25 });
personSkipList.insert({ name: "Bob", age: 30 });
personSkipList.insert({ name: "Charlie", age: 20 });

console.log(personSkipList.toArray());
// [{name: "Charlie", age: 20}, {name: "Alice", age: 25}, {name: "Bob", age: 30}]
