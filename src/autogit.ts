// 1.  Define the node structure
class ListNode<T> {
  constructor(
    public data: T,
    public next: ListNode<T> | null = null
  ) {}
}

// 2.  Reverse the list
function reverseLinkedList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // save next
    curr.next = prev;       // reverse pointer
    prev = curr;            // move prev forward
    curr = next;            // move curr forward
  }
  return prev; // new head
}

/* ---------- Usage example ---------- */
function printList<T>(head: ListNode<T> | null): void {
  const out: T[] = [];
  for (let node = head; node; node = node.next) out.push(node.data);
  console.log(out.join(" -> "));
}

// Build 1 -> 2 -> 3 -> null
let head = new ListNode(1, new ListNode(2, new ListNode(3)));
printList(head);                // 1 -> 2 -> 3

head = reverseLinkedList(head);
printList(head);                // 3 -> 2 -> 1
