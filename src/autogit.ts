/**
 * Node for a singly linked list.
 */
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

/**
 * Detects if a linked list contains a cycle.
 *
 * @param head The head of the list.
 * @returns true if a cycle exists, false otherwise.
 */
function hasCycle<T>(head: ListNode<T> | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;          // move one step
    fast = fast.next.next;      // move two steps
    if (slow === fast) {        // same reference → cycle
      return true;
    }
  }

  return false;                 // fast hit the end → no cycle
}
// 1 → 2 → 3 → 4 → 5
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
const d = new ListNode(4);
const e = new ListNode(5);

a.next = b; b.next = c; c.next = d; d.next = e;

// no cycle
console.log(hasCycle(a)); // false

// Introduce a cycle: e.next = c (3rd node)
e.next = c;
console.log(hasCycle(a)); // true
function hasCycleSet<T>(head: ListNode<T> | null): boolean {
  const visited = new Set<ListNode<T>>();

  let current = head;
  while (current !== null) {
    if (visited.has(current)) return true; // already seen → cycle
    visited.add(current);
    current = current.next;
  }
  return false; // reached null → acyclic
}
