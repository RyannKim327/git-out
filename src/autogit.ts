// 1.  Node definition
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

// 2.  Reversal function
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr = head;

  while (curr) {
    const nextTemp = curr.next; // keep the rest of the list
    curr.next = prev;         // flip the pointer
    prev = curr;              // move prev forward
    curr = nextTemp;          // move curr forward
  }
  return prev;                // new head
}

/* ---------- 3.  Quick sanity check ---------- */
// Build 1 -> 2 -> 3 -> null
const list = new ListNode(1, new ListNode(2, new ListNode(3)));

// Reverse it
const reversed = reverseLinkedList(list);

// Print result: 3 2 1
let p: ListNode<number> | null = reversed;
while (p) {
  console.log(p.value);
  p = p.next;
}
function reverseLinkedListRecursive<T>(
  head: ListNode<T> | null,
  prev: ListNode<T> | null = null
): ListNode<T> | null {
  if (!head) return prev;
  const next = head.next;
  head.next = prev;
  return reverseLinkedListRecursive(next, head);
}
