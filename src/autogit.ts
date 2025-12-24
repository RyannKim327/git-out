interface SkipListNode<T> {
  value: T;
  next: (SkipListNode<T> | null)[];
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
    
    // Create head node with empty value and maxLevel pointers
    this.head = {
      value: null as unknown as T,
      next: Array(maxLevel).fill(null),
      level: maxLevel - 1
    };
  }

  // Randomly determine the level for a new node
  private randomLevel(): number {
    let level = 0;
    while (Math.random() < this.probability && level < this.maxLevel - 1) {
      level++;
    }
    return level;
  }

  // Insert a value into the skip list
  insert(value: T): void {
    const newNodeLevel = this.randomLevel();
    const newNode: SkipListNode<T> = {
      value,
      next: Array(newNodeLevel + 1).fill(null),
      level: newNodeLevel
    };

    const update: Array<SkipListNode<T> | null> = Array(this.maxLevel).fill(null);
    let current = this.head;

    // Traverse from top level to bottom level
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (current.next[i] !== null && current.next[i]!.value < value) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    // Insert the new node at each level
    for (let i = 0; i <= newNodeLevel; i++) {
      newNode.next[i] = update[i]!.next[i];
      update[i]!.next[i] = newNode;
    }

    this.size++;
  }

  // Search for a value in the skip list
  search(value: T): boolean {
    let current = this.head;

    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (current.next[i] !== null && current.next[i]!.value < value) {
        current = current.next[i]!;
      }
    }

    current = current.next[0]!;
    return current !== null && current.value === value;
  }

  // Remove a value from the skip list
  remove(value: T): boolean {
    const update: Array<SkipListNode<T> | null> = Array(this.maxLevel).fill(null);
    let current = this.head;

    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (current.next[i] !== null && current.next[i]!.value < value) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    current = current.next[0]!;

    if (current === null || current.value !== value) {
      return false;
    }

    // Remove the node from all levels
    for (let i = 0; i <= current.level; i++) {
      if (update[i]!.next[i] !== current) {
        break;
      }
      update[i]!.next[i] = current.next[i];
    }

    this.size--;
    return true;
  }

  // Get the number of elements in the skip list
  getSize(): number {
    return this.size;
  }

  // Convert skip list to array (for debugging/display)
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head.next[0];
    
    while (current !== null) {
      result.push(current.value);
      current = current.next[0];
    }
    
    return result;
  }

  // Print the skip list structure (for debugging)
  print(): void {
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      let current = this.head.next[i];
      let output = `Level ${i}: `;
      
      while (current !== null) {
        output += `${current.value} -> `;
        current = current.next[i];
      }
      
      console.log(output + 'null');
    }
  }
}
interface SkipListNode<T> {
  value: T;
  next: (SkipListNode<T> | null)[];
  level: number;
}

class SkipList<T> {
  private head: SkipListNode<T>;
  private maxLevel: number;
  private probability: number;
  private size: number;
  private compare: (a: T, b: T) => number;

  constructor(
    compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0),
    maxLevel: number = 16,
    probability: number = 0.5
  ) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.size = 0;
    this.compare = compareFn;

    this.head = {
      value: null as unknown as T,
      next: Array(maxLevel).fill(null),
      level: maxLevel - 1
    };
  }

  private randomLevel(): number {
    let level = 0;
    while (Math.random() < this.probability && level < this.maxLevel - 1) {
      level++;
    }
    return level;
  }

  insert(value: T): void {
    const newNodeLevel = this.randomLevel();
    const newNode: SkipListNode<T> = {
      value,
      next: Array(newNodeLevel + 1).fill(null),
      level: newNodeLevel
    };

    const update: Array<SkipListNode<T> | null> = Array(this.maxLevel).fill(null);
    let current = this.head;

    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (
        current.next[i] !== null &&
        this.compare(current.next[i]!.value, value) < 0
      ) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    for (let i = 0; i <= newNodeLevel; i++) {
      newNode.next[i] = update[i]!.next[i];
      update[i]!.next[i] = newNode;
    }

    this.size++;
  }

  search(value: T): boolean {
    let current = this.head;

    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (
        current.next[i] !== null &&
        this.compare(current.next[i]!.value, value) < 0
      ) {
        current = current.next[i]!;
      }
    }

    current = current.next[0]!;
    return current !== null && this.compare(current.value, value) === 0;
  }

  remove(value: T): boolean {
    const update: Array<SkipListNode<T> | null> = Array(this.maxLevel).fill(null);
    let current = this.head;

    for (let i = this.maxLevel - 1; i >= 0; i--) {
      while (
        current.next[i] !== null &&
        this.compare(current.next[i]!.value, value) < 0
      ) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    current = current.next[0]!;

    if (current === null || this.compare(current.value, value) !== 0) {
      return false;
    }

    for (let i = 0; i <= current.level; i++) {
      if (update[i]!.next[i] !== current) {
        break;
      }
      update[i]!.next[i] = current.next[i];
    }

    this.size--;
    return true;
  }

  getSize(): number {
    return this.size;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head.next[0];
    
    while (current !== null) {
      result.push(current.value);
      current = current.next[0];
    }
    
    return result;
  }

  print(): void {
    for (let i = this.maxLevel - 1; i >= 0; i--) {
      let current = this.head.next[i];
      let output = `Level ${i}: `;
      
      while (current !== null) {
        output += `${current.value} -> `;
        current = current.next[i];
      }
      
      console.log(output + 'null');
    }
  }
}
// Basic usage with numbers
const skipList = new SkipList<number>();
skipList.insert(10);
skipList.insert(20);
skipList.insert(5);
skipList.insert(15);

console.log(skipList.search(10)); // true
console.log(skipList.search(25)); // false
console.log(skipList.toArray()); // [5, 10, 15, 20]

skipList.remove(10);
console.log(skipList.toArray()); // [5, 15, 20]

// With custom comparator for objects
interface Person {
  id: number;
  name: string;
}

const personSkipList = new SkipList<Person>((a, b) => a.id - b.id);
personSkipList.insert({ id: 3, name: 'Charlie' });
personSkipList.insert({ id: 1, name: 'Alice' });
personSkipList.insert({ id: 2, name: 'Bob' });

console.log(personSkipList.search({ id: 2, name: '' })); // true
