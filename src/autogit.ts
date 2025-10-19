class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) {
    this.val = val;
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;

  let a: ListNode | null = headA;
  let b: ListNode | null = headB;

  // Switch pointers at the end to align lengths
  while (a !== b) {
    a = a === null ? headB : a.next;
    b = b === null ? headA : b.next;
  }

  return a; // either the intersection node or null
}
// Create intersecting lists
const common = new ListNode(8);
common.next = new ListNode(10);

const listA = new ListNode(3);
listA.next = new ListNode(7);
listA.next.next = common;

const listB = new ListNode(99);
listB.next = new ListNode(1);
listB.next.next = common;

console.log(getIntersectionNode(listA, listB)?.val); // Output: 8
