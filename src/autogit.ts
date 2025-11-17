class ListNode {
  val: number;
  next: ListNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // Step 1: Find the middle
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half
  let secondHalfStart = reverseList(slow);
  let firstHalfStart = head;

  // Step 3: Compare
  let result = true;
  let p1 = firstHalfStart;
  let p2 = secondHalfStart;

  while (result && p2) {
    if (p1.val !== p2.val) result = false;
    p1 = p1.next!;
    p2 = p2.next;
  }

  // Step 4: Restore the list (optional)
  reverseList(secondHalfStart);

  return result;
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

// ✅ Example usage:
// const head = new ListNode(1);
// head.next = new ListNode(2);
// head.next.next = new ListNode(2);
// head.next.next.next = new ListNode(1);
// console.log(isPalindrome(head)); // true
