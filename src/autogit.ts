// Simple singly linked list node
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

/**
 * Returns the nth node from the end (1-based: n = 1 -> last node)
 * If n is invalid or the list is too short, returns null.
 */
function nthFromEnd<T>(
  head: ListNode<T> | null,
  n: number
): ListNode<T> | null {
  if (head === null) return null;
  if (n <= 0) return null; // invalid input

  // Move fast n steps ahead
  let fast: ListNode<T> | null = head;
  for (let i = 0; i < n; i++) {
    if (fast === null) return null; // n is larger than the length
    fast = fast.next;
  }

  // Move both pointers until fast reaches the end
  let slow: ListNode<T> | null = head;
  while (fast !== null) {
    slow = slow!.next;
    fast = fast.next;
  }

  // slow is now the nth node from the end
  return slow;
}
// Build a simple list: 1 -> 2 -> 3 -> 4 -> 5
const head: ListNode<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: { value: 5, next: null }
      }
    }
  }
};

const n = 2;
const node = nthFromEnd(head, n);
console.log(node?.value); // 4
