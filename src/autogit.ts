// The node structure we’ll be working with.
export class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}
/**
 * Reverse a singly linked list.
 *
 * @param head The head node (or `null` if the list is empty).
 * @returns The new head after reversal.
 */
export function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;   // Will become the new tail
  let curr: ListNode<T> | null = head;   // The node we’re currently visiting

  while (curr !== null) {
    const nextNode = curr.next; // remember where we’re headed
    curr.next = prev;           // flip the direction
    prev = curr;                // move prev forward
    curr = nextNode;            // move curr forward
  }

  // When curr is null, prev is the new head.
  return prev;
}
/**
 * Reverse using recursion (not advisable for huge lists).
 * Works nicely for small or medium lists.
 */
export function reverseRecursively<T>(head: ListNode<T> | null): ListNode<T> | null {
  // Base case: empty list or single element
  if (!head || !head.next) {
    return head;
  }

  // Recursively reverse the rest of the list
  const newHead = reverseRecursively(head.next);

  // After the deeper call finishes, head is the *last* node we visited
  // So we need to attach the current head to the end of the reversed part.
  head.next.next = head;
  head.next = null;      // break the original link

  return newHead;        // propagate the new head up the stack
}
// Helper to convert array ➜ linked list ➜ array (for easy verification)
function arrayToList<T>(arr: T[]): ListNode<T> | null {
  let head: ListNode<T> | null = null;
  let tail: ListNode<T> | null = null;

  for (const val of arr) {
    const node = new ListNode(val);
    if (!head) head = node;
    else if (tail) tail.next = node;
    tail = node;
  }
  return head;
}

function listToArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = [];
  for (let node = head; node; node = node.next) result.push(node.val);
  return result;
}

// Demo
const list = arrayToList([1, 2, 3, 4, 5]);
console.log('Original →', listToArray(list));
console.log('Iterative →', listToArray(reverseLinkedList(list)));
Original → [ 1, 2, 3, 4, 5 ]
Iterative → [ 5, 4, 3, 2, 1 ]
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
