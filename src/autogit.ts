// A very minimal node definition
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

// Utility to compute length
function linkedListLength<T>(head: ListNode<T> | null): number {
  let len = 0;
  let cur = head;

  while (cur) {
    len++;
    cur = cur.next;
  }

  return len;
}
// Build a simple list: 1 → 2 → 3
const node3: ListNode<number> = { value: 3, next: null };
const node2: ListNode<number> = { value: 2, next: node3 };
const node1: ListNode<number> = { value: 1, next: node2 };

console.log(linkedListLength(node1)); // 3
