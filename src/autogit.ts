/**
 * Generic singly‑linked list node.
 *
 * @template T – type of the value stored in the node.
 */
export class ListNode<T> {
  /** The payload stored in the node. */
  public value: T;

  /** Reference to the next node (or null if this is the tail). */
  public next: ListNode<T> | null = null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
/**
 * Reverses a singly‑linked list *in‑place*.
 *
 * @param head - The first node of the list (or null for an empty list).
 * @returns The new head of the reversed list.
 *
 * Time   : O(n) – each node is visited once.
 * Space  : O(1) – only three temporary pointers are used.
 */
export function reverseIterative<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr: ListNode<T> | null = head;

  while (curr !== null) {
    // Store the next node before we overwrite `curr.next`.
    const next: ListNode<T> | null = curr.next;

    // Reverse the link.
    curr.next = prev;

    // Move the two pointers one step forward.
    prev = curr;
    curr = next;
  }

  // When the loop finishes, `prev` points at the new head.
  return prev;
}
/**
 * Recursively reverses a singly‑linked list.
 *
 * @param head - The first node of the list (or null for an empty list).
 * @returns The new head of the reversed list.
 *
 * Time   : O(n)
 * Space  : O(n) – due to recursion depth (call stack).
 */
export function reverseRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
  // Base case: empty list or single node – already reversed.
  if (head === null || head.next === null) {
    return head;
  }

  // Recursively reverse the rest of the list.
  const newHead = reverseRecursive(head.next);

  // At this point, `head.next` is the tail of the reversed sub‑list.
  // We make that tail point back to `head`.
  head.next.next = head;
  head.next = null; // break the original forward link

  return newHead;
}
/**
 * Builds a linked list from a plain array.
 *
 * @example
 *   const list = fromArray([1, 2, 3]); // 1 → 2 → 3 → null
 */
export function fromArray<T>(arr: T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null;
  let tail: ListNode<T> | null = null;

  for (const value of arr) {
    const node = new ListNode(value);
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
 * Converts a linked list back to a plain array (useful for printing / testing).
 */
export function toArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = [];
  let cur = head;
  while (cur) {
    result.push(cur.value);
    cur = cur.next;
  }
  return result;
}
function demo() {
  const original = fromArray([1, 2, 3, 4, 5]);
  console.log('Original list:', toArray(original));

  // --- Iterative version ---
  const iterReversed = reverseIterative(original);
  console.log('Iterative reversed:', toArray(iterReversed));

  // To test the recursive version we need a fresh list (the previous one is now reversed).
  const fresh = fromArray([1, 2, 3, 4, 5]);
  const recReversed = reverseRecursive(fresh);
  console.log('Recursive reversed:', toArray(recReversed));

  // Verify both results are identical.
  console.assert(
    JSON.stringify(toArray(iterReversed)) === JSON.stringify(toArray(recReversed)),
    'Both methods should produce the same list'
  );
}

demo();
Original list: [ 1, 2, 3, 4, 5 ]
Iterative reversed: [ 5, 4, 3, 2, 1 ]
Recursive reversed: [ 5, 4, 3, 2, 1 ]
// reverse-linked-list.ts
export class ListNode<T> {
  public value: T;
  public next: ListNode<T> | null = null;
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/* ---------- ITERATIVE ---------- */
export function reverseIterative<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr: ListNode<T> | null = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

/* ---------- RECURSIVE ---------- */
export function reverseRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (head === null || head.next === null) return head;
  const newHead = reverseRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}

/* ---------- HELPERS ---------- */
export function fromArray<T>(arr: T[]): ListNode<T> | null {
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

export function toArray<T>(head: ListNode<T> | null): T[] {
  const out: T[] = [];
  let cur = head;
  while (cur) {
    out.push(cur.value);
    cur = cur.next;
  }
  return out;
}

/* ---------- DEMO ---------- */
function demo() {
  const original = fromArray([1, 2, 3, 4, 5]);
  console.log('Original list:', toArray(original));

  const iter = reverseIterative(original);
  console.log('Iterative reversed:', toArray(iter));

  const fresh = fromArray([1, 2, 3, 4, 5]);
  const rec = reverseRecursive(fresh);
  console.log('Recursive reversed:', toArray(rec));
}
demo();
# If you have ts-node installed
npx ts-node reverse-linked-list.ts
