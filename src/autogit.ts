// Define the node structure
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Utility to compute the length
function getLength<T>(head: ListNode<T> | null): number {
  let count = 0;
  let current = head;
  while (current) {
    count++;
    current = current.next;
  }
  return count;
}

/* ---------- Usage demo ---------- */
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

console.log(getLength(head)); // → 3
