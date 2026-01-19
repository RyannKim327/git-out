export class ListNode<T> {
  constructor(
    public val: T,
    public next: ListNode<T> | null = null
  ) {}
}
export function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;   // remember where we’re headed
    curr.next = prev;         // flip the link
    prev = curr;              // move prev forward
    curr = next;              // move curr forward
  }

  // At the end of the loop, `prev` is the new head
  return prev;
}
// Helper to print the list
function printList<T>(head: ListNode<T> | null): void {
  const values = [];
  let curr = head;
  while (curr) {
    values.push(curr.val);
    curr = curr.next;
  }
  console.log(values.join(' → ') + ' → null');
}

// Build 1 → 2 → 3 → null
const head = new ListNode(1,
             new ListNode(2,
               new ListNode(3)));

console.log('Original list:');
printList(head);

const reversed = reverseList(head);

console.log('Reversed list:');
printList(reversed);
Original list:
1 → 2 → 3 → null
Reversed list:
3 → 2 → 1 → null
export function reverseListRec<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head || !head.next) return head;         // base case

  const newHead = reverseListRec(head.next);     // reverse rest of list
  head.next.next = head;                        // make the next node point to us
  head.next = null;                             // sever old link

  return newHead;                               // new head propagates upward
}
