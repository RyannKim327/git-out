interface ListNode<T> {
  val: T;
  next: ListNode<T> | null;
}
/**
 * Returns the n‑th node from the end of a singly linked list,
 * or null if it doesn't exist.
 * n is 1‑based: n = 1 means the last node.
 */
function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (n <= 0) return null;            // invalid n – feel free to adjust

  let fast: ListNode<T> | null = head;
  // Step 1: move fast n steps ahead
  for (let i = 0; i < n; i++) {
    if (!fast) return null;           // n is larger than the list length
    fast = fast.next;
  }

  // Step 2: move both pointers until fast reaches the end
  let slow: ListNode<T> | null = head;
  while (fast) {
    fast = fast.next;
    slow = slow!.next!;
  }

  return slow; // could be null if the list was empty
}
// build a tiny list: 1 → 2 → 3 → 4 → 5
let node5: ListNode<number> = { val: 5, next: null };
let node4: ListNode<number> = { val: 4, next: node5 };
let node3: ListNode<number> = { val: 3, next: node4 };
let node2: ListNode<number> = { val: 2, next: node3 };
let node1: ListNode<number> = { val: 1, next: node2 };

const thirdFromEnd = nthFromEnd(node1, 3);
console.log(thirdFromEnd?.val); // 3
