class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

function middle<T>(head: Node<T> | null): Node<T> | null {
  if (!head) return null;           // empty list

  let slow: Node<T> | null = head;
  let fast: Node<T> | null = head;

  // Move `fast` twice as fast as `slow`.
  // When `fast` reaches the end, `slow` will be at the middle.
  while (fast && fast.next) {
    slow = slow!.next!;
    fast = fast.next.next;
  }

  return slow; // this node is the middle
}
while (fast && fast.next) {
  slow = slow!.next!;
  fast = fast.next?.next ?? null;
}

// after loop, `slow` is still the first middle;
slow = slow?.next ?? null;      // move to the second middle
const list = new Node(1,
  new Node(2,
    new Node(3,
      new Node(4,
        new Node(5)))));

console.log(middle(list)?.value); // 3
