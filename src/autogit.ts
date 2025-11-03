class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add to the end (append)
  append(value: T): void {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }

  // Add to the beginning (prepend)
  prepend(value: T): void {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.size++;
  }

  // Get element at specific index
  getAt(index: number): ListNode<T> | null {
    if (index < 0 || index >= this.size) return null;
    
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    
    return current;
  }

  // Insert at specific index
  insertAt(value: T, index: number): void {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds");
    }
    
    if (index === 0) {
      this.prepend(value);
      return;
    }
    
    if (index === this.size) {
      this.append(value);
      return;
    }
    
    const newNode = new ListNode(value);
    const prev = this.getAt(index - 1);
    newNode.next = prev!.next;
    prev!.next = newNode;
    this.size++;
  }

  // Remove from specific index
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size) return null;
    
    if (index === 0) {
      const value = this.head!.value;
      this.head = this.head!.next;
      this.size--;
      if (this.size === 0) this.tail = null;
      return value;
    }
    
    const prev = this.getAt(index - 1);
    const nodeToRemove = prev!.next;
    prev!.next = nodeToRemove!.next;
    
    if (index === this.size - 1) {
      this.tail = prev;
    }
    
    this.size--;
    return nodeToRemove!.value;
  }

  // Check if list contains value
  contains(value: T): boolean {
    let current = this.head;
    
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    
    return false;
  }

  // Convert to array
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  // Get size
  getSize(): number {
    return this.size;
  }

  // Clear the list
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}
// Create and use the linked list
const list = new LinkedList<number>();

list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

console.log(list.toArray()); // [0, 1, 2, 3]

list.insertAt(1.5, 2);
console.log(list.toArray()); // [0, 1, 1.5, 2, 3]

list.removeAt(1);
console.log(list.toArray()); // [0, 1.5, 2, 3]

console.log(list.contains(2)); // true
console.log(list.getSize()); // 4
interface ILinkedList<T> {
  append(value: T): void;
  prepend(value: T): void;
  insertAt(value: T, index: number): void;
  removeAt(index: number): T | null;
  getAt(index: number): ListNode<T> | null;
  contains(value: T): boolean;
  toArray(): T[];
  getSize(): number;
  clear(): void;
}

class LinkedList<T> implements ILinkedList<T> {
  // ... implementation as above
}
