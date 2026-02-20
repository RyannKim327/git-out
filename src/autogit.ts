// A minimal node type
export interface ListNode<T> {
  val: T;
  next: ListNode<T> | null;
}
/**
 * Returns the first common reference node of two singly linked lists,
 * or null if they do not intersect.
 */
export function getIntersectionNode<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): ListNode<T> | null {
  // Edge‑case: if either list is empty, there can’t be an intersection
  if (!headA || !headB) return null;

  const seen = new Set<ListNode<T>>();

  // Walk the first list, remember every node
  let cur = headA;
  while (cur) {
    seen.add(cur);
    cur = cur.next;
  }

  // Walk the second list until we find a node that we already saw
  cur = headB;
  while (cur) {
    if (seen.has(cur)) return cur;   // first intersection node
    cur = cur.next;
  }

  return null; // no intersection
}
/**
 * Returns an array of values that appear in *both* lists.
 * Duplicates are preserved in the sense that each matched node
 * contributes one entry to the result.
 */
export function getCommonValues<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): T[] {
  const values = new Set<T>();
  const common: T[] = [];

  // Record every value of the first list
  for (let node = headA; node; node = node.next) {
    values.add(node.val);
  }

  // Walk the second list and pick out matches
  for (let node = headB; node; node = node.next) {
    if (values.has(node.val)) common.push(node.val);
  }

  return common;
}
export function getIntersectionNodeTwoPointer<T>(
  headA: ListNode<T> | null,
  headB: ListNode<T> | null
): ListNode<T> | null {
  if (!headA || !headB) return null;

  let a: ListNode<T> | null = headA;
  let b: ListNode<T> | null = headB;

  // After at most (lenA + lenB) steps, they either meet or both hit null.
  while (a !== b) {
    a = a ? a.next : headB; // switch to the other list
    b = b ? b.next : headA;
  }

  return a; // could be null (no intersection) or the meeting node
}
// Helper to build a list from an array
function build<T>(vals: T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null;
  let cur: ListNode<T> | null = null;
  for (const v of vals) {
    const node: ListNode<T> = { val: v, next: null };
    if (!head) head = node;
    if (cur) cur.next = node;
    cur = node;
  }
  return head;
}

// Example: intersecting lists
const shared = build([7, 8, 9]);                           // shared tail
const a1 = build([1, 2]);                                 // first list
const a2 = build([3, 4]);                                 // second list

// Connect the tails
let node = a1;
while (node?.next) node = node.next;
node.next = shared;

node = a2;
while (node?.next) node = node.next;
node.next = shared;

// Find intersection
const inter = getIntersectionNode(a1, a2);
console.log(inter?.val); // 7
