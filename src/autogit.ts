class ListNode {
  constructor(public val: number = 0, public next: ListNode | null = null) {}
}

/**
 * Return the intersection node of two singly linked lists, or null if they
 * never meet.
 */
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  // First guard for trivial cases.
  if (!headA || !headB) return null;

  // Two pointers that start at the heads of the two lists.
  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  /**
   * Each pointer walks until it reaches the end of its list, then jumps
   * to the head of the other list. After at most two passes (`2 * (lenA + lenB)` steps)
   * they will either collide (at the intersection) or simultaneously reach
   * the tail (`null`) meaning the lists do not intersect.
   */
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }

  return pA; // either the intersection node or null
}
// Helper to build a list from an array
function build(arr: number[]): ListNode | null {
  let dummy = new ListNode(-1);
  let cur = dummy;
  for (const v of arr) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
}

// Build two lists that intersect
const shared = build([8, 9, 10]);

const a1 = new ListNode(3, new ListNode(7, shared));
const b1 = new ListNode(99, new ListNode(1, shared));

console.log(getIntersectionNode(a1, b1) === shared); // true
