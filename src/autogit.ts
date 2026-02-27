/**
 * Basic node definition for a singly‑linked list.
 */
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

/**
 * Returns `true` if the list reads the same forwards and backwards.
 *
 * Time   : O(n) – we traverse the list a constant number of times.
 * Space  : O(1) – we only use a few pointer variables.
 */
function isPalindrome<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) return true;   // empty or single‑node list

  // 1. Find the middle of the list
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // 2. Reverse the second half (starting from slow.next)
  let prev: ListNode<T> | null = null;
  let curr: ListNode<T> | null = slow.next;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // `prev` is now the head of the reversed second half

  // 3. Compare the first half with the reversed second half
  let p1 = head;
  let p2 = prev;
  while (p2) {               // only need to go as far as the short half
    if (p1.val !== p2.val) return false;
    p1 = p1.next!;
    p2 = p2.next!;
  }

  // Optional: restore the list to its original order (not required for the answer)
  // reverse(prev) again and reattach to `slow.next`

  return true;
}
const build = (...vals: number[]): ListNode<number> | null => {
  let head: ListNode<number> | null = null;
  let tail: ListNode<number> | null = null;
  for (const v of vals) {
    const node = new ListNode(v);
    if (!head) head = node;
    else tail!.next = node;
    tail = node;
  }
  return head;
};

console.log(isPalindrome(build(1, 2, 3, 2, 1))); // true
console.log(isPalindrome(build(1, 2, 2, 1)));      // true
console.log(isPalindrome(build(1, 2, 3, 4, 5))); // false
