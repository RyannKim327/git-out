class ListNode {
  value: any;
  next: ListNode | null;
  constructor(value: any, next: ListNode | null = null) {
    this.value = value;
    this.next = next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  // Step 1: Convert to array
  const vals: any[] = [];
  let curr = head;
  while (curr) {
    vals.push(curr.value);
    curr = curr.next;
  }
  // Step 2: Check palindrome
  let left = 0, right = vals.length - 1;
  while (left < right) {
    if (vals[left] !== vals[right]) return false;
    left++;
    right--;
  }
  return true;
}
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // Step 1: Find middle of the list
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  
  // Step 2: Reverse second half
  let prev: ListNode | null = null;
  let curr = slow.next;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  
  // Step 3: Compare both halves
  let left = head;
  let right = prev;
  while (right) {
    if (left.value !== right.value) return false;
    left = left.next!;
    right = right.next;
  }
  return true;
}
