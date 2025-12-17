class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null;

  constructor() {
    this.head = null;
  }
}
class LinkedList<T> {
  // ... previous code
  
  reverseIterative(): void {
    let prev: ListNode<T> | null = null;
    let current = this.head;
    let next: ListNode<T> | null = null;

    while (current !== null) {
      // Store next node
      next = current.next;
      
      // Reverse the link
      current.next = prev;
      
      // Move pointers one position ahead
      prev = current;
      current = next;
    }
    
    this.head = prev;
  }
}
class LinkedList<T> {
  // ... previous code
  
  reverseRecursive(): void {
    this.head = this._reverseRecursive(this.head);
  }

  private _reverseRecursive(node: ListNode<T> | null): ListNode<T> | null {
    if (node === null || node.next === null) {
      return node;
    }
    
    const reversedHead = this._reverseRecursive(node.next);
    node.next.next = node;
    node.next = null;
    
    return reversedHead;
  }
}
class LinkedList<T> {
  // ... previous code
  
  reverseUsingStack(): void {
    if (!this.head) return;
    
    const stack: ListNode<T>[] = [];
    let current: ListNode<T> | null = this.head;
    
    // Push all nodes to stack
    while (current !== null) {
      stack.push(current);
      current = current.next;
    }
    
    // Set new head (last node)
    this.head = stack.pop()!;
    current = this.head;
    
    // Pop from stack and set next pointers
    while (stack.length > 0) {
      current.next = stack.pop()!;
      current = current.next;
    }
    
    current.next = null;
  }
}
class LinkedList<T> {
  head: ListNode<T> | null;

  constructor() {
    this.head = null;
  }

  // Add node to end
  append(value: T): void {
    const newNode = new ListNode(value);
    
    if (!this.head) {
      this.head = newNode;
      return;
    }
    
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Print the list
  print(): void {
    let current = this.head;
    const values: T[] = [];
    
    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    
    console.log(values.join(' → '));
  }

  // Iterative reverse
  reverseIterative(): void {
    let prev: ListNode<T> | null = null;
    let current = this.head;
    let next: ListNode<T> | null = null;

    while (current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    
    this.head = prev;
  }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

console.log("Original list:");
list.print(); // 1 → 2 → 3 → 4

list.reverseIterative();

console.log("Reversed list:");
list.print(); // 4 → 3 → 2 → 1
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let current = head;
  let next: ListNode<T> | null = null;

  while (current !== null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}

// Usage
const reversedHead = reverseLinkedList(list.head);
