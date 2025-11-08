// Define a generic Node class
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

// Define the LinkedList class
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private length: number = 0;

  // Add item at the end of the list
  append(value: T): void {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  // Add item at the beginning of the list
  prepend(value: T): void {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;
    this.length++;
  }

  // Delete first occurrence of a value
  delete(value: T): void {
    if (!this.head) return;

    // If head needs to be deleted
    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  // Find a value in the list
  find(value: T): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  // Get list size (O(1) complexity)
  size(): number {
    return this.length;
  }

  // Check if list is empty
  isEmpty(): boolean {
    return this.length === 0;
  }

  // Print the list as an array (for debugging)
  print(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

// Example usage
const list = new LinkedList<number>();

list.append(10);
list.append(20);
list.prepend(5);
list.append(30);

console.log(list.print());            // [5, 10, 20, 30]
console.log(list.size());             // 4

list.delete(20);
console.log(list.print());            // [5, 10, 30]

console.log(list.find(10)?.value);    // 10
console.log(list.find(99));           // null
