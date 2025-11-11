class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private size: number = 0;

  // Add to the end of the list
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

  // Add to the beginning of the list
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

  // Insert at specific position
  insertAt(value: T, position: number): void {
    if (position < 0 || position > this.size) {
      throw new Error("Invalid position");
    }

    if (position === 0) {
      this.prepend(value);
      return;
    }

    if (position === this.size) {
      this.append(value);
      return;
    }

    const newNode = new ListNode(value);
    let current = this.head;
    let previous: ListNode<T> | null = null;
    let index = 0;

    while (index < position) {
      previous = current;
      current = current!.next;
      index++;
    }

    previous!.next = newNode;
    newNode.next = current;
    this.size++;
  }

  // Remove from end
  removeLast(): T | null {
    if (!this.head) return null;

    if (this.head === this.tail) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.size = 0;
      return value;
    }

    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }

    const value = this.tail!.value;
    current.next = null;
    this.tail = current;
    this.size--;
    return value;
  }

  // Remove from beginning
  removeFirst(): T | null {
    if (!this.head) return null;

    const value = this.head.value;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;
    return value;
  }

  // Remove at specific position
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.size || !this.head) {
      return null;
    }

    if (position === 0) {
      return this.removeFirst();
    }

    let current: ListNode<T> | null = this.head;
    let previous: ListNode<T> | null = null;
    let index = 0;

    while (current && index < position) {
      previous = current;
      current = current.next;
      index++;
    }

    if (!current) return null;

    previous!.next = current.next;
    
    if (current === this.tail) {
      this.tail = previous;
    }

    this.size--;
    return current.value;
  }

  // Find element
  find(value: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) {
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

    let current: ListNode<T> | null = this.head;
    let index = 0;

    while (current && index < position) {
      current = current.next;
      index++;
    }

    return current ? current.value : null;
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
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // Clear the list
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Print the list
  print(): void {
    let current = this.head;
    const values: string[] = [];

    while (current) {
      values.push(String(current.value));
      current = current.next;
    }

    console.log(values.join(" -> "));
  }
}
class DoublyListNode<T> {
  constructor(
    public value: T,
    public next: DoublyListNode<T> | null = null,
    public prev: DoublyListNode<T> | null = null
  ) {}
}

class DoublyLinkedList<T> {
  private head: DoublyListNode<T> | null = null;
  private tail: DoublyListNode<T> | null = null;
  private size: number = 0;

  append(value: T): void {
    const newNode = new DoublyListNode(value);
    
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

  prepend(value: T): void {
    const newNode = new DoublyListNode(value);
    
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

  removeLast(): T | null {
    if (!this.tail) return null;

    const value = this.tail.value;
    
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
    }
    
    this.size--;
    return value;
  }

  // Other methods similar to singly linked list...
}
// Create a new linked list
const list = new LinkedList<number>();

// Add elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

// Display the list
list.print(); // "0 -> 1 -> 2 -> 3"

// Get elements
console.log(list.getAt(1)); // 1
console.log(list.find(2)); // 2 (index)

// Remove elements
list.removeFirst();
list.removeLast();
list.print(); // "1 -> 2"

// Convert to array
console.log(list.toArray()); // [1, 2]

// Get size
console.log(list.getSize()); // 2
