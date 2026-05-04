// ── List node -----------------------------------------------
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

// ── Intersection finder ------------------------------------
function intersect<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): ListNode<T> | null {
  if (!headA || !headB) return null;

  // 1. Count nodes in each list
  const lenA = getLength(headA);
  const lenB = getLength(headB);

  // 2. Make the heads point to the same distance from the end
  let ptrA: ListNode<T> | null = headA;
  let ptrB: ListNode<T> | null = headB;
  if (lenA > lenB) {
    for (let i = 0; i < lenA - lenB; ++i) ptrA = ptrA!.next!;
  } else {
    for (let i = 0; i < lenB - lenA; ++i) ptrB = ptrB!.next!;
  }

  // 3. Move together until we hit the common node (by reference)
  while (ptrA && ptrB) {
    if (ptrA === ptrB) return ptrA;
    ptrA = ptrA.next;
    ptrB = ptrB.next;
  }

  return null;          // no intersection
}

function getLength<T>(head: ListNode<T> | null): number {
  let len = 0;
  let cur = head;
  while (cur) {
    ++len;
    cur = cur.next;
  }
  return len;
}
// shared tail: 5 → 6
const tail = new ListNode(5, new ListNode(6));

// list A: 1 → 2 → 3 → (shared)
const a = new ListNode(1, new ListNode(2, new ListNode(3, tail)));

// list B: 9 → (shared)
const b = new ListNode(9, tail);

const intersectNode = intersect(a, b);
console.log(intersectNode?.val); // 5
function intersectUsingSet<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): ListNode<T> | null {
  const seen = new Set<ListNode<T>>();
  let cur = headA;
  while (cur) {
    seen.add(cur);
    cur = cur.next;
  }

  cur = headB;
  while (cur) {
    if (seen.has(cur)) return cur;
    cur = cur.next;
  }
  return null;
}
