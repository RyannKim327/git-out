// Define the node interface
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  // Add to the end of the list
  append(value: T): void {
    const newNode: ListNode<T> = { value, next: null };

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  // Add to the beginning of the list
  prepend(value: T): void {
    const newNode: ListNode<T> = { value, next: this.head };

    if (!this.head) {
      this.tail = newNode;
    }

    this.head = newNode;
    this.length++;
  }

  // Insert at a specific position
  insertAt(value: T, position: number): void {
    if (position < 0 || position > this.length) {
      throw new Error('Position out of bounds');
    }

    if (position === 0) {
      this.prepend(value);
      return;
    }

    if (position === this.length) {
      this.append(value);
      return;
    }

    const newNode: ListNode<T> = { value, next: null };
    let current = this.head;
    let previous: ListNode<T> | null = null;
    let index = 0;

    while (index < position) {
      previous = current;
      current = current!.next;
      index++;
    }

    newNode.next = current;
    previous!.next = newNode;
    this.length++;
  }

  // Remove by value
  remove(value: T): boolean {
    if (!this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (this.length === 1) {
        this.tail = null;
      }
      this.length--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        
        if (!current.next) {
          this.tail = current;
        }
        
        this.length--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  // Remove at specific position
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.length || !this.head) {
      return null;
    }

    if (position === 0) {
      const removedValue = this.head.value;
      this.head = this.head.next;
      if (this.length === 1) {
        this.tail = null;
      }
      this.length--;
      return removedValue;
    }

    let current = this.head;
    let previous: ListNode<T> | null = null;
    let index = 0;

    while (index < position) {
      previous = current;
      current = current.next!;
      index++;
    }

    previous!.next = current.next;
    
    if (!current.next) {
      this.tail = previous;
    }
    
    this.length--;
    return current.value;
  }

  // Find a value
  find(value: T): ListNode<T> | null {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  // Get value at position
  getAt(position: number): T | null {
    if (position < 0 || position >= this.length) return null;

    let current = this.head;
    let index = 0;

    while (index < position) {
      current = current!.next;
      index++;
    }

    return current!.value;
  }

  // Check if list is empty
  isEmpty(): boolean {
    return this.length === 0;
  }

  // Get size
  size(): number {
    return this.length;
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
    this.length = 0;
  }

  // Print the list (for debugging)
  print(): void {
    let current = this.head;
    let output = '';

    while (current) {
      output += `${current.value} -> `;
      current = current.next;
    }
    output += 'null';
    console.log(output);
  }
}
// Create a linked list of numbers
const list = new LinkedList<number>();

list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

console.log(list.toArray()); // [0, 1, 2, 3]

list.insertAt(1.5, 2);
console.log(list.toArray()); // [0, 1, 1.5, 2, 3]

list.remove(1.5);
console.log(list.toArray()); // [0, 1, 2, 3]

console.log(list.find(2)); // Returns the node with value 2
console.log(list.size()); // 4
console.log(list.getAt(1)); // 1

list.print(); // 0 -> 1 -> 2 -> 3 -> null
// String linked list
const stringList = new LinkedList<string>();
stringList.append('hello');
stringList.append('world');

// Custom object linked list
interface Person {
  name: string;
  age: number;
}

const personList = new LinkedList<Person>();
personList.append({ name: 'Alice', age: 25 });
personList.append({ name: 'Bob', age: 30 });
