// A minimal, singly‑linked node definition
export interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

// Returns the node that is n‑th from the end (1‑based)
// or null if the list is shorter than n.
export function nthFromEnd<T>(
  head: ListNode<T> | null,
  n: number,
): ListNode<T> | null {
  // Guard against invalid n
  if (n <= 0) return null;

  let fast: ListNode<T> | null = head;
  let slow: ListNode<T> | null = head;

  // Advance fast n steps ahead
  for (let i = 0; i < n; i++) {
    if (!fast) return null; // n > length
    fast = fast.next;
  }

  // Edge case: n equals the list length ⇒ return head
  if (!fast) return head;

  // Move both until fast reaches the tail
  while (fast.next) {
    fast = fast.next;
    slow = slow!.next; // slow is guaranteed not null here
  }

  return slow;
}
// Helper to build a list from an array
function buildList<T>(arr: T[]): ListNode<T> | null {
  if (arr.length === 0) return null;
  const head: ListNode<T> = { value: arr[0], next: null };
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = { value: arr[i], next: null };
    current = current.next;
  }
  return head;
}

// Example
const head = buildList([10, 20, 30, 40, 50]);

console.log(nthFromEnd(head, 1)?.value); // 50 (last)
console.log(nthFromEnd(head, 3)?.value); // 30
console.log(nthFromEnd(head, 5)?.value); // 10 (first)
console.log(nthFromEnd(head, 6));        // null (too big)
