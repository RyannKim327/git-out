interface ListNode<T> {
  value: T;
  next?: ListNode<T>;   // undefined means end of list
}
function listLength<T>(head: ListNode<T> | undefined): number {
  let count = 0;
  let current = head;

  while (current) {
    count++;
    current = current.next;
  }

  return count;
}
function listLengthRec<T>(node: ListNode<T> | undefined): number {
  return node ? 1 + listLengthRec(node.next) : 0;
}
class LinkedList<T> {
  head?: ListNode<T>;
  tail?: ListNode<T>;

  // ... push, pop, etc. ...

  get length(): number {
    let count = 0;
    let cur = this.head;
    while (cur) {
      count++;
      cur = cur.next;
    }
    return count;
  }
}
const a: ListNode<number> = { value: 1, next: { value: 2, next: { value: 3 } } };

console.log(listLength(a));          // 3
console.log(listLengthRec(a));       // 3
