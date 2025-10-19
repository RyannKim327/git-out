// Node class to represent each element in the linked list
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

// LinkedList class
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private size: number = 0;

  // Get the current size of the list
  get length(): number {
    return this.size;
  }

  // Check if the list is empty
  isEmpty(): boolean {
    return this.size === 0;
  }

  // Add element to the end (enqueue)
  append(value: T): void {
    const newNode = new ListNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  // Add element to the beginning
  prepend(value: T): void {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this.size++;
  }

  // Insert element at specific index
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this.size) {
      throw new Error(`Index ${index} is out of bounds`);
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
    let current = this.head!;
    let previous: ListNode<T> | null = null;

    // Find the position to insert
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next!;
    }

    previous!.next = newNode;
    newNode.next = current;
    this.size++;
  }

  // Remove element from the beginning
  removeFirst(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const removedValue = this.head!.value;
    this.head = this.head!.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;
    return removedValue;
  }

  // Remove element from the end
  removeLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    if (this.size === 1) {
      return this.removeFirst();
    }

    let current = this.head;
    let previous: ListNode<T> | null = null;

    // Traverse to the second last node
    while (current!.next) {
      previous = current;
      current = current.next;
    }

    const removedValue = current!.value;
    previous!.next = null;
    this.tail = previous;
    this.size--;

    return removedValue;
  }

  // Remove element at specific index
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} is out of bounds`);
    }

    if (index === 0) {
      return this.removeFirst();
    }

    if (index === this.size - 1) {
      return this.removeLast();
    }

    let current = this.head!;
    let previous: ListNode<T> | null = null;

    // Find the node to remove
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next!;
    }

    const removedValue = current.value;
    previous!.next = current.next;
    this.size--;

    return removedValue;
  }

  // Get element at specific index
  getAt(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      return undefined;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    return current?.value;
  }

  // Find element by value
  find(value: T, fromIndex: number = 0): number {
    let current = this.head;
    let index = 0;

    while (current && index < fromIndex) {
      current = current.next;
      index++;
    }

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Clear the entire list
  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Convert list to array
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // Print the list (for debugging)
  print(): void {
    const values = this.toArray();
    console.log('LinkedList:', values);
  }

  // Reverse the linked list
  reverse(): void {
    let previous: ListNode<T> | null = null;
    let current = this.head;
    let next: ListNode<T> | null = null;

    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    this.head = previous;
    this.tail = this.head;
  }
}
// Create a new linked list
const list = new LinkedList<number>();

// Add elements
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

// Insert at specific position
list.insertAt(2, 1.5);

// Print the list
list.print(); // Output: LinkedList: [0, 1, 1.5, 2, 3]

// Get element at index
console.log(list.getAt(2)); // Output: 1.5

// Find element
console.log(list.find(2)); // Output: 3 (index of 2)

// Remove elements
list.removeFirst();
list.removeLast();
list.print(); // Output: LinkedList: [1, 1.5, 2]

// Reverse the list
list.reverse();
list.print(); // Output: LinkedList: [2, 1.5, 1]

// Check size and emptiness
console.log('Size:', list.length); // Output: 3
console.log('Is empty?', list.isEmpty()); // Output: false
