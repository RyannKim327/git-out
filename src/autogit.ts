/** A simple singly‑linked list node */
export class ListNode<T = number> {
  /** The stored value – you can change the generic type if you need something else */
  public value: T;
  /** Reference to the next node (null = end of list) */
  public next: ListNode<T> | null = null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
/**
 * Turns an array into a linked list.
 * Returns the head of the list.
 */
export function buildList<T>(arr: T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null;
  let tail: ListNode<T> | null = null;

  for (const v of arr) {
    const node = new ListNode(v);
    if (!head) {
      head = tail = node;
    } else {
      tail!.next = node;
      tail = node;
    }
  }
  return head;
}
/**
 * Returns the first intersecting node of `a` and `b`,
 * or `null` if the two lists do not intersect.
 *
 * This version uses a Set to remember every node of the first list.
 * Time: O(N+M)   Space: O(N)
 */
export function getIntersectionHash<T>(a: ListNode<T> | null, b: ListNode<T> | null): ListNode<T> | null {
  const visited = new Set<ListNode<T>>();

  // Walk through list `a` and store each node reference.
  for (let cur = a; cur !== null; cur = cur.next) {
    visited.add(cur);
  }

  // Walk through list `b` and stop at the first node that we have seen.
  for (let cur = b; cur !== null; cur = cur.next) {
    if (visited.has(cur)) {
      return cur; // intersection found
    }
  }

  return null; // no intersection
}
/**
 * Returns the first intersecting node of `a` and `b`,
 * or `null` if there is none.
 *
 * Time: O(N+M)   Space: O(1)
 */
export function getIntersectionTwoPointer<T>(a: ListNode<T> | null, b: ListNode<T> | null): ListNode<T> | null {
  // 1️⃣ Compute lengths
  const lenA = length(a);
  const lenB = length(b);

  // 2️⃣ Align starts
  let curA: ListNode<T> | null = a;
  let curB: ListNode<T> | null = b;

  if (lenA > lenB) {
    let diff = lenA - lenB;
    while (diff-- > 0 && curA) curA = curA.next;
  } else if (lenB > lenA) {
    let diff = lenB - lenA;
    while (diff-- > 0 && curB) curB = curB.next;
  }

  // 3️⃣ Walk together until we either meet or hit the end
  while (curA && curB) {
    if (curA === curB) return curA; // intersection!
    curA = curA.next;
    curB = curB.next;
  }

  return null; // no intersection
}

/** Utility: count nodes from `head` to the tail (null) */
function length<T>(head: ListNode<T> | null): number {
  let cnt = 0;
  for (let cur = head; cur !== null; cur = cur.next) cnt++;
  return cnt;
}
// ---------------------------------------------------------------
// Build two lists that intersect:
//   listA: 1 → 2 → 3 → 4 → 5
//   listB: 9 → 8 → 4 → 5   (the nodes 4 & 5 are shared)
// ---------------------------------------------------------------
const shared = buildList([4, 5]);               // tail that will be shared

const listA = new ListNode(1);
listA.next = new ListNode(2);
listA.next.next = new ListNode(3);
listA.next.next.next = shared;                  // attach shared tail

const listB = new ListNode(9);
listB.next = new ListNode(8);
listB.next.next = shared;                       // attach same shared tail

// ---------------------------------------------------------------
// Run both algorithms
// ---------------------------------------------------------------
console.log('--- Hash‑set version ---');
const interHash = getIntersectionHash(listA, listB);
console.log(interHash?.value ?? 'no intersection'); // → 4

console.log('--- Two‑pointer version ---');
const interTwoPtr = getIntersectionTwoPointer(listA, listB);
console.log(interTwoPtr?.value ?? 'no intersection'); // → 4

// ---------------------------------------------------------------
// Test a non‑intersecting case
// ---------------------------------------------------------------
const listC = buildList([7, 8, 9]);
const listD = buildList([1, 2, 3]);

console.log('No‑intersection test (hash):', getIntersectionHash(listC, listD)); // null
console.log('No‑intersection test (two‑ptr):', getIntersectionTwoPointer(listC, listD)); // null
--- Hash‑set version ---
4
--- Two‑pointer version ---
4
No‑intersection test (hash): null
No‑intersection test (two‑ptr): null
// linked-intersection.ts ----------------------------------------------------
export class ListNode<T = number> {
  public value: T;
  public next: ListNode<T> | null = null;
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/** Build a list from an array (helper for tests) */
export function buildList<T>(arr: T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null;
  let tail: ListNode<T> | null = null;
  for (const v of arr) {
    const node = new ListNode(v);
    if (!head) head = tail = node;
    else {
      tail!.next = node;
      tail = node;
    }
  }
  return head;
}

/** ---------- 1️⃣ Hash‑set version ---------- */
export function getIntersectionHash<T>(a: ListNode<T> | null, b: ListNode<T> | null): ListNode<T> | null {
  const visited = new Set<ListNode<T>>();
  for (let cur = a; cur !== null; cur = cur.next) visited.add(cur);
  for (let cur = b; cur !== null; cur = cur.next) if (visited.has(cur)) return cur;
  return null;
}

/** ---------- 2️⃣ Two‑pointer version ---------- */
export function getIntersectionTwoPointer<T>(a: ListNode<T> | null, b: ListNode<T> | null): ListNode<T> | null {
  const lenA = length(a);
  const lenB = length(b);
  let curA: ListNode<T> | null = a;
  let curB: ListNode<T> | null = b;

  if (lenA > lenB) {
    let diff = lenA - lenB;
    while (diff-- > 0 && curA) curA = curA.next;
  } else if (lenB > lenA) {
    let diff = lenB - lenA;
    while (diff-- > 0 && curB) curB = curB.next;
  }

  while (curA && curB) {
    if (curA === curB) return curA;
    curA = curA.next;
    curB = curB.next;
  }
  return null;
}

/** Utility: compute length of a singly‑linked list */
function length<T>(head: ListNode<T> | null): number {
  let cnt = 0;
  for (let cur = head; cur !== null; cur = cur.next) cnt++;
  return cnt;
}

/** ------------------- Demo ------------------- */
if (require.main === module) {
  // intersecting example
  const shared = buildList([4, 5]);
  const a = new ListNode(1);
  a.next = new ListNode(2);
  a.next.next = new ListNode(3);
  a.next.next.next = shared;

  const b = new ListNode(9);
  b.next = new ListNode(8);
  b.next.next = shared;

  console.log('Hash‑set →', getIntersectionHash(a, b)?.value ?? 'null');
  console.log('Two‑ptr →', getIntersectionTwoPointer(a, b)?.value ?? 'null');

  // non‑intersecting example
  const c = buildList([7, 8, 9]);
  const d = buildList([1, 2, 3]);
  console.log('No‑intersect (hash) →', getIntersectionHash(c, d));
  console.log('No‑intersect (two‑ptr) →', getIntersectionTwoPointer(c, d));
}
