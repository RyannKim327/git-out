interface ListNode<T = unknown> {
  value: T;
  next?: ListNode<T>;
}
function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (!head) return false; // an empty list can’t have a cycle

  let slow = head;
  let fast = head.next; // fast starts one step ahead

  while (fast && fast.next) {
    if (slow === fast) return true; // cycle detected

    slow = slow.next!;          // move one step
    fast = fast.next.next!; // move two steps
  }

  return false; // reached the end, no cycle
}
function hasCycleWithSet<T>(head: ListNode<T> | null): boolean {
  const visited = new Set<ListNode<T>>();
  let current = head;

  while (current) {
    if (visited.has(current)) return true; // we’re back at a node we saw
    visited.add(current);
    current = current.next;
  }

  return false;
}
// build a small example
const a: ListNode = { value: 1 };
const b: ListNode = { value: 2 };
const c: ListNode = { value: 3 };

a.next = b;
b.next = c;
c.next = a; // ← closes the loop

console.log(hasCycle(a));          // true
console.log(hasCycleWithSet(a));   // true

// break the cycle
c.next = undefined;
console.log(hasCycle(a));          // false
