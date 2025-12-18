class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) {
    this.val = val;
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;

  let lenA = getLength(headA);
  let lenB = getLength(headB);

  let longer = lenA > lenB ? headA : headB;
  let shorter = lenA > lenB ? headB : headA;
  let diff = Math.abs(lenA - lenB);

  // Advance the longer list by the difference
  for (let i = 0; i < diff; i++) {
    longer = longer.next;
  }

  // Walk together until intersection
  while (longer && shorter) {
    if (longer === shorter) return longer; // Same reference
    longer = longer.next;
    shorter = shorter.next;
  }

  return null; // No intersection
}

function getLength(head: ListNode | null): number {
  let count = 0;
  while (head) {
    count++;
    head = head.next;
  }
  return count;
}
// Create intersecting lists
const common = new ListNode(8);
common.next = new ListNode(10);

const headA = new ListNode(3);
headA.next = new ListNode(7);
headA.next.next = common;

const headB = new ListNode(99);
headB.next = common;

console.log(getIntersectionNode(headA, headB)?.val); // Output: 8
