interface SkipListNode<T> {
  value: T;
  next: SkipListNode<T>[];
  prev?: SkipListNode<T>[];
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
      value: null as unknown as T,
      next: new Array(maxLevel).fill(null)
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
   * Find the node with the given value or the insertion point
   */
  private find(value: T): SkipListNode<T>[] {
    const update: SkipListNode<T>[] = new Array(this.maxLevel).fill(null);
    let current = this.head;
    
    // Start from the top level and work down
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (current.next[i] !== null && current.next[i].value < value) {
        current = current.next[i];
      }
      update[i] = current;
    }
    
    return update;
  }
  
  /**
   * Insert a value into the skip list
   */
  insert(value: T): void {
    const update = this.find(value);
    const level = this.randomLevel();
    
    // Create new node
    const newNode: SkipListNode<T> = {
      value,
      next: new Array(level).fill(null)
    };
    
    // Update pointers at each level
    for (let i = 0; i < level; i++) {
      newNode.next[i] = update[i].next[i];
      update[i].next[i] = newNode;
    }
    
    this.size++;
  }
  
  /**
   * Search for a value in the skip list
   */
  search(value: T): boolean {
    let current = this.head;
    
    // Start from the top level
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (current.next[i] !== null && current.next[i].value <= value) {
        if (current.next[i].value === value) {
          return true;
        }
        current = current.next[i];
      }
    }
    
    return false;
  }
  
  /**
   * Remove a value from the skip list
   */
  remove(value: T): boolean {
    const update = this.find(value);
    const nodeToRemove = update[0].next[0];
    
    // Check if the node exists
    if (nodeToRemove === null || nodeToRemove.value !== value) {
      return false;
    }
    
    // Update pointers at each level
    for (let i = 0; i < nodeToRemove.next.length; i++) {
      update[i].next[i] = nodeToRemove.next[i];
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
   * Print the skip list structure (for debugging)
   */
  print(): void {
    console.log('Skip List Structure:');
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      let current = this.head.next[i];
      const levelValues: string[] = [];
      
      while (current !== null) {
        levelValues.push(current.value.toString());
        current = current.next[i];
      }
      
      console.log(`Level ${i}: ${levelValues.join(' -> ')}`);
    }
  }
}

// Example usage
class SkipListExample {
  static runExample(): void {
    const skipList = new SkipList<number>();
    
    // Insert values
    const values = [3, 6, 7, 9, 12, 19, 17, 26, 21, 25];
    values.forEach(val => skipList.insert(val));
    
    console.log('After insertion:');
    skipList.print();
    console.log('Sorted array:', skipList.toArray());
    console.log('Size:', skipList.getSize());
    
    // Search for values
    console.log('\nSearch operations:');
    console.log('Contains 7:', skipList.search(7)); // true
    console.log('Contains 15:', skipList.search(15)); // false
    
    // Remove values
    console.log('\nRemove operations:');
    console.log('Remove 7:', skipList.remove(7)); // true
    console.log('Remove 15:', skipList.remove(15)); // false
    
    console.log('After removal:');
    skipList.print();
    console.log('Sorted array:', skipList.toArray());
    console.log('Size:', skipList.getSize());
  }
}

// Run the example
SkipListExample.runExample();
interface Comparable {
  compareTo(other: any): number;
}

class EnhancedSkipList<T extends Comparable> {
  private head: SkipListNode<T>;
  private maxLevel: number;
  private probability: number;
  private size: number;
  
  constructor(maxLevel: number = 16, probability: number = 0.5) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.size = 0;
    
    this.head = {
      value: null as unknown as T,
      next: new Array(maxLevel).fill(null)
    };
  }
  
  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }
  
  private find(value: T): SkipListNode<T>[] {
    const update: SkipListNode<T>[] = new Array(this.maxLevel).fill(null);
    let current = this.head;
    
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (
        current.next[i] !== null && 
        current.next[i].value.compareTo(value) < 0
      ) {
        current = current.next[i];
      }
      update[i] = current;
    }
    
    return update;
  }
  
  insert(value: T): void {
    const update = this.find(value);
    const level = this.randomLevel();
    
    const newNode: SkipListNode<T> = {
      value,
      next: new Array(level).fill(null)
    };
    
    for (let i = 0; i < level; i++) {
      newNode.next[i] = update[i].next[i];
      update[i].next[i] = newNode;
    }
    
    this.size++;
  }
  
  // Other methods similar to the basic implementation
}

// Example with custom comparable objects
class Person implements Comparable {
  constructor(public name: string, public age: number) {}
  
  compareTo(other: Person): number {
    return this.age - other.age;
  }
  
  toString(): string {
    return `${this.name} (${this.age})`;
  }
}
// Basic usage with numbers
const numberSkipList = new SkipList<number>();
numberSkipList.insert(5);
numberSkipList.insert(2);
numberSkipList.insert(8);
console.log(numberSkipList.search(5)); // true

// Usage with custom objects
const personSkipList = new EnhancedSkipList<Person>();
personSkipList.insert(new Person("Alice", 25));
personSkipList.insert(new Person("Bob", 30));
