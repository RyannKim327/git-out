// Node class interface
interface INode<T> {
  data: T;
  next: INode<T> | null;
}

// Linked List interface
interface ILinkedList<T> {
  head: INode<T> | null;
  tail: INode<T> | null;
  size: number;
  
  append(data: T): void;
  prepend(data: T): void;
  insertAt(data: T, index: number): void;
  removeAt(index: number): T | null;
  remove(data: T): boolean;
  find(data: T): INode<T> | null;
  getAt(index: number): T | null;
  isEmpty(): boolean;
  clear(): void;
  toString(): string;
  toArray(): T[];
}

// Node implementation
class ListNode<T> implements INode<T> {
  constructor(
    public data: T,
    public next: ListNode<T> | null = null
  ) {}
}

// Linked List implementation
class LinkedList<T> implements ILinkedList<T> {
  public head: ListNode<T> | null = null;
  public tail: ListNode<T> | null = null;
  public size: number = 0;

  // Add to the end
  append(data: T): void {
    const newNode = new ListNode(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }

  // Add to the beginning
  prepend(data: T): void {
    const newNode = new ListNode(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.size++;
  }

  // Insert at specific index
  insertAt(data: T, index: number): void {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      this.prepend(data);
      return;
    }

    if (index === this.size) {
      this.append(data);
      return;
    }

    const newNode = new ListNode(data);
    let current = this.head;
    let previous: ListNode<T> | null = null;
    let count = 0;

    while (count < index) {
      previous = current;
      current = current!.next;
      count++;
    }

    newNode.next = current;
    previous!.next = newNode;
    this.size++;
  }

  // Remove at specific index
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size || !this.head) {
      return null;
    }

    if (index === 0) {
      const removedData = this.head.data;
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.size--;
      return removedData;
    }

    let current = this.head;
    let previous: ListNode<T> | null = null;
    let count = 0;

    while (count < index && current) {
      previous = current;
      current = current.next!;
      count++;
    }

    if (current) {
      previous!.next = current.next;
      
      // Update tail if we're removing the last element
      if (!current.next) {
        this.tail = previous;
      }
      
      this.size--;
      return current.data;
    }

    return null;
  }

  // Remove by value
  remove(data: T): boolean {
    if (!this.head) return false;

    // If head contains the data
    if (this.head.data === data) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.size--;
      return true;
    }

    let current = this.head;
    let previous: ListNode<T> | null = null;

    while (current && current.data !== data) {
      previous = current;
      current = current.next!;
    }

    if (current && current.data === data) {
      previous!.next = current.next;
      
      // Update tail if we're removing the last element
      if (!current.next) {
        this.tail = previous;
      }
      
      this.size--;
      return true;
    }

    return false;
  }

  // Find node by value
  find(data: T): ListNode<T> | null {
    let current = this.head;
    
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    
    return null;
  }

  // Get data at specific index
  getAt(index: number): T | null {
    if (index < 0 || index >= this.size || !this.head) {
      return null;
    }

    let current = this.head;
    let count = 0;

    while (count < index && current) {
      current = current.next!;
      count++;
    }

    return current ? current.data : null;
  }

  // Check if list is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Clear the list
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Convert to string
  toString(): string {
    const elements: T[] = [];
    let current = this.head;
    
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    
    return elements.join(' -> ');
  }

  // Convert to array
  toArray(): T[] {
    const elements: T[] = [];
    let current = this.head;
    
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    
    return elements;
  }

  // Iterator for easy looping
  *[Symbol.iterator](): IterableIterator<T> {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }
}
// Create and use the linked list
const list = new LinkedList<number>();

// Basic operations
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

console.log(list.toString()); // "0 -> 1 -> 2 -> 3"
console.log(list.size); // 4

// Insert at position
list.insertAt(1.5, 2);
console.log(list.toString()); // "0 -> 1 -> 1.5 -> 2 -> 3"

// Remove operations
list.removeAt(2); // Remove 1.5
list.remove(3); // Remove value 3
console.log(list.toString()); // "0 -> 1 -> 2"

// Find and get
console.log(list.find(1)); // ListNode { data: 1, next: ListNode { ... } }
console.log(list.getAt(1)); // 1

// Iteration
for (const item of list) {
  console.log(item); // 0, 1, 2
}

// With custom objects
interface Person {
  name: string;
  age: number;
}

const peopleList = new LinkedList<Person>();
peopleList.append({ name: 'Alice', age: 25 });
peopleList.append({ name: 'Bob', age: 30 });

console.log(peopleList.find({ name: 'Alice', age: 25 })); // Finds the node
// Doubly Linked List Node
class DoublyListNode<T> {
  constructor(
    public data: T,
    public next: DoublyListNode<T> | null = null,
    public prev: DoublyListNode<T> | null = null
  ) {}
}

class DoublyLinkedList<T> extends LinkedList<T> {
  // Override append for doubly linked behavior
  append(data: T): void {
    const newNode = new DoublyListNode(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail as DoublyListNode<T>;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }

  // Additional methods for reverse traversal
  toArrayReverse(): T[] {
    const elements: T[] = [];
    let current = this.tail as DoublyListNode<T> | null;
    
    while (current) {
      elements.push(current.data);
      current = current.prev;
    }
    
    return elements;
  }
}
