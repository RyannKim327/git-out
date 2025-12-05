class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;

  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  while (pA !== pB) {
    // If a pointer reaches the end, jump to the other list's head
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }

  return pA; // either null (no intersection) or the intersection node
}
