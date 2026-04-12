// Basic node definition
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

/**
 * Detect a cycle in a singly linked list.
 * @param head The start node of the list (or null for an empty list).
 * @returns true if a cycle exists, otherwise false.
 */
function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (!head) return false;          // Empty list → no cycle

  let slow = head;                  // One step per loop
  let fast = head.next;             // Two steps per loop

  while (fast && fast.next) {
    if (slow === fast) return true; // Hopping together → cycle

    slow = slow.next!;              // safe because slow can't be null here
    fast = fast.next.next!;
  }

  return false;                     // Reached end → no cycle
}
// acyclic list 1 → 2 → 3
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
a.next = b; b.next = c;
console.log(hasCycle(a)); // false

// cyclic list 1 → 2 → 3 → 1 …
const d = new ListNode(1);
const e = new ListNode(2);
const f = new ListNode(3);
d.next = e; e.next = f; f.next = d;
console.log(hasCycle(d)); // true
