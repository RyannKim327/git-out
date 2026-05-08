// One‑way (singly) list node
class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next;   // keep the next node
    curr.next = prev;         // reverse the link
    prev = curr;              // advance prev
    curr = next;              // advance curr
  }

  return prev;                // new head of the reversed list
}
function reverseRec<T>(
  node: ListNode<T> | null,
  prev: ListNode<T> | null = null
): ListNode<T> | null {
  if (!node) return prev;      // end reached – prev is the new head

  const next = node.next;      // hold next
  node.next = prev;            // reverse pointer
  return reverseRec(next, node); // recurse
}
// 1 → 2 → 3 → null
let head = new ListNode(1);
head.next = new ListNode(2, new ListNode(3));

head = reverseLinkedList(head);

// head now points to 3 → 2 → 1 → null
