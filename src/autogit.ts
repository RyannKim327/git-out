class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) { this.val = val; }
}

/** Returns true if the list starting at `head` has a cycle. */
function hasCycle(head: ListNode | null): boolean {
  if (!head) return false;

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow.next!;        // 1 step
    fast = fast.next.next;   // 2 steps

    if (slow === fast) return true; // pointers met → cycle
  }
  return false; // fast hit null → no cycle
}

/* ---------- usage example ---------- */
const n1 = new ListNode(1);
const n2 = new ListNode(2);
const n3 = new ListNode(3);
n1.next = n2;
n2.next = n3;
n3.next = n1;           // creates the cycle
console.log(hasCycle(n1)); // true
