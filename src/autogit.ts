interface ListNode<T> {
  val: T;
  next: ListNode<T> | null;
}
/**
 * Returns the n‑th node from the end of a singly linked list.
 * If n is out of bounds, returns null.
 *
 * @param head The head of the list.
 * @param n    1‑based index from the end (n = 1 => tail node).
 */
function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (n <= 0) return null;           // invalid request

  let fast: ListNode<T> | null = head;
  let slow: ListNode<T> | null = head;

  // Move fast n steps forward
  for (let i = 0; i < n; i++) {
    if (!fast) return null;          // n larger than list size
    fast = fast.next;
  }

  // Move both until fast reaches the end
  while (fast) {
    slow = slow!.next;  // fast is non‑null here, so slow is safe
    fast = fast.next;
  }

  return slow;
}
// Build 1 → 2 → 3 → 4 → 5
let node5: ListNode<number> = { val: 5, next: null };
let node4 = { val: 4, next: node5 };
let node3 = { val: 3, next: node4 };
let node2 = { val: 2, next: node3 };
let node1 = { val: 1, next: node2 };

console.log(nthFromEnd(node1, 1)?.val); // 5 (tail)
console.log(nthFromEnd(node1, 2)?.val); // 4
console.log(nthFromEnd(node1, 5)?.val); // 1 (head)
console.log(nthFromEnd(node1, 6));       // null (out of bounds)
