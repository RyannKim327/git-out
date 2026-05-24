// A minimal node type – adjust if your list uses a different shape
interface ListNode {
  val: number | string;   // whatever data type you use
  next: ListNode | null;
}

/**
 * Returns true iff the list starting at `head` is a palindrome.
 * Uses O(n) time and O(n) auxiliary space.
 */
function isPalindrome(head: ListNode | null): boolean {
  // 1. Build an array with the list's values
  const vals: (number | string)[] = [];
  for (let cur = head; cur; cur = cur.next) {
    vals.push(cur.val);
  }

  // 2. Check against a reversed copy
  for (let i = 0, j = vals.length - 1; i < j; i++, j--) {
    if (vals[i] !== vals[j]) {
      return false;
    }
  }
  return true;
}
function isPalindrome(head: ListNode | null): boolean {
  // Find middle (slow goes 1 step, fast goes 2 steps)
  let slow = head, fast = head;
  while (fast?.next && fast.next.next) {
    slow = slow!.next!;
    fast = fast.next.next;
  }

  // Reverse the second half of the list
  let prev: ListNode | null = null;
  let curr = slow?.next ?? null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Compare first half and reversed second half
  let p1 = head, p2 = prev;
  while (p2) {           // only need to go through the second half
    if (p1!.val !== p2.val) return false;
    p1 = p1!.next;
    p2 = p2.next;
  }
  return true;
}
