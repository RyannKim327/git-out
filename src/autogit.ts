/**
 * Generic singly‑linked list node.
 */
export class ListNode<T> {
  /** The stored value */
  public value: T;
  /** Reference to the next node (null = end of list) */
  public next: ListNode<T> | null = null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
/**
 * Reverses a singly‑linked list in‑place.
 *
 * @param head The first node of the list (or null for an empty list)
 * @returns The new head of the reversed list
 */
export function reverseIterative<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr: ListNode<T> | null = head;

  while (curr !== null) {
    // Keep a reference to the next node before we overwrite `curr.next`
    const next: ListNode<T> | null = curr.next;

    // Reverse the link
    curr.next = prev;

    // Move the two pointers one step forward
    prev = curr;
    curr = next;
  }

  // When the loop finishes, `prev` points at the new head
  return prev;
}
/**
 * Recursively reverses a singly‑linked list.
 *
 * @param head The first node of the list (or null)
 * @returns The new head of the reversed list
 *
 * Note: This uses the call‑stack, so for very long lists you may hit the
 *       JavaScript/TypeScript recursion limit. Use the iterative version for
 *       production code.
 */
export function reverseRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
  // Base case: empty list or single node – already reversed
  if (head === null || head.next === null) {
    return head;
  }

  // Recursively reverse the rest of the list
  const newHead = reverseRecursive(head.next);

  // At this point, `head.next` is the last node of the reversed sub‑list.
  // We make that node point back to `head`.
  head.next.next = head;
  head.next = null; // break the original forward link

  return newHead;
}
/**
 * Builds a linked list from a plain array.
 *
 * Example: fromArray([1,2,3]) → 1 → 2 → 3 → null
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
 * Converts a linked list back to a plain array (useful for printing).
 */
export function toArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = [];
  let curr = head;
  while (curr !== null) {
    result.push(curr.value);
    curr = curr.next;
  }
  return result;
}
// ---------------------------------------------------------------
// Example usage (you can paste this into a TS file and run with ts-node)
// ---------------------------------------------------------------
import { ListNode, reverseIterative, reverseRecursive, fromArray, toArray } from "./linked-list";

// Build a list: 1 → 2 → 3 → 4 → null
const original = fromArray([1, 2, 3, 4]);
console.log("Original:", toArray(original)); // [1,2,3,4]

// ---- Iterative reversal ----
const iterReversed = reverseIterative(original);
console.log("Iterative reversed:", toArray(iterReversed)); // [4,3,2,1]

// To demonstrate the recursive version we need a fresh list
const fresh = fromArray([1, 2, 3, 4]);
const recReversed = reverseRecursive(fresh);
console.log("Recursive reversed:", toArray(recReversed)); // [4,3,2,1]
Original: [ 1, 2, 3, 4 ]
Iterative reversed: [ 4, 3, 2, 1 ]
Recursive reversed: [ 4, 3, 2, 1 ]
function reverse<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev = null, cur = head;
  while (cur) { const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt; }
  return prev;
}
