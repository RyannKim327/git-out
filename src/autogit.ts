// 1️⃣  Basic ListNode definition
export interface ListNode<T> {
  val: T;
  next: ListNode<T> | null;
}
/**
 * Reverses a singly-linked list.
 * @param head  Head of the original list (or null for an empty list)
 * @returns     Head of the new, reversed list
 */
export function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let current: ListNode<T> | null = head;

  while (current) {
    const nextTemp: ListNode<T> | null = current.next; // save next
    current.next = prev;                                // reverse link
    prev = current;                                     // move prev forward
    current = nextTemp;                                 // advance current
  }

  return prev; // new head
}
/**
 * Recursively reverses a list.
 * Works fine for reasonable list lengths; big lists risk a stack overflow.
 */
export function reverseListRec<T>(head: ListNode<T> | null): ListNode<T> | null {
  // Base case: empty list or tail of the original list
  if (!head || !head.next) return head;

  // Recursively reverse the rest of the list
  const newHead = reverseListRec(head.next);

  // At this point, head.next is the last node of the reversed part
  head.next.next = head; // point tail back to current
  head.next = null;     // terminate current node

  return newHead; // propagate new head back up
}
// Helper to build a list from an array
const build = <T>(arr: T[]): ListNode<T> | null => {
  let dummy: ListNode<T> = { val: null as any, next: null };
  let tail = dummy;
  for (const v of arr) {
    tail.next = { val: v, next: null };
    tail = tail.next;
  }
  return dummy.next;
};

// Helper to turn a list into an array (for easy inspection)
const toArray = <T>(head: ListNode<T> | null): T[] => {
  const res: T[] = [];
  for (let cur = head; cur; cur = cur.next) res.push(cur.val);
  return res;
};

const list = build([1, 2, 3, 4, 5]);
const reversed = reverseList(list);
console.log(toArray(reversed)); // [5, 4, 3, 2, 1]
