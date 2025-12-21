// Minimal node definition
class ListNode {
  value: any;
  next: ListNode | null = null;
  constructor(value: any) { this.value = value; }
}

/**
 * Returns true if the list starting at `head` contains a cycle.
 * Time  : O(n)
 * Memory: O(1)
 */
function hasCycle(head: ListNode | null): boolean {
  if (!head) return false;

  let slow: ListNode | null = head;      // moves 1 step
  let fast: ListNode | null = head.next; // moves 2 steps

  while (fast && fast.next) {
    if (slow === fast) return true;      // pointers met → cycle
    slow = slow.next;
    fast = fast.next.next;
  }
  return false;                          // fast hit null → no cycle
}

/* ---------- Usage example ---------- */
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
a.next = b;
b.next = c;
c.next = b;        // creates the cycle
console.log(hasCycle(a)); // true
