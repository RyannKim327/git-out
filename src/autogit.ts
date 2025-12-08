class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) { this.val = val; }
}
function isPalindrome(head: ListNode | null): boolean {
  if (head === null || head.next === null) return true;

  /* ---- 1.  fast/slow split ---- */
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  /* ---- 2.  reverse second half ---- */
  let prev: ListNode | null = null;
  let curr: ListNode | null = slow;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  /* ---- 3.  compare ---- */
  let left: ListNode | null = head;
  let right: ListNode | null = prev;   // head of reversed half
  let result = true;
  while (right) {                       // right is shorter or equal
    if (left!.val !== right.val) {
      result = false;
      break;
    }
    left  = left!.next;
    right = right.next;
  }

  /* ---- 4.  restore (optional) ---- */
  curr = prev;
  prev = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  // slow!.next = prev;   // reconnect if you need the original list back

  return result;
}
const n1 = new ListNode(1);
const n2 = new ListNode(2);
const n3 = new ListNode(3);
const n4 = new ListNode(2);
const n5 = new ListNode(1);
n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n5;

console.log(isPalindrome(n1)); // true
