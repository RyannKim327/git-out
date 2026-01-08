A: a1 → a2 → a3 → c1 → c2 → c3
B: b1 → b2 → b3 → b4 → c1 → c2 → c3
                ↑
                intersection
/** Simple singly‑linked list node */
export class ListNode<T = number> {
  /** Value stored in the node (optional for the intersection problem) */
  public val: T;
  /** Reference to the next node (null = end of list) */
  public next: ListNode<T> | null = null;

  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val;
    this.next = next;
  }
}
/**
 * Returns the first intersecting node of two singly‑linked lists, or null if none.
 *
 * @param headA - head of the first list
 * @param headB - head of the second list
 * @returns intersecting ListNode or null
 */
export function getIntersectionNode<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
  // Edge case: one (or both) lists are empty
  if (!headA || !headB) return null;

  // ---------- 1️⃣ Compute lengths ----------
  let lenA = 0;
  let lenB = 0;
  let curA: ListNode<T> | null = headA;
  let curB: ListNode<T> | null = headB;

  while (curA) {
    lenA++;
    curA = curA.next;
  }
  while (curB) {
    lenB++;
    curB = curB.next;
  }

  // ---------- 2️⃣ Align starts ----------
  let diff = Math.abs(lenA - lenB);
  curA = headA;
  curB = headB;

  if (lenA > lenB) {
    while (diff-- > 0 && curA) curA = curA.next;
  } else {
    while (diff-- > 0 && curB) curB = curB.next;
  }

  // ---------- 3️⃣ Walk together ----------
  while (curA && curB) {
    if (curA === curB) return curA; // reference equality!
    curA = curA.next;
    curB = curB.next;
  }

  // No intersection
  return null;
}
/**
 * Hash‑set based intersection detection.
 * Uses O(N) extra memory but is very straightforward.
 */
export function getIntersectionNodeHash<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
  if (!headA || !headB) return null;

  const visited = new Set<ListNode<T>>();

  // Store all nodes of list A
  for (let cur = headA; cur !== null; cur = cur.next) {
    visited.add(cur);
  }

  // Scan list B for the first node that appears in the set
  for (let cur = headB; cur !== null; cur = cur.next) {
    if (visited.has(cur)) return cur;
  }

  return null;
}
// Helper to build a list from an array (returns head)
function buildList<T>(values: T[]): ListNode<T> {
  let dummy = new ListNode<T>(null as any);
  let cur = dummy;
  for (const v of values) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next!;
}

// Build two lists that intersect at node `c1`
const common = buildList([30, 31, 32]); // c1 → c2 → c3

const a = new ListNode(1);
a.next = new ListNode(2);
a.next.next = new ListNode(3);
a.next.next.next = common; // attach common tail

const b = new ListNode(10);
b.next = new ListNode(20);
b.next.next = new ListNode(25);
b.next.next.next = new ListNode(27);
b.next.next.next.next = common; // attach same common tail

// Test both implementations
console.log(getIntersectionNode(a, b)?.val);          // → 30
console.log(getIntersectionNodeHash(a, b)?.val);     // → 30

// Non‑intersecting case
const x = buildList([100, 101]);
const y = buildList([200, 201, 202]);
console.log(getIntersectionNode(x, y)); // → null
30
30
null
// Constant‑space solution
function getIntersectionNode<T>(hA: ListNode<T> | null, hB: ListNode<T> | null): ListNode<T> | null {
  let a = hA, b = hB;
  while (a !== b) {
    a = a ? a.next : hB;   // switch to the other list when reaching the end
    b = b ? b.next : hA;
  }
  return a; // either the intersection node or null
}
// linked-intersection.ts
export class ListNode<T = number> {
  public val: T;
  public next: ListNode<T> | null = null;
  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Constant‑space two‑pointer solution (no explicit length computation).
 * Returns the intersecting node or null.
 */
export function getIntersectionNode<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
  if (!headA || !headB) return null;
  let a: ListNode<T> | null = headA;
  let b: ListNode<T> | null = headB;

  // After at most (lenA + lenB) steps, a and b either meet at the intersection
  // or both become null (no intersection).
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a; // could be null
}

/**
 * Hash‑set based solution (O(N) extra memory).
 */
export function getIntersectionNodeHash<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
  if (!headA || !headB) return null;
  const visited = new Set<ListNode<T>>();
  for (let cur = headA; cur; cur = cur.next) visited.add(cur);
  for (let cur = headB; cur; cur = cur.next) if (visited.has(cur)) return cur;
  return null;
}

/* ---------- Example usage (run with `ts-node linked-intersection.ts`) ---------- */
if (require.main === module) {
  const build = <T>(arr: T[]): ListNode<T> => {
    const dummy = new ListNode<T>(null as any);
    let cur = dummy;
    for (const v of arr) {
      cur.next = new ListNode(v);
      cur = cur.next;
    }
    return dummy.next!;
  };

  // common tail
  const common = build([30, 31, 32]);

  const a = new ListNode(1);
  a.next = new ListNode(2);
  a.next.next = new ListNode(3);
  a.next.next.next = common;

  const b = new ListNode(10);
  b.next = new ListNode(20);
  b.next.next = new ListNode(25);
  b.next.next.next = new ListNode(27);
  b.next.next.next.next = common;

  console.log('Intersection (two‑pointer):', getIntersectionNode(a, b)?.val); // 30
  console.log('Intersection (hash‑set):', getIntersectionNodeHash(a, b)?.val); // 30

  const x = build([100, 101]);
  const y = build([200, 201, 202]);
  console.log('No intersection:', getIntersectionNode(x, y)); // null
}
npx ts-node linked-intersection.ts
