class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let current: ListNode<T> | null = head;
  
  while (current !== null) {
    // Store the next node before we change pointers
    const nextTemp = current.next;
    
    // Reverse the link
    current.next = prev;
    
    // Move prev and current one step forward
    prev = current;
    current = nextTemp;
  }
  
  // prev is now the new head
  return prev;
}
function reverseLinkedListRecursive<T>(
  head: ListNode<T> | null
): ListNode<T> | null {
  // Base case: empty list or single node
  if (head === null || head.next === null) {
    return head;
  }
  
  // Recursively reverse the rest of the list
  const newHead = reverseLinkedListRecursive(head.next);
  
  // Reverse the current node's pointer and the next node's pointer
  head.next.next = head;
  head.next = null;
  
  return newHead;
}
// Helper function to create a linked list from array
function createLinkedList<T>(values: T[]): ListNode<T> | null {
  if (values.length === 0) return null;
  
  const head = new ListNode(values[0]);
  let current = head;
  
  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }
  
  return head;
}

// Helper function to print the linked list
function printLinkedList<T>(head: ListNode<T> | null): void {
  let current = head;
  const values: T[] = [];
  
  while (current !== null) {
    values.push(current.value);
    current = current.next;
  }
  
  console.log(values.join(' -> '));
}

// Example usage
const originalList = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original:");
printLinkedList(originalList); // Output: 1 -> 2 -> 3 -> 4 -> 5

const reversedList = reverseLinkedList(originalList);
console.log("Reversed:");
printLinkedList(reversedList); // Output: 5 -> 4 -> 3 -> 2 -> 1
