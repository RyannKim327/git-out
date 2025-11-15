class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
function reverseLinkedList<T>(head: LinkedListNode<T> | null): LinkedListNode<T> | null {
  let prev: LinkedListNode<T> | null = null;
  let current = head;

  while (current) {
    const nextNode = current.next; // temporarily store next node
    current.next = prev;           // reverse pointer
    prev = current;                // move prev forward
    current = nextNode;            // move current forward
  }

  return prev;
}
function reverseLinkedListRecursive<T>(
  node: LinkedListNode<T> | null,
  prev: LinkedListNode<T> | null = null
): LinkedListNode<T> | null {
  if (!node) return prev;
  const nextNode = node.next;
  node.next = prev;
  return reverseLinkedListRecursive(nextNode, node);
}
// Construct: 1 -> 2 -> 3
const head = new LinkedListNode(1);
head.next = new LinkedListNode(2);
head.next.next = new LinkedListNode(3);

// Reverse
const reversedHead = reverseLinkedList(head);
// Now: 3 -> 2 -> 1
