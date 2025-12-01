// 1. Basic node definition
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

// 3. Quick sanity check
(() => {
  // Build 1 -> 2 -> 3 -> 4 -> 2 (cycle)
  const n1 = new ListNode(1);
  const n2 = new ListNode(2);
  const n3 = new ListNode(3);
  const n4 = new ListNode(4);
  n1.next = n2;
  n2.next = n3;
  n3.next = n4;
  n4.next = n2; // create cycle

  console.log(hasCycle(n1)); // true

  // Build 1 -> 2 -> 3 (no cycle)
  const m1 = new ListNode(1);
  const m2 = new ListNode(2);
  const m3 = new ListNode(3);
  m1.next = m2;
  m2.next = m3;

  console.log(hasCycle(m1)); // false
})();
