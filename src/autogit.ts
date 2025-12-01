class ListNode {
  value: number;
  next: ListNode | null;

  constructor(value: number, next: ListNode | null = null) {
    this.value = value;
    this.next = next;
  }
}
function getLength(head: ListNode | null): number {
  let count = 0;
  let current = head;

  while (current !== null) {
    count++;
    current = current.next;
  }

  return count;
}
const node3 = new ListNode(3);
const node2 = new ListNode(2, node3);
const node1 = new ListNode(1, node2);

console.log(getLength(node1)); // Outputs: 3
