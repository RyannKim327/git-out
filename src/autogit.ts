// --------------------------------------------------
// 1️⃣  Linked‑list node definition
// --------------------------------------------------
export interface ListNode<T> {
  val: T;
  next: ListNode<T> | null;
}

// --------------------------------------------------
// 2️⃣  Helper: reverse a list, returns new head
// --------------------------------------------------
/**
 * Reverses the linked list starting at node `head`.
 * Returns the new head of the reversed list.
 */
function reverse<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;          // new head
}

// --------------------------------------------------
// 3️⃣  Palindrome checker
// --------------------------------------------------
export function isPalindrome<T>(head: ListNode<T> | null): boolean {
  if (!head || !head.next) return true;   // Empty or single‑node list

  // ----- 3.1  Find the middle (slow stops at middle)
  let slow: ListNode<T> | null = head;
  let fast: ListNode<T> | null = head;

  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // ----- 3.2  Reverse second half
  const secondHalfStart = reverse(slow!.next);
  let firstHalfIter = head;
  let secondHalfIter = secondHalfStart;

  // ----- 3.3  Compare halves
  let palindrome = true;
  while (secondHalfIter) {
    if (firstHalfIter!.val !== secondHalfIter.val) {
      palindrome = false;
      break;
    }
    firstHalfIter = firstHalfIter!.next;
    secondHalfIter = secondHalfIter.next;
  }

  // ----- 3.4  Restore the original order (optional)
  slow!.next = reverse(secondHalfStart);

  return palindrome;
}

// --------------------------------------------------
// 4️⃣  Example usage
// --------------------------------------------------
function buildList(values: any[]): ListNode | null {
  let dummy: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) {
    dummy = { val: values[i], next: dummy };
  }
  return dummy;
}

// Palindrome case
const list1 = buildList([1, 2, 3, 2, 1]);
console.log(isPalindrome(list1)); // true

// Non‑palindrome
const list2 = buildList([1, 2, 3, 4, 5]);
console.log(isPalindrome(list2)); // false
