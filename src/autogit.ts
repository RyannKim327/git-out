A: a1 → a2 → a3
                ↘
                 c1 → c2 → c3
                ↗
B: b1 → b2 → b3
/** List node definition */
export class ListNode<T = number> {
  /** The value stored in the node (optional for the intersection problem) */
  public val: T;
  /** Pointer to the next node (null if this is the tail) */
  public next: ListNode<T> | null = null;

  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val;
    this.next = next;
  }
}

/** Utility: build a list from an array of values.
 *  Returns the head of the list and an array of all created nodes (useful for stitching two lists together). */
export function buildList<T>(values: T[]): { head: ListNode<T> | null; nodes: ListNode<T>[] } {
  if (values.length === 0) return { head: null, nodes: [] };
  const nodes: ListNode<T>[] = values.map(v => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  return { head: nodes[0], nodes };
}
/**
 * Returns the first intersecting node of two singly‑linked lists, or null if none.
 * Uses O(N) extra space.
 */
export function getIntersectionNodeHashSet<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
  const visited = new Set<ListNode<T>>();

  // Walk list A and store every node reference.
  for (let cur = headA; cur !== null; cur = cur.next) {
    visited.add(cur);
  }

  // Walk list B; the first node already in the set is the intersection.
  for (let cur = headB; cur !== null; cur = cur.next) {
    if (visited.has(cur)) return cur;
  }

  return null; // No intersection.
}
/**
 * Returns the first intersecting node of two singly‑linked lists, or null if none.
 * Uses O(1) extra space.
 */
export function getIntersectionNodeTwoPointers<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
  // Helper to compute length.
  const length = (node: ListNode<T> | null): number => {
    let len = 0;
    for (let cur = node; cur !== null; cur = cur.next) len++;
    return len;
  };

  const lenA = length(headA);
  const lenB = length(headB);

  // Align starts: advance the longer list by the difference.
  let curA: ListNode<T> | null = headA;
  let curB: ListNode<T> | null = headB;
  let diff = Math.abs(lenA - lenB);

  if (lenA > lenB) {
    while (diff-- > 0 && curA) curA = curA.next;
  } else {
    while (diff-- > 0 && curB) curB = curB.next;
  }

  // Now walk both lists together; the first common reference is the answer.
  while (curA && curB) {
    if (curA === curB) return curA;
    curA = curA.next;
    curB = curB.next;
  }

  return null; // No intersection.
}
// ---------------------------------------------------------------
// Example usage (copy‑paste into a TS file or the TS Playground)
// ---------------------------------------------------------------
function testIntersection() {
  // Build three separate parts:
  const { head: aHead, nodes: aNodes } = buildList([1, 2, 3]);          // a1→a2→a3
  const { head: bHead, nodes: bNodes } = buildList([4, 5, 6]);          // b1→b2→b3
  const { head: cHead, nodes: cNodes } = buildList([7, 8, 9]);          // c1→c2→c3

  // Stitch them together to create an intersection at c1:
  // a3.next = c1, b3.next = c1
  aNodes[aNodes.length - 1].next = cHead;
  bNodes[bNodes.length - 1].next = cHead;

  // Now the lists look like:
  // A: 1 → 2 → 3 ↘
  //                7 → 8 → 9
  // B: 4 → 5 → 6 ↗

  const intersectHash = getIntersectionNodeHashSet(aHead, bHead);
  const intersectTwoPtr = getIntersectionNodeTwoPointers(aHead, bHead);

  console.log('Hash‑Set result:', intersectHash?.val ?? null); // → 7
  console.log('Two‑Pointer result:', intersectTwoPtr?.val ?? null); // → 7

  // Verify that the returned node is exactly the same object as cHead
  console.assert(intersectHash === cHead, 'Hash‑Set returned wrong node');
  console.assert(intersectTwoPtr === cHead, 'Two‑Pointer returned wrong node');

  // ---- No‑intersection case ----
  const { head: dHead } = buildList([10, 11]);
  const noIntersect = getIntersectionNodeTwoPointers(aHead, dHead);
  console.log('No intersection (should be null):', noIntersect);
}

testIntersection();
Hash‑Set result: 7
Two‑Pointer result: 7
No intersection (should be null): null
