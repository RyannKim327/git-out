// Minimal node definition
class ListNode<T = number> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

/**
 * Returns true if the list starting at `head` contains a cycle.
 * Time  : O(n)   – each node visited at most twice
 * Memory: O(1)   – only two extra pointers
 */
function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) return false;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head.next;

  while (fast && fast.next) {
    if (slow === fast) return true;   // pointers met → cycle
    slow = slow.next;                 // 1 step
    fast = fast.next.next;            // 2 steps
  }
  return false;                       // fast hit null → no cycle
}

/* ---------- Usage example ---------- */
const n1 = new ListNode(1);
const n2 = new ListNode(2);
const n3 = new ListNode(3);
const n4 = new ListNode(4);
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n2;          // creates the cycle 4→2

console.log(hasCycle(n1)); // true
