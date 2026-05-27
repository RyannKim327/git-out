class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  prev: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
function reverse<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next;    // keep a handle on the rest
    curr.next = prev;          // reverse the arrow
    prev = curr;               // advance prev
    curr = next;               // advance curr
  }

  return prev; // new head
}
function reverseRecursive<T>(
  node: ListNode<T> | null,
  prev: ListNode<T> | null = null
): ListNode<T> | null {
  if (!node) return prev;

  const next = node.next;
  node.next = prev;
  return reverseRecursive(next, node);
}
function reverseDoubly<T>(head: ListNode<T> | null): ListNode<T> | null {
  let current = head;
  let newHead: ListNode<T> | null = null;

  while (current) {
    // swap next and prev
    const tmp = current.next;
    current.next = current.prev;
    current.prev = tmp;

    // once we flip at the old head, that becomes the new head
    if (!tmp) newHead = current;

    current = tmp; // move to what was next, now prev
  }

  return newHead;
}
// Building a tiny list: 1 → 2 → 3
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);
a.next = b; b.next = c;

// Reverse
const reversed = reverse(a);

// Log values in order
let node = reversed;
while (node) {
  console.log(node.value); // 3, 2, 1
  node = node.next;
}
