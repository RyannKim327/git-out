// A simple node definition – adjust to match your existing structure
interface ListNode<T> {
  value: T;
  next?: ListNode<T>;
}
function getLength<T>(head: ListNode<T> | undefined): number {
  let count = 0;
  let current = head;

  while (current) {
    count++;
    current = current.next;
  }

  return count;
}
function getLengthRec<T>(node: ListNode<T> | undefined): number {
  if (!node) return 0;
  return 1 + getLengthRec(node.next);
}
