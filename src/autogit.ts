// A classic singly‑linked‑list node
class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

/**
 * Returns the nth node from the end (1‑based) or null if n is out of range.
 */
function nthFromEnd<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  if (n <= 0) return null;          // natural guard for mis‑ed input

  let first: ListNode<T> | null = head;
  let second: ListNode<T> | null = head;

  /* Advance `first` n steps ahead. */
  for (let i = 0; i < n; i++) {
    if (!first) return null;   // n is larger than list length
    first = first.next;
  }

  /* Move both pointers until `first` hits the end. */
  while (first) {
    first = first.next;
    second = second!.next;     // second is guaranteed not null here
  }

  return second;   // `second` is the nth node from the end
}
function nthFromEndTwoPass<T>(head: ListNode<T> | null, n: number): ListNode<T> | null {
  let len = 0;
  for (let cur = head; cur; cur = cur.next) len++;

  if (n <= 0 || n > len) return null;

  let cur = head;
  for (let i = 0; i < len - n; i++) cur = cur!.next;

  return cur;
}
// Example list: 1 → 2 → 3 → 4 → 5
const tail = new ListNode(5);
const middle = new ListNode(4, tail);
const head = new ListNode(1,
           new ListNode(2,
           new ListNode(3,
           middle)));

console.log(nthFromEnd(head, 1)?.val); // 5
console.log(nthFromEnd(head, 2)?.val); // 4
console.log(nthFromEnd(head, 5)?.val); // 1
console.log(nthFromEnd(head, 6));      // null
