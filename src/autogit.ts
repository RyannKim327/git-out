class ListNode {
  value: number;
  next: ListNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}
function findMiddle(head: ListNode | null): ListNode | null {
  if (!head) return null;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  return slow; // slow is now at the middle
}
// Create list: 1 -> 2 -> 3 -> 4 -> 5
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const middle = findMiddle(head);
console.log(middle?.value); // Output: 3
