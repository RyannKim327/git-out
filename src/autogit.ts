// ---------- Basics ----------
class ListNode {
  val: number          // you can keep any data you need
  next: ListNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

// ---------- Intersection finder ----------
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  if (!headA || !headB) return null;

  let ptrA: ListNode | null = headA;
  let ptrB: ListNode | null = headB;

  // After at most two passes through each list the pointers
  // will either meet at the intersection or both become null.
  while (ptrA !== ptrB) {
    ptrA = ptrA ? ptrA.next : headB; // switch to the head of the other list
    ptrB = ptrB ? ptrB.next : headA;
  }

  return ptrA; // either the intersection node, or null
}

// ---------- Quick demo ----------
function buildLinkedList(values: number[], offset: number = 0) {
  let head: ListNode | null = null;
  let tail: ListNode | null = null;
  for (let v of values) {
    const node = new ListNode(v);
    if (!head) head = node;
    if (tail) tail.next = node;
    tail = node;
  }
  return { head, tail };
}

// Common tail that will be shared by two lists
const { head: shared, tail: sharedTail } = buildLinkedList([8, 10]);

// First list: 3 → 7 → 8 → 10
const { head: aHead } = buildLinkedList([3, 7]);
if (aHead && sharedHead) {
  // connect the shared tail
  let node = aHead;
  while (node.next) node = node.next;
  node.next = shared;
}

// Second list: 99 → 1 → 8 → 10
const { head: bHead } = buildLinkedList([99, 1]);
if (bHead && sharedHead) {
  let node = bHead;
  while (node.next) node = node.next;
  node.next = shared;
}

const intersection = getIntersectionNode(aHead, bHead);
console.log(intersection?.val); // prints 8
