class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Returns true if the list contains a cycle, false otherwise.
 */
function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;             // move one step
    fast = fast.next.next;        // move two steps

    if (slow === fast) {          // pointers meet → cycle
      return true;
    }
  }

  // fast reached the end → no cycle
  return false;
}
/**
 * Returns true if the list contains a cycle, false otherwise.
 * Uses a Set to remember nodes we've seen.
 */
function hasCycleWithSet(head: ListNode | null): boolean {
  const visited = new Set<ListNode>();

  let current = head;
  while (current) {
    if (visited.has(current)) {
      return true;               // seen it before → cycle
    }
    visited.add(current);
    current = current.next;
  }

  return false;                  // reached the end
}
// 1 ➜ 2 ➜ 3 ➜ 4 ➜ null   (no cycle)
const a = new ListNode(1);
a.next = new ListNode(2, new ListNode(3, new ListNode(4)));

console.log(hasCycle(a));          // false
console.log(hasCycleWithSet(a));   // false

// 1 ➜ 2 ➜ 3 ➜ 4 ➜ 2 ...   (cycle back to node 2)
const b = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
b.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2;                // close the loop

console.log(hasCycle(b));          // true
console.log(hasCycleWithSet(b));   // true
