class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}

function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  if (!headA || !headB) return null;

  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }

  return pA;
}
// Construct linked lists with an intersection at node 'c3'
const c3 = new ListNode(3, new ListNode(4));
const headA = new ListNode(1, new ListNode(2, c3));
const headB = new ListNode(5, c3);

console.log(getIntersectionNode(headA, headB)?.val); // Output: 3
