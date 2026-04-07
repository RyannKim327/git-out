// A minimal list node definition
export class ListNode<T> {
  constructor(
    public val: T,
    public next: ListNode<T> | null = null
  ) {}
}

/**
 * Returns the intersection node, or null if none exists.
 *
 * Idea:
 * 1. Walk each list once to get its length.
 * 2. Advance the longer list by the length difference.
 * 3. Move both pointers together – the first time they’re equal
 *    (by reference) is the intersection.
 *
 * Time: O(n + m)   (one pass per list + one optional “skip” pass)
 * Space: O(1)      (no extra container)
 */
export function getIntersectionNode<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): ListNode<T> | null {
  // helper to measure length
  function len(node: ListNode<T> | null): number {
    let l = 0;
    while (node !== null) {
      l++;
      node = node.next;
    }
    return l;
  }

  let lenA = len(headA);
  let lenB = len(headB);

  // Advance the longer head so that the remaining steps are equal
  let diff = Math.abs(lenA - lenB);
  let longer = lenA > lenB ? headA : headB;
  let shorter = lenA > lenB ? headB : headA;

  while (diff--) {
    if (longer !== null) longer = longer.next;
  }

  // Walk together until they meet
  while (longer !== null && shorter !== null) {
    if (longer === shorter) return longer; // same reference
    longer = longer.next;
    shorter = shorter.next;
  }

  return null; // never intersected
}
const a1 = new ListNode(1);
const a2 = new ListNode(2);
const a3 = new ListNode(3);
const a4 = new ListNode(4);
const a5 = new ListNode(5);
a1.next = a2; a2.next = a3; a3.next = a4; a4.next = a5;

const b1 = new ListNode(9);
const b2 = new ListNode(8);
b1.next = b2; b2.next = a3; // both lists point to `a3`

const intersection = getIntersectionNode(a1, b1);
console.log(intersection?.val); // 3
