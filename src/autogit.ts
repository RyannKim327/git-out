export class ListNode {
  val: number;          // keep it generic if you want
  next: ListNode | null;

  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}
export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  // Helper: get the length of a list.
  const length = (node: ListNode | null): number => {
    let len = 0;
    while (node) {
      len++;
      node = node.next;
    }
    return len;
  };

  const lenA = length(headA);
  const lenB = length(headB);

  // Align the starts
  let ptrA = headA;
  let ptrB = headB;
  let diff = Math.abs(lenA - lenB);

  if (lenA > lenB) {
    while (diff-- > 0 && ptrA) ptrA = ptrA.next;
  } else {
    while (diff-- > 0 && ptrB) ptrB = ptrB.next;
  }

  // Walk together
  while (ptrA && ptrB) {
    if (ptrA === ptrB) return ptrA; // same reference
    ptrA = ptrA.next;
    ptrB = ptrB.next;
  }

  return null; // no intersection
}
// Build list A: 1 → 2 → 3 → 4 → 5
const a = new ListNode(1);
a.next = new ListNode(2);
a.next.next = new ListNode(3);
a.next.next.next = new ListNode(4);
a.next.next.next.next = new ListNode(5);

// Build list B: 9 → 4 → 5 (shared tail)
const b = new ListNode(9);
b.next = a.next.next.next; // shares nodes 4 and 5

const intersect = getIntersectionNode(a, b);
console.log(intersect?.val); // prints 4
export function intersectionByValue(
  headA: ListNode | null,
  headB: ListNode | null
): number[] {
  const values = new Set<number>();
  for (let cur = headA; cur; cur = cur.next) values.add(cur.val);

  const result: number[] = [];
  for (let cur = headB; cur; cur = cur.next) {
    if (values.has(cur.val)) result.push(cur.val);
  }
  return result;
}
