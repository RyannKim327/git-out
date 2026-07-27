// A minimal, generic node type
export interface ListNode<T> {
  readonly value: T;
  next: ListNode<T> | null;
}

/**
 * Returns the middle node of a singly‑linked list.
 * If the list has an even number of nodes, it returns
 * the *second* middle node (i.e. the one that a
 * “slow‑pointer” would land on after the last move).
 *
 * @param head Head of the list – null if the list is empty.
 * @returns The middle node, or null for an empty list.
 */
export function middleNode<T>(head: ListNode<T> | null): ListNode<T> | null {
  let slow = head;
  let fast = head;

  // advance fast two steps, slow one step
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
// Build a list: 1 → 2 → 3 → 4 → 5
const node5: ListNode<number> = { value: 5, next: null };
const node4: ListNode<number> = { value: 4, next: node5 };
const node3: ListNode<number> = { value: 3, next: node4 };
const node2: ListNode<number> = { value: 2, next: node3 };
const node1: ListNode<number> = { value: 1, next: node2 };

const mid = middleNode(node1);
console.log(mid?.value); // → 3
