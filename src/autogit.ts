// A plain, singly‑linked node.
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
/**
 * Walks the list and counts how many nodes it contains.
 * @param head The first node of the list (or null for an empty list).
 * @returns How many nodes are in the list.
 */
function listLength<T>(head: ListNode<T> | null): number {
  let count = 0;
  let current = head;

  while (current !== null) {
    count++;
    current = current.next;
  }

  return count;
}
function listLengthRecursive<T>(node: ListNode<T> | null): number {
  if (!node) return 0;                // base case: nothing left
  return 1 + listLengthRecursive(node.next); // recurse
}
// Build a list: 1 → 2 → 3 → null
const third = new ListNode(3);
const second = new ListNode(2, third);
const first = new ListNode(1, second);

console.log(listLength(first));                // 3
console.log(listLengthRecursive(first));       // 3
console.log(listLength(null));                // 0
// For a doubly linked node that has .next and .prev:
let current = head;
while (current !== null) {
  count++;
  current = current.next;  // or current.prev, depending on direction
}
