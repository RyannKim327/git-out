interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

class LinkedListNode<T> implements ListNode<T> {
  constructor(
    public value: T,
    public next: LinkedListNode<T> | null = null
  ) {}
}
function reverseLinkedListIterative<T>(
  head: ListNode<T> | null
): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let current: ListNode<T> | null = head;
  let next: ListNode<T> | null = null;

  while (current !== null) {
    // Store next node
    next = current.next;
    
    // Reverse the link
    current.next = prev;
    
    // Move pointers forward
    prev = current;
    current = next;
  }
  
  return prev; // New head
}
function reverseLinkedListRecursive<T>(
  head: ListNode<T> | null
): ListNode<T> | null {
  // Base case: empty list or single node
  if (head === null || head.next === null) {
    return head;
  }
  
  // Reverse the rest of the list
  const newHead = reverseLinkedListRecursive(head.next);
  
  // Adjust pointers
  head.next.next = head;
  head.next = null;
  
  return newHead;
}
// Helper function to create a linked list from array
function createLinkedList<T>(values: T[]): ListNode<T> | null {
  if (values.length === 0) return null;
  
  const head = new LinkedListNode(values[0]);
  let current = head;
  
  for (let i = 1; i < values.length; i++) {
    current.next = new LinkedListNode(values[i]);
    current = current.next;
  }
  
  return head;
}

// Helper function to convert linked list to array
function linkedListToArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = [];
  let current = head;
  
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }
  
  return result;
}

// Example usage
const originalList = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original:", linkedListToArray(originalList));

const reversedIterative = reverseLinkedListIterative(originalList);
console.log("Reversed (Iterative):", linkedListToArray(reversedIterative));

const anotherList = createLinkedList([1, 2, 3, 4, 5]);
const reversedRecursive = reverseLinkedListRecursive(anotherList);
console.log("Reversed (Recursive):", linkedListToArray(reversedRecursive));
class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  
  reverse(): void {
    this.head = reverseLinkedListIterative(this.head);
  }
  
  // Add other LinkedList methods (add, remove, etc.)
}
