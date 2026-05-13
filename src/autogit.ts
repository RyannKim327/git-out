/**
 * A conventional singly–linked list node.
 * The value is generic so you can store anything.
 */
export interface ListNode<T = number> {
  value: T
  next: ListNode<T> | null
}
/**
 * Return the n‑th node from the end of the list.
 *
 * @param head  the head node of the list
 * @param n     1‑based index (1 → last node, 2 → second‑to‑last, …)
 * @returns the ListNode that is n places from the end,
 *          or `null` if the list has fewer than n items.
 */
export function nthFromEnd<T>(
  head: ListNode<T> | null,
  n: number,
): ListNode<T> | null {
  if (n <= 0) {
    throw new Error('n must be a positive integer');
  }

  let fast: ListNode<T> | null = head
  let slow: ListNode<T> | null = head

  // Move `fast` n nodes ahead.
  for (let i = 0; i < n; i++) {
    if (!fast) {
      // The list is shorter than n.
      return null
    }
    fast = fast.next
  }

  // Move both pointers until `fast` reaches the end.
  while (fast) {
    fast = fast.next
    slow = slow!.next // `slow` cannot be null here.
  }

  return slow
}
import { ListNode, nthFromEnd } from './linkedListHelpers'

// Build a quick sample list: 1 → 2 → 3 → 4 → 5
let head: ListNode<number> | null = { value: 1, next: null }
let cur = head
for (let i = 2; i <= 5; i++) {
  cur!.next = { value: i, next: null }
  cur = cur.next
}

// 1st from the end → 5
console.log(nthFromEnd(head, 1)!.value) // 5

// 3rd from the end → 3
console.log(nthFromEnd(head, 3)!.value) // 3

// 6th from the end → null (list too short)
console.log(nthFromEnd(head, 6)) // null
