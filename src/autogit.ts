// 1. Node definition
class ListNode<T = number> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

// 2. Cycle detection
function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (!head) return false;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast && fast.next) {
    slow = slow!.next;           // 1 step
    fast = fast.next.next;       // 2 steps

    if (slow === fast) return true; // pointers met → cycle
  }
  return false; // fast hit null → no cycle
}

/* ---------- Usage example ---------- */
const n1 = new ListNode(1);
const n2 = new ListNode(2);
const n3 = new ListNode(3);
n1.next = n2;
n2.next = n3;
n3.next = n1; // creates a cycle

console.log(hasCycle(n1)); // true
