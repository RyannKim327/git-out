class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}
function hasCycle<T>(head: ListNode<T> | null): boolean {
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast && fast.next) {
    slow = slow!.next;            // move one step
    fast = fast.next.next;        // move two steps

    if (slow === fast) return true;   // they met → cycle
  }

  return false;   // hit the end → no cycle
}
function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
  const visited = new Set<ListNode<T>>();

  let current = head;
  while (current) {
    if (visited.has(current)) return true;
    visited.add(current);
    current = current.next;
  }
  return false;
}
// Linear list (no cycle)
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
a.next = b; b.next = c;

console.log(hasCycle(a)); // false

// Cyclic list
const d = new ListNode(4);
const e = new ListNode(5);
const f = new ListNode(6);
d.next = e; e.next = f; f.next = d; // f points back to d

console.log(hasCycle(d)); // true
