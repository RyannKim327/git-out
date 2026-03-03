export interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}
export class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}
export function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null
  let curr = head

  while (curr) {
    const nxt = curr.next      // keep reference to next node
    curr.next = prev           // flip the link
    prev = curr                // advance prev
    curr = nxt                 // advance curr
  }

  return prev   // new head
}
export function reverseListRec<T>(node: ListNode<T> | null, prev: ListNode<T> | null = null): ListNode<T> | null {
  if (!node) return prev
  const nxt = node.next
  node.next = prev
  return reverseListRec(nxt, node)
}
// build 1 → 2 → 3
const n3 = new ListNode(3)
const n2 = new ListNode(2, n3)
const n1 = new ListNode(1, n2)

// reverse
const reversed = reverseList(n1)

// print results
let cur = reversed
while (cur) {
  console.log(cur.value)
  cur = cur.next
}
// → 3, 2, 1
