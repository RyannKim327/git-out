// Minimal node definition
class ListNode<T = number> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

/**
 * Returns true if the linked list starting at `head` contains a cycle.
 * Time  : O(n)
 * Space : O(1)
 */
function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) return false;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast && fast.next) {
    slow = slow!.next;          // 1 step
    fast = fast.next.next;      // 2 steps

    if (slow === fast) return true; // pointers met → cycle
  }
  return false; // fast hit null → no cycle
}

/* ---------- usage ---------- */
const n3 = new ListNode(3);
const n2 = new ListNode(2);
const n0 = new ListNode(0);
const n4 = new ListNode(4);

n3.next = n2;
n2.next = n0;
n0.next = n4;
n4.next = n2; // creates the cycle

console.log(hasCycle(n3)); // true
