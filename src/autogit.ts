// Node class represents individual elements in the linked list
class Node<T> {
  constructor(
    public value: T,
    public next: Node<T> | null = null
  ) {}
}

// Linked list implementation
class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  // Get current size of the list
  get length(): number {
    return this.size;
  }

  // Add element to the beginning of the list
  prepend(value: T): void {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Add element to the end of the list
  append(value: T): void {
    const newNode = new Node(value);
    
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

  // Insert element at specific index
  insertAt(value: T, index: number): void {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    const newNode = new Node(value);
    let current = this.head;
    let previous: Node<T> | null = null;
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

  // Remove element at specific index
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size || !this.head) {
      throw new Error("Index out of bounds");
    }

    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      let previous: Node<T> | null = null;
      let count = 0;

      while (count < index) {
        previous = current;
        current = current.next!;
        count++;
      }

      previous!.next = current.next;
    }

    this.size--;
    return current.value;
  }

  // Get element at specific index
  get(index: number): T | null {
    if (index < 0 || index >= this.size || !this.head) {
      return null;
    }

    let current = this.head;
    let count = 0;

    while (count < index) {
      current = current.next!;
      count++;
    }

    return current.value;
  }

  // Convert linked list to array
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // Print the linked list (for debugging)
  print(): void {
    let current = this.head;
    const values: string[] = [];
    
    while (current) {
      values.push(String(current.value));
      current = current.next;
    }
    
    console.log(values.join(" -> ") + " -> null");
  }
}
// Create a linked list of numbers
const list = new LinkedList<number>();

list.append(10);
list.prepend(5);
list.append(20);
list.insertAt(15, 2);

console.log(list.length); // 4
list.print(); // 5 -> 10 -> 15 -> 20 -> null

list.removeAt(1);
console.log(list.get(1)); // 15
console.log(list.toArray()); // [5, 15, 20]
