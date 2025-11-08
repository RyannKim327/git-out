interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

function findNthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (!head || n <= 0) return null;
  
  // First pass: calculate length
  let length = 0;
  let current: ListNode<T> | null = head;
  
  while (current) {
    length++;
    current = current.next;
  }
  
  if (n > length) return null;
  
  // Second pass: find (length - n)th node from start
  current = head;
  for (let i = 0; i < length - n; i++) {
    current = current!.next;
  }
  
  return current;
}
function findNthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (!head || n <= 0) return null;
  
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;
  
  // Move fast pointer n nodes ahead
  for (let i = 0; i < n; i++) {
    if (!fast) return null; // n > list length
    fast = fast.next;
  }
  
  // Move both pointers until fast reaches end
  while (fast) {
    slow = slow!.next;
    fast = fast.next;
  }
  
  return slow;
}
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  
  append(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  
  findNthFromEnd(n: number): ListNode<T> | null {
    return findNthFromEnd(this.head, n);
  }
}

// Using the two-pointer method
function findNthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (!head || n <= 0) return null;
  
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;
  
  // Move fast pointer n nodes ahead
  for (let i = 0; i < n; i++) {
    if (!fast) return null;
    fast = fast.next;
  }
  
  // Move both pointers until fast reaches end
  while (fast) {
    slow = slow!.next;
    fast = fast.next;
  }
  
  return slow;
}

// Example usage
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

const result = list.findNthFromEnd(2); // Should return node with value 4
console.log(result?.value); // Output: 4
