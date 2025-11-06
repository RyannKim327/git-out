class ListNode {
  value: any;
  next: ListNode | null = null;
  constructor(value: any) { this.value = value; }
}

/**
 * Returns true if the linked list starting at `head` contains a cycle.
 * O(n) time, O(1) extra space.
 */
function hasCycle(head: ListNode | null): boolean {
  if (!head) return false;

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow!.next;          // 1 step
    fast = fast.next.next;      // 2 steps

    if (slow === fast) return true; // pointers met ➜ cycle
  }
  return false; // fast hit null ➜ no cycle
}

/* ---------- Usage example ---------- */
const n1 = new ListNode(1);
const n2 = new ListNode(2);
const n3 = new ListNode(3);
const n4 = new ListNode(4);
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n2; // create a cycle

console.log(hasCycle(n1)); // true
