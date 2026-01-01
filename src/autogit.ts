// Minimal node definition
class ListNode<T> {
  constructor(
    public data: T,
    public next: ListNode<T> | null = null
  ) {}
}

/**
 * Returns the middle node of a singly-linked list.
 * For even lengths it returns the *second* middle node.
 * If the list is empty, returns null.
 */
function middleNode<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  // Move fast twice and slow once until fast can't advance
  while (fast && fast.next) {
    slow = slow!.next;      // slow != null because fast.next != null
    fast = fast.next.next;
  }
  return slow;
}

/* ---------- Usage example ---------- */
const head = new ListNode(1,
              new ListNode(2,
              new ListNode(3,
              new ListNode(4,
              new ListNode(5)))));   // 1->2->3->4->5

const mid = middleNode(head);
console.log(mid?.data); // 3
