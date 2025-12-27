/** A node of a singly‑linked list. */
export interface ListNode<T = any> {
  /** Payload stored in the node. */
  value: T;
  /** Reference to the next node (null if this is the tail). */
  next: ListNode<T> | null;
}

/** Helper to create a node – makes test code a bit cleaner. */
export const node = <T>(value: T, next: ListNode<T> | null = null): ListNode<T> => ({
  value,
  next,
});
/**
 * Returns the n‑th node from the end of the list.
 *
 * @param head  The first node of the list (or null for an empty list).
 * @param n     1‑based index from the end (n = 1 → last node).
 * @returns     The node, or null if n is out of bounds.
 *
 * @throws      If n <= 0 (invalid request).
 *
 * Time  : O(N) – one traversal.
 * Space : O(1) – only two extra references.
 */
export function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (n <= 0) {
    throw new Error('n must be a positive integer');
  }

  let fast: ListNode<T> | null = head;
  let slow: ListNode<T> | null = head;

  // Move `fast` n steps ahead.
  for (let i = 0; i < n; i++) {
    if (fast === null) {
      // List shorter than n → out of range.
      return null;
    }
    fast = fast.next;
  }

  // Now move both pointers until `fast` reaches the end.
  while (fast !== null) {
    fast = fast.next;
    slow = slow!.next; // `slow` cannot be null here because fast was n steps ahead.
  }

  // `slow` now points to the n‑th node from the end.
  return slow;
}
List:  A → B → C → D → E → null
n = 2 (second from the end, i.e. D)

Step 1 – advance fast 2 steps:
   fast points at C

Step 2 – move both until fast hits null:
   fast: D   slow: B
   fast: E   slow: C
   fast: null   slow: D   ← stop

Result: node D
export function nthFromEndTwoPass<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (n <= 0) throw new Error('n must be a positive integer');

  // 1️⃣ First pass – count nodes.
  let length = 0;
  for (let cur = head; cur !== null; cur = cur.next) length++;

  // 2️⃣ Compute the index from the start (0‑based).
  const idxFromStart = length - n;
  if (idxFromStart < 0) return null; // n > length

  // 3️⃣ Second pass – stop at that index.
  let cur = head;
  for (let i = 0; i < idxFromStart; i++) cur = cur!.next!;
  return cur;
}
import { node, nthFromEnd } from './linked-list';

// Build list: 10 → 20 → 30 → 40 → 50
const list = node(10,
  node(20,
    node(30,
      node(40,
        node(50)
      )
    )
  )
);

console.log(nthFromEnd(list, 1)!.value); // 50 (last)
console.log(nthFromEnd(list, 3)!.value); // 30
console.log(nthFromEnd(list, 5)!.value); // 10 (head)
console.log(nthFromEnd(list, 6));        // null (out of range)
// linked-list.test.ts
import { node, nthFromEnd } from './linked-list';

function buildList(...values: number[]) {
  let head: any = null;
  for (let i = values.length - 1; i >= 0; i--) {
    head = node(values[i], head);
  }
  return head;
}

describe('nthFromEnd (two‑pointer version)', () => {
  test('basic cases', () => {
    const list = buildList(1, 2, 3, 4, 5);
    expect(nthFromEnd(list, 1)!.value).toBe(5);
    expect(nthFromEnd(list, 2)!.value).toBe(4);
    expect(nthFromEnd(list, 5)!.value).toBe(1);
    expect(nthFromEnd(list, 6)).toBeNull();
  });

  test('single‑element list', () => {
    const list = buildList(42);
    expect(nthFromEnd(list, 1)!.value).toBe(42);
    expect(nthFromEnd(list, 2)).toBeNull();
  });

  test('empty list', () => {
    expect(nthFromEnd(null, 1)).toBeNull();
  });

  test('invalid n throws', () => {
    const list = buildList(1, 2, 3);
    expect(() => nthFromEnd(list, 0)).toThrow();
    expect(() => nthFromEnd(list, -3)).toThrow();
  });
});
npm i --save-dev jest @types/jest ts-jest
npx jest
export const nthFromEnd = <T>(h: ListNode<T> | null, n: number) => {
  if (n <= 0) throw new Error('n>0');
  let f = h, s = h;
  for (let i = 0; i < n; i++) if (!f) return null; else f = f.next;
  while (f) (f = f.next), (s = s!.next);
  return s;
};
