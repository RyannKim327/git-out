class ListNode {
  val: number;
  next: ListNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;

  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  // Step 1: Get lengths
  let lenA = 0, lenB = 0;
  while (pA) { lenA++; pA = pA.next; }
  while (pB) { lenB++; pB = pB.next; }

  // Reset pointers
  pA = headA;
  pB = headB;

  // Step 2: Align starting points
  if (lenA > lenB) {
    for (let i = 0; i < lenA - lenB; i++) pA = pA!.next;
  } else {
    for (let i = 0; i < lenB - lenA; i++) pB = pB!.next;
  }

  // Step 3: Traverse together
  while (pA && pB) {
    if (pA === pB) return pA;
    pA = pA.next;
    pB = pB.next;
  }

  return null;
}
// Create intersecting lists
const common = new ListNode(8);
common.next = new ListNode(10);

const headA = new ListNode(3);
headA.next = new ListNode(7);
headA.next.next = common;

const headB = new ListNode(99);
headB.next = new ListNode(1);
headB.next.next = common;

const intersection = getIntersectionNode(headA, headB);
console.log(intersection?.val); // Output: 8
