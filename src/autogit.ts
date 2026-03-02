class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}
/**
 * Returns the node where listA and listB intersect.
 * If they don't intersect, returns null.
 */
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  if (!headA || !headB) return null;

  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  // Continue until the two pointers either match or both become null.
  while (pA !== pB) {
    // Move to the next node; if we're at the end, jump to the other list's head.
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }

  return pA; // Either the intersection node or null.
}
// Build two intersecting lists:
// A: 1 → 3 → 5 → 7 → 9
// B: 2 → 4 →        → 7 → 9
//            ^<--- intersection starts here

const common = new ListNode(7, new ListNode(9));

const listA = new ListNode(1, new ListNode(3, new ListNode(5, common)));
const listB = new ListNode(2, new ListNode(4, common));

const intersection = getIntersectionNode(listA, listB);
console.log(intersection?.val); // 7
function getIntersectionNodeHash(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  const nodes = new Set<ListNode>();

  for (let cur = headA; cur; cur = cur.next) {
    nodes.add(cur);
  }

  for (let cur = headB; cur; cur = cur.next) {
    if (nodes.has(cur)) return cur;
  }

  return null;
}
