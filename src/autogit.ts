// A minimal node definition
class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

// Finder function
function length<T>(head: ListNode<T> | null): number {
  let count = 0;
  let current = head;
  while (current !== null) {
    count++;
    current = current.next;
  }
  return count;
}

// Example usage
const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);

a.next = b;
b.next = c;

console.log(length(a)); // 3
function lengthRec<T>(node: ListNode<T> | null): number {
  if (!node) return 0;
  return 1 + lengthRec(node.next);
}
