/** A simple singly‑linked list node */
export class ListNode<T> {
  /** The value stored in the node */
  public value: T;

  /** Reference to the next node (null if this is the tail) */
  public next: ListNode<T> | null = null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
/**
 * Returns the n‑th node from the end of the list.
 *
 * @param head  The first node of the list (may be null for an empty list)
 * @param n     1‑based index from the end (n = 1 → last node)
 * @throws    RangeError if n is <= 0 or larger than the list length
 * @returns   The node that is n‑th from the end
 */
export function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> {
  if (n <= 0) {
    throw new RangeError('n must be a positive integer');
  }

  // Fast pointer will be moved n steps ahead.
  let fast: ListNode<T> | null = head;
  for (let i = 0; i < n; i++) {
    if (!fast) {
      // The list is shorter than n nodes.
      throw new RangeError('n is larger than the length of the list');
    }
    fast = fast.next;
  }

  // Slow pointer starts at the head.
  let slow: ListNode<T> | null = head;

  // Move both pointers until fast reaches the end.
  while (fast) {
    fast = fast.next;
    slow = slow!.next; // `slow` cannot be null here because fast was n steps ahead.
  }

  // At this point `slow` is the n‑th node from the end.
  // The non‑null assertion (`!`) is safe because we already validated n.
  return slow!;
}
// Build a list: 10 → 20 → 30 → 40 → 50
const list = new ListNode<number>(10);
list.next = new ListNode<number>(20);
list.next.next = new ListNode<number>(30);
list.next.next.next = new ListNode<number>(40);
list.next.next.next.next = new ListNode<number>(50);

// Helper to print a node (or its value)
function printNode<T>(node: ListNode<T> | null) {
  console.log(node ? node.value : 'null');
}

// 1st from the end → 50
printNode(nthFromEnd(list, 1)); // 50

// 3rd from the end → 30
printNode(nthFromEnd(list, 3)); // 30

// 5th from the end → 10 (the head)
printNode(nthFromEnd(list, 5)); // 10

// Trying to get the 6th from the end throws
try {
  nthFromEnd(list, 6);
} catch (e) {
  console.error(e.message); // "n is larger than the length of the list"
}
// nthFromEnd.test.ts
import { ListNode, nthFromEnd } from './yourFile';

function buildList(...values: number[]): ListNode<number> | null {
  if (values.length === 0) return null;
  const head = new ListNode(values[0]);
  let cur = head;
  for (let i = 1; i < values.length; i++) {
    cur.next = new ListNode(values[i]);
    cur = cur.next;
  }
  return head;
}

describe('nthFromEnd', () => {
  test('basic cases', () => {
    const list = buildList(1, 2, 3, 4, 5);
    expect(nthFromEnd(list, 1).value).toBe(5);
    expect(nthFromEnd(list, 3).value).toBe(3);
    expect(nthFromEnd(list, 5).value).toBe(1);
  });

  test('throws when n is too large', () => {
    const list = buildList(1, 2);
    expect(() => nthFromEnd(list, 3)).toThrow(RangeError);
  });

  test('throws for non‑positive n', () => {
    const list = buildList(1);
    expect(() => nthFromEnd(list, 0)).toThrow(RangeError);
    expect(() => nthFromEnd(list, -2)).toThrow(RangeError);
  });

  test('single‑element list', () => {
    const list = buildList(42);
    expect(nthFromEnd(list, 1).value).toBe(42);
  });

  test('empty list throws', () => {
    expect(() => nthFromEnd(null, 1)).toThrow(RangeError);
  });
});
function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> {
  let fast = head;
  for (let i = 0; i < n; i++) if (!fast) throw new RangeError(); else fast = fast.next;
  let slow = head;
  while (fast) { fast = fast.next; slow = slow!.next!; }
  return slow!;
}
