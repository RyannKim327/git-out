// Define the structure of a linked list node
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T, next?: ListNode<T> | null) {
    this.value = value;
    this.next = next ?? null;
  }
}

// Function to calculate the length of the linked list
function getLinkedListLength<T>(head: ListNode<T> | null): number {
  let count = 0;
  let current: ListNode<T> | null = head;

  // Traverse the list until current is null
  while (current !== null) {
    count++;
    current = current.next; // Move to the next node
  }

  return count;
}
// Create a sample linked list: 1 -> 2 -> 3 -> null
const node3 = new ListNode(3);
const node2 = new ListNode(2, node3);
const node1 = new ListNode(1, node2);

// Get the length (should return 3)
console.log(getLinkedListLength(node1)); // Output: 3

// Edge case: Empty list (head is null)
console.log(getLinkedListLength(null));  // Output: 0
