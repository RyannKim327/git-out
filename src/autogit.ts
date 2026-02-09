export interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}
/**
 * Returns the nth node from the end of a singly‑linked list.
 *
 * @param head  The head of the list (may be null).
 * @param n 1‑based index counting from the last node.
 * @returns   The node itself, or null if n is out of bounds.
 */
export function getNthFromEnd<T>(
  head: ListNode<T> | null,
  n: number
): ListNode<T> | null {
  if (n <= 0) return null;                // n must be positive

  let fast: ListNode<T> | null = head;
  let slow: ListNode<T> | null = head;

  // Advance `fast` n steps ahead.
  for (let i = 0; i < n; i++) {
    if (!fast) return null;              // n is larger than the list length
    fast = fast.next;
  }

  // Move both pointers until `fast` reaches the end.
  while (fast) {
    fast = fast.next;
    slow = slow?.next ?? null;
  }

  // `slow` is now the nth from the end.
  return slow;
}
// Build a tiny list: 10 → 20 → 30 → 40 → 50
const node5: ListNode<number> = { value: 50, next: null };
const node4: ListNode<number> = { value: 40, next: node5 };
const node3: ListNode<number> = { value: 30, next: node4 };
const node2: ListNode<number> = { value: 20, next: node3 };
const head: ListNode<number> = { value: 10, next: node2 };

const thirdFromEnd = getNthFromEnd(head, 3);
console.log(thirdFromEnd?.value); // 30
