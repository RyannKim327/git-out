class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;

  while (current !== null) {
    // Save the next node
    const nextNode = current.next;
    // Reverse the current node's pointer
    current.next = prev;
    // Move pointers one position ahead
    prev = current;
    current = nextNode;
  }

  // prev will be the new head of the reversed list
  return prev;
}
// Create a linked list: 1 -> 2 -> 3 -> null
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;

console.log("Original list:");
let current = node1;
while (current !== null) {
  console.log(current.val);
  current = current.next;
}

// Reverse the list
const reversedHead = reverseList(node1);

console.log("Reversed list:");
current = reversedHead;
while (current !== null) {
  console.log(current.val);
  current = current.next;
}
