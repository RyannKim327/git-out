// A very lightweight node definition –
export class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}

/**
 * Returns the middle node of a linked list.
 * If there are an even number of nodes, it returns the *first* of the two middle nodes.
 * (Adjust `result` if you prefer the second middle node instead.)
 */
export function findMiddle(head: ListNode | null): ListNode | null {
  if (!head) return null;

  let slow = head;          // moves one step at a time
  let fast = head;          // moves two steps at a time

  // Advance until fast reaches the end
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  return slow;   // `slow` rests right on the middle (or first middle)
}
// Helper to build a list quickly
const build = (values: number[]) =>
  values.reduceRight((next, v) => new ListNode(v, next), null as any);

// 1 → 2 → 3 → 4 → 5   → middle is 3
const list1 = build([1, 2, 3, 4, 5]);
console.log(findMiddle(list1)!.val); // 3

// 1 → 2 → 3 → 4        → middle returned is 2
const list2 = build([1, 2, 3, 4]);
console.log(findMiddle(list2)!.val); // 2
