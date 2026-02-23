interface ListNode<T = any> {
  value: T;
  next?: ListNode<T>;
}
/**
 * Counts nodes in a linked list.
 * @param head The first node (or undefined if the list is empty).
 * @returns Number of nodes in the list.
 */
function length<T>(head: ListNode<T> | undefined): number {
  let count = 0;
  let current = head;

  while (current) {
    count++;
    current = current.next;   // follow the chain
  }
  return count;
}
function lengthRecursive<T>(node: ListNode<T> | undefined): number {
  return node ? 1 + lengthRecursive(node.next) : 0;
}
function* nodes<T>(head: ListNode<T> | undefined) {
  let cur = head;
  while (cur) {
    yield cur;
    cur = cur.next;
  }
}

function lengthFromIterable<T>(head: ListNode<T> | undefined): number {
  let count = 0;
  for (const _ of nodes(head)) count++;
  return count;
}
const third = { value: 3 } as ListNode<number>;
const second = { value: 2, next: third };
const first  = { value: 1, next: second };

console.log(length(first));           // 3
console.log(lengthRecursive(first));  // 3
