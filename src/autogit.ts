export interface ListNode<T = number> {
  value: T;
  next?: ListNode<T>;
}
export function isPalindromeStack<T>(head: ListNode<T> | undefined): boolean {
  if (!head) return true;          // empty list is a palindrome

  const stack: T[] = [];
  let cur = head;

  // Stage 1 – push all values onto the stack
  while (cur) {
    stack.push(cur.value);
    cur = cur.next;
  }

  // Stage 2 – iterate a second time, comparing against popped values
  cur = head;
  while (cur) {
    const top = stack.pop() as T; // stack can't be empty here
    if (cur.value !== top) return false;
    cur = cur.next;
  }

  return true;
}
export function isPalindromeLinear<T>(head: ListNode<T> | undefined): boolean {
  if (!head) return true;

  // 1️⃣ Find middle (slow will stop at mid‑point)
  let slow = head;
  let fast = head;
  let prevSlow: ListNode<T> | undefined = undefined;

  while (fast && fast.next) {
    fast = fast.next.next;
    prevSlow = slow;
    slow = slow.next;
  }

  // 2️⃣ For odd length lists, skip the middle element
  if (fast) {
    slow = slow.next;
  }

  // 3️⃣ Reverse the second half starting at `slow`
  let secondHalf = reverseLinkedList(slow);

  // 4️⃣ Compare the first half (up to prevSlow) with reversed second half
  let p1 = head;
  let p2 = secondHalf;
  while (p2) {           // second half can be shorter or equal
    if (p1.value !== p2.value) {
      // Optional: undo reversal here if you want to keep list unchanged
      return false;
    }
    p1 = p1.next!;
    p2 = p2.next!;
  }

  // Optional: restore first half? (skip for brevity)
  return true;
}

/**
 * Reverse a linked list in place and return the new head.
 */
function reverseLinkedList<T>(head: ListNode<T> | undefined): ListNode<T> | undefined {
  let prev: ListNode<T> | undefined = undefined;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}
function build(list: number[]): ListNode | undefined {
  let head: ListNode | undefined;
  let tail: ListNode | undefined;

  for (const val of list) {
    const node: ListNode = { value: val };
    if (!head) {
      head = node;
      tail = node;
    } else {
      tail!.next = node;
      tail = node;
    }
  }
  return head;
}

const evenPal = build([1, 2, 2, 1]);
const oddPal = build([1, 3, 3, 1]);
const nonPal = build([1, 2, 3]);

console.log(isPalindromeStack(evenPal)); // true
console.log(isPalindromeLinear(oddPal)); // true
console.log(isPalindromeLinear(nonPal)); // false
