// Define a Node class
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

// Function to find the middle element
function findMiddleElement<T>(head: ListNode<T> | null): T | null {
  if (!head) return null;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  // Move fast by two steps and slow by one step
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // When fast reaches the end, slow will be at the middle
  return slow ? slow.value : null;
}

// Alternative: Return the middle node itself
function findMiddleNode<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow;
}
// Create a sample linked list: 1 -> 2 -> 3 -> 4 -> 5
const head = new ListNode(1);
head.next = new ListNode(2);
head.next!.next = new ListNode(3);
head.next!.next!.next = new ListNode(4);
head.next!.next!.next!.next = new ListNode(5);

// Find and print the middle element
const middleValue = findMiddleElement(head);
console.log(middleValue); // Output: 3

// Or get the middle node
const middleNode = findMiddleNode(head);
console.log(middleNode?.value); // Output: 3
