// Node class
class LinkedListNode<T> {
  constructor(
    public data: T,
    public next: LinkedListNode<T> | null = null
  ) {}
}

// Main linked list class
class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private size: number = 0;

  // Add element at the beginning
  prepend(data: T): void {
    const newNode = new LinkedListNode(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Add element at the end
  append(data: T): void {
    const newNode = new LinkedListNode(data);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Insert at specific position
  insertAt(data: T, position: number): void {
    if (position < 0 || position > this.size) {
      throw new Error('Invalid position');
    }

    if (position === 0) {
      this.prepend(data);
      return;
    }

    const newNode = new LinkedListNode(data);
    let current = this.head;
    let previous: LinkedListNode<T> | null = null;
    let index = 0;

    while (index < position) {
      previous = current;
      current = current!.next;
      index++;
    }

    newNode.next = current;
    if (previous) {
      previous.next = newNode;
    }
    this.size++;
  }

  // Remove from beginning
  removeFirst(): T | null {
    if (!this.head) return null;

    const removedData = this.head.data;
    this.head = this.head.next;
    this.size--;
    return removedData;
  }

  // Remove from end
  removeLast(): T | null {
    if (!this.head) return null;

    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      this.size--;
      return data;
    }

    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }

    const data = current.next!.data;
    current.next = null;
    this.size--;
    return data;
  }

  // Remove at specific position
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.size || !this.head) {
      return null;
    }

    if (position === 0) {
      return this.removeFirst();
    }

    let current = this.head;
    let previous: LinkedListNode<T> | null = null;
    let index = 0;

    while (index < position) {
      previous = current;
      current = current.next!;
      index++;
    }

    if (previous) {
      previous.next = current.next;
    }
    this.size--;
    return current.data;
  }

  // Find element
  find(data: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Get element at position
  getAt(position: number): T | null {
    if (position < 0 || position >= this.size || !this.head) {
      return null;
    }

    let current = this.head;
    let index = 0;

    while (index < position) {
      current = current.next!;
      index++;
    }

    return current.data;
  }

  // Check if list is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Get size
  getSize(): number {
    return this.size;
  }

  // Convert to array
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  // Print the list
  print(): void {
    let current = this.head;
    const elements: string[] = [];

    while (current) {
      elements.push(String(current.data));
      current = current.next;
    }

    console.log(elements.join(' -> ') + ' -> null');
  }

  // Clear the list
  clear(): void {
    this.head = null;
    this.size = 0;
  }
}
class DoublyLinkedListNode<T> {
  constructor(
    public data: T,
    public next: DoublyLinkedListNode<T> | null = null,
    public prev: DoublyLinkedListNode<T> | null = null
  ) {}
}

class DoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null = null;
  private tail: DoublyLinkedListNode<T> | null = null;
  private size: number = 0;

  append(data: T): void {
    const newNode = new DoublyLinkedListNode(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(data: T): void {
    const newNode = new DoublyLinkedListNode(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Other methods similar to singly linked list but handling prev pointers
}
// Create and use linked list
const list = new LinkedList<number>();

// Add elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

// Output: 0 -> 1 -> 2 -> 3 -> null
list.print();

// Access elements
console.log(list.getAt(1)); // 1
console.log(list.find(2));  // 2

// Remove elements
list.removeFirst();
list.removeLast();

// String list example
const stringList = new LinkedList<string>();
stringList.append('hello');
stringList.append('world');
stringList.print(); // hello -> world -> null

// Generic object example
interface Person {
  name: string;
  age: number;
}

const personList = new LinkedList<Person>();
personList.append({ name: 'Alice', age: 25 });
personList.append({ name: 'Bob', age: 30 });
class LinkedList<T> implements Iterable<T> {
  // ... previous implementation ...

  // Make the list iterable
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }

  // ForEach method
  forEach(callback: (data: T, index: number) => void): void {
    let current = this.head;
    let index = 0;
    while (current) {
      callback(current.data, index);
      current = current.next;
      index++;
    }
  }

  // Map method
  map<U>(callback: (data: T, index: number) => U): LinkedList<U> {
    const newList = new LinkedList<U>();
    let current = this.head;
    let index = 0;
    
    while (current) {
      newList.append(callback(current.data, index));
      current = current.next;
      index++;
    }
    
    return newList;
  }
}

// Usage with iteration
const numbers = new LinkedList<number>();
numbers.append(1);
numbers.append(2);
numbers.append(3);

// Using for...of
for (const num of numbers) {
  console.log(num);
}

// Using forEach
numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});

// Using map
const doubled = numbers.map(x => x * 2);
doubled.print(); // 2 -> 4 -> 6 -> null
