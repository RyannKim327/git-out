// A minimal, generic node
export type ListNode<T> = {
  value: T;
  next: ListNode<T> | null;
};
export function reverseIter<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let current: ListNode<T> | null = head;

  while (current !== null) {
    const next = current.next; // remember where we’re going
    current.next = prev;       // flip the link
    prev = current;            // move prev forward
    current = next;            // advance current
  }
  // prev is the new head
  return prev;
}
export function reverseRec<T>(
  head: ListNode<T> | null,
  prev: ListNode<T> | null = null
): ListNode<T> | null {
  if (head === null) return prev;          // base case: end of list
  const next = head.next;                  // keep track of next node
  head.next = prev;                        // flip link
  return reverseRec(next, head);           // recurse
}
// Build a tiny list: 1 → 2 → 3 → null
const a: ListNode<number> = { value: 1, next: null };
const b: ListNode<number> = { value: 2, next: a };
const c: ListNode<number> = { value: 3, next: b };

// Reverse it
const reversed = reverseIter(c);

// Print out the new list
let node: ListNode<number> | null = reversed;
while (node !== null) {
  console.log(node.value); // 1, 2, 3
  node = node.next;
}
class SinglyLinkedList<T> {
  head: ListNode<T> | null = null;

  // push, pop, etc.

  reverse(): void {
    this.head = reverseIter(this.head);
  }
}
