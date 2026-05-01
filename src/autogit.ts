interface ListNode {
  val: number | string | any;   // whatever type you’re storing
  next?: ListNode | null;
}
function reverse(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let cur = head;

  while (cur) {
    const next = cur.next;   // keep the next node
    cur.next = prev;         // reverse the pointer
    prev = cur;              // move prev forward
    cur = next;              // move cur forward
  }

  return prev; // new head
}
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true; // 0 or 1 node → automatically a palindrome
  
  // --- find middle with fast/slow pointers ---
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next!;
  }
  
  // For odd‑length lists, skip the middle node
  if (fast) {
    slow = slow.next!;
  }
  
  // --- reverse the second half ---
  const secondHalfStart = reverse(slow);
  
  // --- compare first half and reversed second half ---
  let p1 = head;
  let p2 = secondHalfStart;
  let result = true;
  
  while (result && p2) {           // p2 is shorter or equal to p1
    if (p1!.val !== p2.val) result = false;
    p1 = p1!.next!;
    p2 = p2.next!;
  }
  
  // If you want the original list preserved, reverse the second half again:
  // reverse(secondHalfStart);
  
  return result;
}
function isPalindromeStack(head: ListNode | null): boolean {
  const stack: (number | string | any)[] = [];
  let cur = head;

  while (cur) {
    stack.push(cur.val);
    cur = cur.next;
  }

  cur = head;
  while (cur) {
    if (cur.val !== stack.pop()) return false;
    cur = cur.next;
  }
  return true;
}
