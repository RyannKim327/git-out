// Minimal node definition
class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) { this.val = val; }
}

/**
 * Returns true if the linked list starting at `head` contains a cycle.
 * Time  : O(n)
 * Space : O(1)
 */
function hasCycle(head: ListNode | null): boolean {
  if (!head) return false;

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow!.next;          // 1 step
    fast = fast.next.next;      // 2 steps

    if (slow === fast) return true; // pointers met ⇒ cycle
  }
  return false; // fast hit null ⇒ no cycle
}

/* ---------- Usage example ---------- */
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
a.next = b;
b.next = c;
c.next = b; // creates a cycle
console.log(hasCycle(a)); // → true
