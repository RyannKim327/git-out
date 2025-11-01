// 1. Minimal node definition
class ListNode<T> {
  constructor(
    public data: T,
    public next: ListNode<T> | null = null
  ) {}
}

// 2. In-place reversal (iterative, O(n) time, O(1) space)
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // save next
    curr.next = prev;       // flip pointer
    prev = curr;            // move prev forward
    curr = next;            // move curr forward
  }
  return prev; // new head
}

// 3. Optional: recursive version
function reverseRecursive<T>(head: ListNode<T> | null, prev: ListNode<T> | null = null): ListNode<T> | null {
  if (!head) return prev;
  const next = head.next;
  head.next = prev;
  return reverseRecursive(next, head);
}

/* ---------- Usage example ---------- */
const list =
  new ListNode(1,
    new ListNode(2,
      new ListNode(3)));

const reversed = reverseLinkedList(list); // 3 → 2 → 1
