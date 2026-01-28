// Basic node definition
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

// Helper – takes the head of a list and returns the middle node.
function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (!head) return null;

  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  // advance `fast` two steps for every one step `slow` takes
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;          // will never be null here – just for TS safety
    fast = fast.next.next;
  }

  // when fast runs out, slow is at the middle
  return slow;
}
// Build a tiny list: 1 → 2 → 3 → 4 → 5
const a: ListNode<number> = { value: 1, next: null };
const b: ListNode<number> = { value: 2, next: null };
const c: ListNode<number> = { value: 3, next: null };
const d: ListNode<number> = { value: 4, next: null };
const e: ListNode<number> = { value: 5, next: null };

a.next = b; b.next = c; c.next = d; d.next = e;

const middle = findMiddle(a);
console.log(middle?.value); // logs 3
