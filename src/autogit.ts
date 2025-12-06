class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}
function getLinkedListLength<T>(head: ListNode<T> | null): number {
  let length = 0;
  let currentNode = head;

  while (currentNode !== null) {
    length++;
    currentNode = currentNode.next;
  }

  return length;
}
// Create a linked list: 1 -> 2 -> 3
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

console.log(getLinkedListLength(head)); // Output: 3
console.log(getLinkedListLength(null)); // Output: 0 (empty list)
function getLinkedListLengthRecursive<T>(node: ListNode<T> | null): number {
  if (node === null) return 0;
  return 1 + getLinkedListLengthRecursive(node.next);
}
