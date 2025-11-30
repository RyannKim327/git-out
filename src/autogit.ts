class ListNode {
  val: number;
  next: ListNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // Step 1: Find middle using slow/fast pointers
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let secondHalf = reverseList(slow);

  // Step 3: Compare first and second half
  let p1 = head;
  let p2 = secondHalf;

  while (p2 !== null) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next!;
    p2 = p2.next;
  }

  return true;
}
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);

console.log(isPalindrome(head)); // true
