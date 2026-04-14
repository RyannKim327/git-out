// Node for a singly‑linked list
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

/**
 * Returns the first node that appears in both lists,
 * or null if they don’t intersect.
 */
function findIntersection<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): ListNode<T> | null {
  const seen = new Set<ListNode<T>>();

  // Step 1: remember every node of list A
  for (let curr = headA; curr; curr = curr.next) {
    seen.add(curr);
  }

  // Step 2: walk list B until we hit a node already seen
  for (let curr = headB; curr; curr = curr.next) {
    if (seen.has(curr)) return curr; // intersection found
  }
  return null; // no intersection
}
const shared = new ListNode(8, new ListNode(9));

const a1 = new ListNode(3, new ListNode(7, shared));
const b1 = new ListNode(99, new ListNode(1, shared));

console.log(findIntersection(a1, b1)?.val); // 8
